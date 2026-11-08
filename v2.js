(() => {
  'use strict';
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const motionAllowed = () => !reduced.matches && root.dataset.motion !== 'paused';

  // Filtering changes visibility only; the five projects and their URLs remain intact.
  const filters = [...document.querySelectorAll('[data-work-filter]')];
  const works = [...document.querySelectorAll('.work-row[data-categories]')];
  filters.forEach(button => button.addEventListener('click', () => {
    const category = button.dataset.workFilter;
    filters.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    works.forEach(row => { row.hidden = category !== 'all' && !row.dataset.categories.split(' ').includes(category); });
    const count = works.filter(row => !row.hidden).length;
    const status = document.querySelector('.work-filter-status');
    if (status) status.textContent = document.documentElement.lang === 'en' ? `${count} projects` : `显示 ${count} 个项目`;
  }));

  // Numbers animate once when read, while keeping the literal value in HTML for no-JS users.
  const counters = [...document.querySelectorAll('[data-count]')];
  if ('IntersectionObserver' in window && motionAllowed()) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      const el = entry.target, final = Number(el.dataset.count), suffix = el.dataset.suffix || '';
      const start = performance.now(), duration = 520;
      const frame = time => {
        if (!motionAllowed()) { el.textContent = `${final}${suffix}`; return; }
        const t = Math.min(1, (time - start) / duration);
        el.textContent = `${Math.round(final * (1 - Math.pow(1-t, 3)))}${suffix}`;
        if (t < 1) requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    }), {threshold:.45});
    counters.forEach(el => observer.observe(el));
  }

  // Hover previews fetch a video only after deliberate desktop hover. Tap still opens the full player.
  let previewButton = null;
  function stopPreview() {
    if (!previewButton) return;
    const video = previewButton.querySelector('.hover-preview');
    if (video) { video.pause(); video.removeAttribute('src'); video.load(); video.remove(); }
    previewButton = null;
  }
  document.addEventListener('pointerover', event => {
    if (!finePointer.matches || !motionAllowed() || event.pointerType === 'touch') return;
    const button = event.target.closest('.film-cell[data-video],.video-cover[data-video]');
    if (!button || button === previewButton) return;
    stopPreview();
    const record = window.PORTFOLIO_DATA?.videos.find(v => v.id === button.dataset.video);
    if (!record) return;
    const video = document.createElement('video');
    video.className = 'hover-preview';
    video.muted = true; video.defaultMuted = true; video.playsInline = true; video.loop = true;
    video.preload = 'none'; video.setAttribute('aria-hidden','true'); video.src = record.src;
    button.append(video); previewButton = button;
    video.play().catch(() => { if (previewButton === button) stopPreview(); });
  });
  document.addEventListener('pointerout', event => {
    const button = event.target.closest('.film-cell[data-video],.video-cover[data-video]');
    if (button && button === previewButton && !button.contains(event.relatedTarget)) stopPreview();
  });
  document.addEventListener('click', event => {
    if (event.target.closest('.film-cell[data-video],.video-cover[data-video]')) stopPreview();
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stopPreview(); });
  reduced.addEventListener('change', () => { if (reduced.matches) stopPreview(); });
  document.querySelector('.motion-toggle')?.addEventListener('click', () => { if (!motionAllowed()) stopPreview(); });

  // Quiet pointer feedback is limited to image-led work; keyboard focus remains native.
  if (finePointer.matches) {
    const cursor = document.createElement('span');
    cursor.className = 'interaction-cursor'; cursor.setAttribute('aria-hidden','true');
    document.body.append(cursor);
    let raf = 0;
    document.addEventListener('pointermove', event => {
      if (!motionAllowed() || event.pointerType === 'touch') { cursor.classList.remove('is-active'); return; }
      const target = event.target.closest('.scene-point,.work-row,.film-cell,.video-cover');
      cursor.classList.toggle('is-active',!!target);
      if (!target) return;
      cursor.textContent = target.matches('.scene-point') ? 'EXPLORE' : target.matches('.external-video-cover') ? 'OPEN' : target.matches('.film-cell,.video-cover') ? 'PLAY' : 'VIEW';
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => { cursor.style.left = `${event.clientX + 24}px`; cursor.style.top = `${event.clientY + 22}px`; });
    },{passive:true});
    document.addEventListener('pointerleave', () => cursor.classList.remove('is-active'));
  }

  const magnetic = [...document.querySelectorAll('.studio-tour,.recruiter-actions .button,.resume-actions .button.primary')];
  magnetic.forEach(el => {
    el.addEventListener('pointermove', event => {
      if (!finePointer.matches || !motionAllowed()) return;
      const box = el.getBoundingClientRect();
      el.style.setProperty('--mag-x',`${((event.clientX-box.left)/box.width-.5)*5}px`);
      el.style.setProperty('--mag-y',`${((event.clientY-box.top)/box.height-.5)*5}px`);
    });
    el.addEventListener('pointerleave', () => { el.style.removeProperty('--mag-x'); el.style.removeProperty('--mag-y'); });
  });

  // The original film links and archive data remain unchanged.
  document.querySelectorAll('a[href$="#work"],a[href="index.html"]').forEach(a => {
    if (a.closest('.project-conclusion,.recruiter-page')) a.setAttribute('data-return-studio','');
  });
})();
