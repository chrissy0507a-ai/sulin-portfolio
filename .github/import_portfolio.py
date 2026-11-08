#!/usr/bin/env python3
"""Import the public static portfolio into the GitHub repository root.

The manifest records hashes of the exact files from the Site source checkout.
"""

from concurrent.futures import ThreadPoolExecutor, as_completed
import hashlib
from pathlib import Path
import subprocess
import tempfile
import time
from urllib.parse import quote


ROOT = Path(__file__).resolve().parent.parent
MANIFEST = ROOT / "portfolio-files.tsv"
BASE_URL = "https://sulin-creative-portfolio-2026.chrissy0507a.chatgpt.site/"


def import_one(record):
    expected_hash, expected_size, relative_path = record
    destination = ROOT / relative_path
    if destination.resolve() != ROOT / relative_path or not destination.resolve().is_relative_to(ROOT):
        raise ValueError(f"Unsafe path: {relative_path}")

    destination.parent.mkdir(parents=True, exist_ok=True)
    if destination.is_file() and destination.stat().st_size == expected_size:
        if hashlib.sha256(destination.read_bytes()).hexdigest() == expected_hash:
            return False

    url = BASE_URL + quote(relative_path, safe="/")
    for attempt in range(4):
        temp_path = None
        try:
            digest = hashlib.sha256()
            size = 0
            with tempfile.NamedTemporaryFile(dir=destination.parent, delete=False) as temp:
                temp_path = Path(temp.name)
            subprocess.run(
                ["curl", "--fail", "--location", "--silent", "--show-error",
                 "--retry", "2", "--max-time", "180", "--user-agent",
                 "Mozilla/5.0 (compatible; PortfolioStaticImport/1.0)",
                 "--output", str(temp_path), url],
                check=True,
            )
            with temp_path.open("rb") as downloaded:
                while chunk := downloaded.read(1024 * 1024):
                    digest.update(chunk)
                    size += len(chunk)
            if size != expected_size or digest.hexdigest() != expected_hash:
                raise ValueError(f"File checksum mismatch: {relative_path} ({size} bytes, sha256={digest.hexdigest()})")
            temp_path.replace(destination)
            return True
        except Exception:
            if temp_path is not None:
                temp_path.unlink(missing_ok=True)
            if attempt == 3:
                raise
            time.sleep(2 ** attempt)


def main():
    records = []
    for line in MANIFEST.read_text(encoding="utf-8").splitlines():
        expected_hash, size, path = line.split("\t", 2)
        if not path or path.startswith("/") or ".." in Path(path).parts:
            raise ValueError(f"Unsafe path: {path}")
        # The public Site serves modified HTML, so its byte hashes cannot match
        # the original source. Import only static assets here; source pages are
        # synchronized separately and existing root files stay intact.
        if not path.startswith("assets/"):
            continue
        records.append((expected_hash, int(size), path))

    updated = 0
    with ThreadPoolExecutor(max_workers=4) as pool:
        tasks = {pool.submit(import_one, record): record[2] for record in records}
        for future in as_completed(tasks):
            try:
                updated += bool(future.result())
            except Exception as exc:
                raise RuntimeError(f"Could not import {tasks[future]}") from exc
    print(f"Verified {len(records)} portfolio files; downloaded {updated}.")


if __name__ == "__main__":
    main()
