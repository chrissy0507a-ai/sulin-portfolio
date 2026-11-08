(() => {
  'use strict';
  const root=document.documentElement;
  const read=()=>{try{return JSON.parse(localStorage.getItem('lin-studio-explored')||'[]')}catch{return []}};
  const known=['jinhan','motion','momo','editorial','home'];
  const restored=read();
  const visited=new Set(Array.isArray(restored)?restored.filter(x=>known.includes(x)):[]);
  const updateProgress=()=>{
    document.querySelectorAll('.scene-point').forEach(b=>b.classList.toggle('is-visited',visited.has(b.dataset.project)));
    const count=document.querySelector('#explored-count');if(count)count.textContent=visited.size;
    const meter=document.querySelector('.exploration-meter');if(meter)meter.style.setProperty('--progress',`${visited.size/5*100}%`);
  };
  document.addEventListener('portfolio:projectopen',e=>{
    visited.add(e.detail.id);updateProgress();
    try{localStorage.setItem('lin-studio-explored',JSON.stringify([...visited]));}catch{}
    const content=document.querySelector('#drawer-content');
    if(root.dataset.motion!=='paused'&&!matchMedia('(prefers-reduced-motion: reduce)').matches)
      content?.animate([{opacity:.2,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],{duration:380,easing:'ease-out'});
  });
  updateProgress();
  const stage=document.querySelector('.studio-landing');
  stage?.addEventListener('pointermove',e=>{
    if(root.dataset.motion==='paused'||e.pointerType==='touch')return;
    const box=stage.getBoundingClientRect();
    stage.style.setProperty('--light-x',`${(e.clientX-box.left)/box.width*100}%`);
    stage.style.setProperty('--light-y',`${(e.clientY-box.top)/box.height*100}%`);
  });
  const targets=document.querySelectorAll('.work-row,.content-section .section-head,.other-project .project-top,.studio-about,.home-numbers,.outcomes-heading,.case-chapter-intro,.skill-modules article,.recruiter-projects a');
  if('IntersectionObserver' in window){
    const reveal=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');reveal.unobserve(e.target);}}),{threshold:.06});
    targets.forEach(t=>{t.classList.add('reveal-ready');reveal.observe(t);});
  }
  const bar=document.querySelector('.reading-progress');
  let ticking=false;
  const progress=()=>{const max=document.documentElement.scrollHeight-innerHeight;bar?.style.setProperty('--read',max>0?Math.min(1,scrollY/max):0);ticking=false;};
  addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(progress)}},{passive:true});
  addEventListener('resize',progress);progress();
})();
