(() => {
  'use strict';
  const root = document.documentElement;
  const dictionary = window.PORTFOLIO_EN || {};
  const keys = Object.keys(dictionary).sort((a,b) => b.length-a.length);
  const pattern = new RegExp(keys.map(k => k.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|'),'g');
  const records = new WeakMap();
  const attributes = new WeakMap();
  const protectedSelector = 'script,style,pre,noscript,.copy-body,[data-original],[data-language-control]';
  let language = root.lang === 'en' ? 'en' : 'zh-CN';
  let scheduled = false;
  const translate = value => {
    const s = String(value ?? '');
    if (dictionary[s] !== undefined) return dictionary[s];
    return s.replace(pattern, match => dictionary[match]);
  };
  function renderValue(value, record) {
    const source = record && value === record.rendered ? record.source : value;
    return {source, rendered: language === 'en' ? translate(source) : source};
  }
  function apply() {
    observer.disconnect();
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (!node.parentElement || node.parentElement.closest(protectedSelector)) continue;
      const r = renderValue(node.nodeValue, records.get(node));
      records.set(node,r);
      if (node.nodeValue !== r.rendered) node.nodeValue = r.rendered;
    }
    document.querySelectorAll('[aria-label],[alt],[title],[placeholder],meta[name="description"]').forEach(el => {
      if (el.closest(protectedSelector)) return;
      const map = attributes.get(el) || {};
      for (const key of ['aria-label','alt','title','placeholder',...(el.tagName === 'META' ? ['content'] : [])]) {
        if (!el.hasAttribute(key)) continue;
        const r = renderValue(el.getAttribute(key),map[key]);
        map[key]=r;
        if (el.getAttribute(key) !== r.rendered) el.setAttribute(key,r.rendered);
      }
      attributes.set(el,map);
    });
    const title = document.querySelector('title');
    const r = renderValue(title.textContent,records.get(title));
    records.set(title,r); title.textContent=r.rendered;
    document.querySelectorAll('[data-lang]').forEach(b => b.setAttribute('aria-pressed',String(b.dataset.lang===language)));
    document.querySelectorAll('a[href]').forEach(a => {
      const href=a.getAttribute('href');
      if (!/^[a-z-]+\.html(?:[?#]|$)/i.test(href)) return;
      const url=new URL(href,location.href);
      url.searchParams.set('lang',language==='en'?'en':'zh');
      const next=url.pathname.split('/').pop()+url.search+url.hash;
      if (href!==next) a.setAttribute('href',next);
    });
    observer.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['aria-label','alt','title','placeholder']});
    scheduled=false;
  }
  const observer=new MutationObserver(() => {
    if (!scheduled) { scheduled=true; requestAnimationFrame(apply); }
  });
  function setLanguage(next) {
    const candidates = [...document.querySelectorAll('main [id]')].filter(el => {
      const box=el.getBoundingClientRect();
      return box.height > 0 && box.top < innerHeight*.65 && box.bottom > 100;
    });
    const anchor = candidates.sort((a,b) => Math.abs(a.getBoundingClientRect().top-120)-Math.abs(b.getBoundingClientRect().top-120))[0];
    const position = anchor?.getBoundingClientRect().top;
    language=next==='en'?'en':'zh-CN';
    root.lang=language;
    try {localStorage.setItem('lin-studio-language',language);}catch {}
    try {const u=new URL(location.href);u.searchParams.set('lang',language==='en'?'en':'zh');history.replaceState(null,'',u);}catch {}
    apply();
    document.dispatchEvent(new CustomEvent('portfolio:languagechange',{detail:{language}}));
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (!anchor) return;
      const delta = anchor.getBoundingClientRect().top-position;
      const behavior = root.style.scrollBehavior;
      root.style.scrollBehavior='auto';
      scrollBy(0,delta);
      root.style.scrollBehavior=behavior;
    }));
  }
  window.PortfolioLocale={translate,apply,get language(){return language;},setLanguage};
  document.querySelectorAll('[data-lang]').forEach(b=>b.addEventListener('click',()=>setLanguage(b.dataset.lang)));
  apply();
})();
