(() => {
'use strict';
const d={
 success:[['kinsylbell','7547342115131411767'],['vitanibeauty','7562360721321872695'],['brittmarie.x','7566228214356495630'],['kripapateljoshi','7570099858502208799'],['kripapateljoshi','7556748008965164319'],['zoe_gabon','7576141283475885326'],['maiii.finds','7553732105243462942']],
 more:[['keylaxdaily','7661056612836101389',19,'AD Code 邮件中的视频','Video in the code request'],['muariana','7673902336560860430',21,'画线过程的参考视频','Line-drawing example'],['chungqa','7681094297227234591',21,'内容建议参考视频','Creative feedback example'],['asianndra','7646645536098995469',25,'睫毛膏邮件示例','Mascara outreach example'],['ira_noel','7600944110119259422',25,'睫毛膏邮件示例','Mascara outreach example'],['auradabee','7644195755023961357',25,'睫毛膏邮件示例','Mascara outreach example']],
 evidence:[
 [1,'工作流程','Daily workflow','从新出视频、邀约、邮件、发货到寻找与认领合作达人。','workflow'],
 [2,'付费达人沟通','Paid creator negotiation','Would you be open to trying our star product, the eyeliner instead?','scenario'],
 [3,'眼线笔发货提醒','Eyeliner shipping note','Your Judydoll Ultra-Fine Liquid Eyeliner is on its way!','scenario'],
 [5,'标准触达信','Standard first contact',"We'd love to invite you to a TikTok Shop collab featuring our Ultra-Fine Liquid Eyeliner.",'outreach'],
 [6,'眼线笔开发信','Eyeliner outreach email','Can I send you one to try?','outreach'],
 [7,'同意但未申样','Accepted, sample not requested','Could you head over there, accept the invite, and request the sample?','scenario'],
 [8,'被拒后的回应','Rejection handling',"If you'd ever like to revisit a gifted collab with us, I'd love to stay in touch.",'scenario'],
 [9,'通用回复','Short replies',"I'll send you the shipping info as soon as I have it!",'scenario'],
 [10,'个性化：妆型','Personalized: makeup style','That pink hair is SO good, it’s genuinely so perfect for you.','outreach'],
 [11,'个性化：皮肤光感','Personalized: skin and glow','Your skin is SO good!! that glowy dewy glass skin is unreal.','outreach'],
 [12,'个性化：可爱风','Personalized: cute looks','Your makeup is always SO flawless.','outreach'],
 [13,'个性化：风格多变','Personalized: versatile looks','Your style is SO versatile it’s actually insane.','outreach'],
 [14,'个性化：精细眼妆','Personalized: detailed eye looks','The linework, the shading, the blending? Your whole aesthetic is so cohesive and cinematic.','outreach'],
 [15,'优质达人二邀','Returning creator invitation','I still think about that JUDYDOLL Gel Eyeliner Pen video you did for us.','outreach'],
 [16,'个性化：Cosplay','Personalized: cosplay','The transformations, the detail, the precision? Every look feels so immersive.','outreach'],
 [17,'跟进拍摄','Friendly filming follow-up','I was wondering how the video is coming along.','scenario'],
 [18,'合集后争取单品视频','Collection to dedicated video','Would you be open to filming one dedicated video showing the full eyeliner application process?','scenario'],
 [19,'申请 AD Code','Spark Ads code request','Could you pls send me the adcode of this video?','scenario'],
 [20,'争取多拍视频','Additional video request','Would you be up for filming a few more eyeliner videos?','scenario'],
 [21,'视频内容建议','Creative feedback','Filming the actual line-drawing process could be even more eye-catching.','scenario'],
 [22,'补充单独视频','Separate video request','Would you be able to film one more separate video?','scenario'],
 [23,'友好催视频','Gentle video follow-up','Just wanted to follow up on the Judydoll liquid eyeliner video.','scenario'],
 [24,'明确交付时间','Deadline follow-up','Could you please let me know the status of the video, or an expected posting date?','scenario'],
 [25,'睫毛膏开发信','Mascara outreach','Gifted Collaboration | Judydoll Feather Lash Iron Mascara','outreach'],
 [26,'睫毛膏二次邀约','Mascara repeat invitation','We’ve just launched an upgraded version—the Feather Lash Iron Mascara.','outreach'],
 [27,'睫毛膏拍摄跟进','Mascara content follow-up','A video showing the actual application process could be even MORE eye-catching!','scenario']
 ],
 tags:{
 general:['通用美妆','General Makeup','#makeupchallenge #viralmakeup #douyinmakeup #douyin #creativemakeup #toastymakeup #MakeupOfTheDay #glittermakeup #grwmmakeup #drugstoremakeup #makeuptrend #coquette #freckles #bombshell #collagenmask #calvinharris'],
 eye:['眼妆与眼线','Eye Makeup','eyemaxxing smokyeye smokymakeup sireneyes wingedeyeliner doeeyes cateyeliner #eyeshadowpalette'],
 soft:['柔和妆容','Soft Glam','#softglam #cleanmakeup glowymakeup #coquetteaesthetic'],
 goth:['哥特妆容','Gothic','#altmakeup #gothic goth #blacklipstick #gloomy'],
 alternative:['另类风格','Alternative Beauty','#clownmakeup #raveoutfit #rave #nyancat #niteharts #iheartraves #lasvegas'],
 y2k:['千禧妆容','Y2K','#y2k #2000saesthetic #2000smakeup #mcblingaesthetic y2kaesthetic makeupinspo y2kfashion'],
 cosplay:['角色造型','Cosplay','#creativemakeup #editorialmakeup halloweenmakeup #clownmakeup'],
 lashes:['睫毛','Lashes','#eyelashes mangalashes Wispylashes Naturallashes #ninetyninedreams #manhualashes #goddvenuslashes #wiwilink #maxcomfi #lashclusters #brownlashes #diylashextensions #lashes #kisslily'],
 kbeauty:['韩系美妆','K-Beauty','#kbeauty #koreanmakeup #idolmakeup gyarumakeup gal'],
 editorial:['创意大片','Editorial Makeup','#editorialmakeup #creativemakeup #redchamber #fallmakeup'],
 adjacent:['关联检索','Adjacent Cues','#ttdeyecontacts #contactlenses #coloredcontacts #tealhair #piercings #fakepiercing #earstack']
 }
};
const $=s=>document.querySelector(s), en=()=>document.documentElement.lang==='en',t=(zh,english)=>en()?english:zh;
const esc=x=>String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let activeTag='general',activeStep=0;
function videoCard(v,i,featured){let [handle,id]=v,context=featured?t('成功合作视频','Successful collaboration'):t(v[3],v[4]);return `<article class="jd-video"><div class="jd-video-frame" data-id="${id}"><button class="jd-video-cover" type="button" aria-label="${esc(t('播放','Play'))} @${esc(handle)}"><small>${esc(context)}</small><span class="jd-play" aria-hidden="true">▶</span><b>@${esc(handle)}</b></button></div><div class="jd-video-caption"><strong>${featured?String(i+1).padStart(2,'0')+' / ':''}@${esc(handle)}</strong><a href="https://www.tiktok.com/@${encodeURIComponent(handle)}/video/${id}" target="_blank" rel="noopener noreferrer">${esc(t('原帖 ↗','Original ↗'))}</a></div></article>`}
function videos(){$('#success-videos').innerHTML=d.success.map((v,i)=>videoCard(v,i,true)).join('');$('#other-videos').innerHTML=d.more.map((v,i)=>videoCard(v,i,false)).join('')}
function tags(){let q=$('#tag-search').value.trim().toLowerCase(),all=Object.entries(d.tags);$('#tag-categories').innerHTML=all.map(([key,v])=>`<button type="button" data-tag="${key}" aria-pressed="${key===activeTag}">${esc(t(v[0],v[1]))}</button>`).join('');let pool=q?all.flatMap(([,v])=>v[2].split(' ').filter(Boolean).filter(x=>x.toLowerCase().includes(q))):d.tags[activeTag][2].split(' ');pool=[...new Set(pool)];$('#tag-results').innerHTML=pool.length?pool.map(x=>`<span>${esc(x)}</span>`).join(''):`<p>${esc(t('没有匹配标签。','No matching tags.'))}</p>`}
const outreachContext={5:['标准邀约','Introduce the product and affiliate terms.'],6:['附产品与画面示例','Pair benefits with visual examples.'],10:['发色与妆型','Start with a specific makeup detail.'],11:['光感妆容','Connect the glow aesthetic to an eye look.'],12:['甜美风格','Match a soft creator style.'],13:['多变造型','Position the liner across looks.'],14:['精细线条','Call out eye artistry and detail.'],15:['既有合作','Reference the earlier collaboration.'],16:['角色转化','Connect cosplay detail to precision.'],25:['睫毛膏卖点','Introduce the dual-wing brush.'],26:['老达人关系','Invite a returning creator to an upgrade.']};
function outreach(){
  const items=d.evidence.filter(x=>x[4]==='outreach');
  $('#outreach-list').innerHTML=items.map(x=>{
    const n=String(x[0]).padStart(2,'0'),c=outreachContext[x[0]];
    const family=x[0]>=25?t('睫毛膏邀约','Mascara outreach'):x[0]>=10?t('个性化开发','Personalized pitch'):t('基础开发','Core outreach');
    return `<article class="jd-email-card" id="email-${n}"><header><span>EMAIL / ${n}</span><small>${esc(family)}</small></header><h3>${esc(t(x[1],x[2]))}</h3><p class="jd-email-approach"><b>${esc(t('写法','Approach'))} /</b> ${esc(t(c[0],c[1]))}</p><blockquote lang="en">“${esc(x[3])}”</blockquote><div class="jd-email-proof"><img src="assets/judydoll/source-${n}.png" alt="${esc(t(x[1],x[2]))} · ${esc(t('原始邮件全文','original email'))}" loading="lazy"></div><button data-source="${x[0]}" class="jd-textbutton">${esc(t('放大阅读这封原邮件 ↗','Enlarge the original email ↗'))}</button></article>`;
  }).join('');
}
function scenarios(){
  const items=d.evidence.filter(x=>x[4]==='scenario');
  $('#scenario-list').innerHTML=items.map(x=>{
    const n=String(x[0]).padStart(2,'0');
    const category=x[0]===2||[7,8,9].includes(x[0])?t('合作沟通','Negotiation'):x[0]===3||[17,23,24,27].includes(x[0])?t('交付跟进','Delivery'):t('内容优化','Creative feedback');
    return `<article class="jd-message-card" id="message-${n}"><header><span>${n} / ${esc(category)}</span></header><h3>${esc(t(x[1],x[2]))}</h3><blockquote lang="en">“${esc(x[3])}”</blockquote><img src="assets/judydoll/source-${n}.png" alt="${esc(t(x[1],x[2]))} · ${esc(t('原始沟通截图','original message'))}" loading="lazy"><button data-source="${x[0]}" class="jd-textbutton">${esc(t('放大阅读原始沟通 ↗','Enlarge original message ↗'))}</button></article>`;
  }).join('');
}
const steps=[['发现达人','Creator discovery','检索出单视频、标签与相近风格创作者。','Search performing posts, tags and adjacent creator styles.',1],['筛选匹配','Qualification','结合 GMV、GPM、受众、内容质量与发布活跃度。','Review GMV, GPM, audience, content quality and activity.',1],['个性化建联','Personalized outreach','根据达人作品写英文邀约。','Write an invitation grounded in their work.',10],['合作谈判','Negotiation','沟通纯佣、寄样、交付与授权条件。','Discuss affiliate terms, gifting, delivery and rights.',2],['申请样品','Sample application','跟进邀请卡片与样品申领。','Follow the invitation card and sample request.',7],['物流跟进','Shipping & delivery','提供物流编号与拍摄提示。','Share tracking and filming guidance.',3],['拍摄跟进','Content follow-up','询问拍摄与发布进度。','Check filming and posting progress.',17],['内容优化','Creative feedback','建议真实上妆、眼部特写与开头吸引点。','Suggest application, close-ups and hooks.',21],['视频发布','Video publishing','确认视频链接与可购物内容发布。','Confirm the shoppable post and URL.',23],['广告授权','Spark Ads authorization','申请对应视频的 AD Code。','Request the code for a specific video.',19],['二次合作','Repeat collaboration','维护优质达人并邀请体验新品。','Maintain the relationship and invite repeat work.',26]];
function workflow(){$('#workflow-steps').innerHTML=steps.map((x,i)=>`<button data-step="${i}" aria-pressed="${i===activeStep}"><small>${String(i+1).padStart(2,'0')} / 11</small><b>${esc(t(x[0],x[1]))}</b></button>`).join('');let x=steps[activeStep];$('#workflow-detail').innerHTML=`<h3>${esc(t(x[0],x[1]))}</h3><p>${esc(t(x[2],x[3]))} <button data-source="${x[4]}" class="jd-textbutton">${esc(t('查看对应材料 ↗','View related source ↗'))}</button></p>`}
const dialog=$('#jd-dialog');function source(n){let x=d.evidence.find(x=>x[0]===n);if(!x)return;$('#jd-dialog-title').textContent=`${String(n).padStart(2,'0')} / ${t(x[1],x[2])}`;let img=$('#jd-dialog-img');img.src=`assets/judydoll/source-${String(n).padStart(2,'0')}.png`;img.alt=t(x[1],x[2]);dialog.showModal()}
document.addEventListener('click',e=>{let cover=e.target.closest('.jd-video-cover');if(cover){let frame=cover.closest('[data-id]'),id=frame?.dataset.id;if(id&&/^\d{19}$/.test(id)){let iframe=document.createElement('iframe');iframe.src=`https://www.tiktok.com/embed/v2/${id}`;iframe.title=`TikTok video ${id}`;iframe.loading='lazy';iframe.allow='autoplay; encrypted-media; picture-in-picture';iframe.referrerPolicy='strict-origin-when-cross-origin';frame.append(iframe);cover.remove()}return}let tag=e.target.closest('[data-tag]');if(tag){activeTag=tag.dataset.tag;$('#tag-search').value='';tags();return}let step=e.target.closest('[data-step]');if(step){activeStep=Number(step.dataset.step);workflow();return}let proof=e.target.closest('[data-source]');if(proof){source(Number(proof.dataset.source));return}});
$('#tag-search').addEventListener('input',tags);$('#jd-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});let menu=$('.menu-button'),nav=$('#navigation');menu.addEventListener('click',()=>{let open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open))});nav.addEventListener('click',e=>{if(e.target.closest('a')){nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}});
function render(){videos();tags();outreach();scenarios();workflow()}render();document.addEventListener('portfolio:languagechange',render);
})();
