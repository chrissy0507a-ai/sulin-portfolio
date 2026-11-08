(() => {
  'use strict';
  const root = document.documentElement;
  const themeButton = document.querySelector('.theme-toggle');
  const read = (key, fallback) => { try { return localStorage.getItem(key) || fallback; } catch { return fallback; } };
  const save = (key, value) => { try { localStorage.setItem(key, value); } catch {} };
  const setTheme = theme => {
    root.dataset.theme = theme;
    themeButton?.setAttribute('aria-pressed', String(theme === 'night'));
    themeButton?.setAttribute('aria-label', theme === 'night' ? '切换为白天工作室' : '切换为夜间工作室');
    if (themeButton) themeButton.innerHTML = `<span aria-hidden="true">${theme === 'night' ? '☾' : '☀'}</span>`;
  };
  setTheme(read('lin-studio-theme', 'day'));
  themeButton?.addEventListener('click', () => { const t = root.dataset.theme === 'night' ? 'day' : 'night'; setTheme(t); save('lin-studio-theme', t); });
  const motionButton = document.querySelector('.motion-toggle');
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = read('lin-studio-motion', media.matches ? 'paused' : 'active') === 'paused';
  const setMotion = () => { root.dataset.motion = paused ? 'paused' : 'active'; if (motionButton) { motionButton.textContent = paused ? '开启动效 ▷' : '暂停动效 Ⅱ'; motionButton.setAttribute('aria-pressed', String(paused)); } };
  setMotion();
  motionButton?.addEventListener('click', () => { paused = !paused; setMotion(); save('lin-studio-motion', paused ? 'paused' : 'active'); });
  media.addEventListener('change', e => { paused = e.matches; setMotion(); });
  const scene = document.querySelector('.studio-scene');
  let raf = 0;
  scene?.addEventListener('pointermove', e => { if (paused || e.pointerType === 'touch') return; cancelAnimationFrame(raf); const box = scene.getBoundingClientRect(); const x = (e.clientX - box.left) / box.width - .5; const y = (e.clientY - box.top) / box.height - .5; raf = requestAnimationFrame(() => { scene.style.setProperty('--rx', `${-y * 6}deg`); scene.style.setProperty('--ry', `${x * 6}deg`); }); });
  scene?.addEventListener('pointerleave', () => { cancelAnimationFrame(raf); scene.style.setProperty('--rx', '0deg'); scene.style.setProperty('--ry', '0deg'); });
  const D = window.PORTFOLIO_DATA;
  const projects = [
    {id:'jinhan',kicker:'OVERSEAS SOCIAL / JINHAN FAIR',title:'让好产品，<br>被全球买家看见。',image:D.images.field03,alt:'锦汉展会现场工作照片',copy:'以家居用品与礼品展为起点，参与六个海外社媒平台的内容运营。从英文文案、AI 创意视频，到评论私信与展会现场，让产品与买家的对话发生。',tags:['海外社媒','英文文案','买家沟通'],href:'jinhan.html',link:'阅读锦汉完整案例'},
    {id:'motion',kicker:'THE SCREENING ROOM / AI VIDEO',title:'几秒钟，<br>打开产品的想象。',image:'assets/posters/v08.jpg',alt:'椅子线稿到实物的创意视频画面',copy:'产品拟人、线稿转场、虚实变化与沉浸式场景。完整目录保留 27 条本站可播放视频及 1 条原帖外链，也保留同一主题在不同平台上的表达版本。',tags:['AI 创意','产品叙事','短视频'],href:'archive.html?tab=videos',link:'浏览全部视频',play:true},
    {id:'momo',kicker:'XIAOHONGSHU / MOMO',title:'下一站，<br>是值得收藏的旅行。',image:D.images.page18_img01,alt:'MOMO 小红书旅行攻略',copy:'把澳洲旅行路线、景点体验与出行信息写成可收藏的内容。让读者更容易理解路线，也更愿意开始规划一次旅行。',tags:['小红书','旅行攻略','内容策划'],href:'projects.html#momo',link:'打开 MOMO 旅行手记'},
    {id:'editorial',kicker:'WECHAT & POSTER / EDITORIAL',title:'整理信息，<br>也设计阅读的顺序。',image:D.images.page22_img01,alt:'公众号内容排版作品',copy:'咨询实习网、国聘求职与应届生求职公布：把服务与招聘信息，整理成清晰的公众号长图和海报。完整保留原有图文与排版作品。',tags:['微信公众号','长图排版','海报设计'],href:'projects.html#consult',link:'查看公众号与海报作品',secondHref:'projects.html#career',secondLink:'国聘求职 / 应届生求职公布'},
    {id:'home',kicker:'ENGLISH CONTENT / HOME REPUBLIC',title:'用自然的英文，<br>写出生活的温度。',image:D.images.page20_img01,alt:'Home Republic 英文品牌内容',copy:'从墨尔本的生活方式与品牌信息出发，组织清楚、自然的英文内容，让读者理解产品，也感受到它所连接的日常。',tags:['英文文案','生活方式','品牌内容'],href:'projects.html#home',link:'阅读 Home Republic 项目'}
  ];
  const drawer = document.querySelector('#project-drawer');
  if (!drawer) return;
  let active = 0, previousFocus;
  const closeDrawer = () => { drawer.close(); document.body.style.overflow = ''; previousFocus?.focus(); };
  function renderProject(index) {
    active = (index + projects.length) % projects.length;
    const p = projects[active];
    document.dispatchEvent(new CustomEvent('portfolio:projectopen',{detail:{id:p.id}}));
    document.querySelector('#drawer-number').textContent = `0${active + 1} / 05`;
    document.querySelector('#drawer-content').innerHTML = `<div class="drawer-image ${p.id==='motion'?'motion-still':''}"><img src="${p.image}" alt="${p.alt}"></div><div class="drawer-copy"><p class="studio-kicker">${p.kicker}</p><h2 id="drawer-title">${p.title}</h2><p>${p.copy}</p><div class="drawer-tags">${p.tags.map(t=>`<span>${t}</span>`).join('')}</div>${p.play ? '<button class="drawer-play" id="drawer-play">▶ 先看一支短片</button>' : ''}<a class="drawer-link" href="${p.href}">${p.link} <span>↗</span></a>${p.secondHref ? `<a class="drawer-secondary" href="${p.secondHref}">${p.secondLink} ↗</a>` : ''}</div>`;
    window.PortfolioLocale?.apply();
    document.querySelector('#drawer-play')?.addEventListener('click', () => { closeDrawer(); document.querySelector('.film-cell[data-video="v08"]')?.click(); });
  }
  document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => { previousFocus = button; renderProject(projects.findIndex(p => p.id === button.dataset.project)); drawer.showModal(); document.body.style.overflow = 'hidden'; }));
  document.querySelector('#close-drawer').addEventListener('click', closeDrawer);
  document.querySelector('#previous-project').addEventListener('click', () => renderProject(active - 1));
  document.querySelector('#next-project').addEventListener('click', () => renderProject(active + 1));
  drawer.addEventListener('cancel', e => { e.preventDefault(); closeDrawer(); });
  drawer.addEventListener('click', e => { if (e.target === drawer) { const r = drawer.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) closeDrawer(); } });
})();
