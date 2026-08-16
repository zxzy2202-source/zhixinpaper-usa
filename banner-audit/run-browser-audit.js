(async () => {
  const jobs = window.__bannerAuditJobs || [];
  const rect = (el) => el ? (() => { const r=el.getBoundingClientRect(); return {x:+r.x.toFixed(1),y:+r.y.toFixed(1),width:+r.width.toFixed(1),height:+r.height.toFixed(1),right:+r.right.toFixed(1),bottom:+r.bottom.toFixed(1)}; })() : null;
  const inside = (r,w,h) => !!r && r.right>0 && r.bottom>0 && r.x<w && r.y<h;
  const overlap = (a,b) => !!a && !!b && Math.max(a.x,b.x)<Math.min(a.right,b.right) && Math.max(a.y,b.y)<Math.min(a.bottom,b.bottom);
  const frame = (job) => new Promise((resolve) => {
    const f=document.createElement('iframe');
    f.style.cssText=`position:fixed;left:-20000px;top:0;border:0;width:${job.w}px;height:${job.h}px`;
    let done=false;
    const finish=(v)=>{if(done)return;done=true;f.remove();resolve(v)};
    const timer=setTimeout(()=>finish({path:job.path,viewport:job.name,error:'LOAD_TIMEOUT'}),20000);
    f.onload=async()=>{
      clearTimeout(timer);
      try {
        await new Promise(r=>setTimeout(r,1200));
        const d=f.contentDocument, win=f.contentWindow;
        const h1=d.querySelector('main h1')||d.querySelector('h1');
        const main=d.querySelector('main');
        const nav=d.querySelector('header')||d.querySelector('[role="banner"]')||d.querySelector('nav');
        const hero=h1 && (h1.closest('main > section,main > div,main > header')||h1.closest('section,article,header,div'));
        const desc=hero && Array.from(hero.querySelectorAll('p')).find(e=>e.textContent.trim().length>10);
        const ctas=hero ? Array.from(hero.querySelectorAll('a,button')).filter(e=>{const s=win.getComputedStyle(e),r=e.getBoundingClientRect();return r.width>0&&r.height>0&&s.visibility!=='hidden'&&s.display!=='none'}).slice(0,4):[];
        const hr=rect(h1), her=rect(hero), nr=rect(nav), dr=rect(desc), cr=ctas.map(rect);
        const clipped=[];
        for(const [label,el] of [['h1',h1],['description',desc],...ctas.map((e,i)=>[`cta${i+1}`,e])]){
          for(let p=el&&el.parentElement;p&&p!==d.body;p=p.parentElement){const s=win.getComputedStyle(p);if(/hidden|clip|scroll|auto/.test(s.overflow+s.overflowX+s.overflowY)){const pr=p.getBoundingClientRect(),er=el.getBoundingClientRect();if(er.top<pr.top-1||er.bottom>pr.bottom+1||er.left<pr.left-1||er.right>pr.right+1){clipped.push({element:label,ancestor:p.tagName.toLowerCase()+'.'+String(p.className).split(' ').slice(0,2).join('.'),ancestorRect:rect(p)});break;}}}
        }
        const imageEls=Array.from((hero||main||d.body).querySelectorAll('img')).filter(i=>inside(rect(i),job.w,job.h));
        const bgEls=Array.from((hero||main||d.body).querySelectorAll('*')).filter(e=>{const bg=win.getComputedStyle(e).backgroundImage;return bg&&bg!=='none';}).slice(0,8);
        const bodyText=(d.body?.innerText||'').slice(0,2500);
        const pageError=/404|page not found|internal server error|application error|server error/i.test((d.title||'')+' '+bodyText);
        const hs=h1&&win.getComputedStyle(h1), ds=desc&&win.getComputedStyle(desc), heroStyle=hero&&win.getComputedStyle(hero);
        const resources=win.performance.getEntriesByType('resource');
        finish({path:job.path,url:f.contentWindow.location.href,viewport:job.name,size:[job.w,job.h],title:d.title,pageError,h1:{text:h1?.textContent.trim()||null,rect:hr,color:hs?.color||null},hero:{tag:hero?.tagName||null,className:String(hero?.className||'').slice(0,240),rect:her,heightRatio:her?+(her.height/job.h).toFixed(3):null,backgroundColor:heroStyle?.backgroundColor||null,backgroundImage:heroStyle?.backgroundImage||null},headerNav:nr,description:{text:desc?.textContent.trim().slice(0,400)||null,rect:dr,color:ds?.color||null,inViewport:inside(dr,job.w,job.h)},ctas:ctas.map((e,i)=>({text:e.textContent.trim().slice(0,100),rect:cr[i],inViewport:inside(cr[i],job.w,job.h),color:win.getComputedStyle(e).color,background:win.getComputedStyle(e).backgroundColor})),h1InViewport:inside(hr,job.w,job.h),horizontalOverflow:{scrollWidth:d.documentElement.scrollWidth,clientWidth:d.documentElement.clientWidth,overflow:d.documentElement.scrollWidth>d.documentElement.clientWidth+1},navOverlaps:{h1:overlap(hr,nr),description:overlap(dr,nr),ctas:cr.map(r=>overlap(r,nr))},clipped,images:imageEls.map(i=>({src:i.currentSrc||i.src,alt:i.alt,rect:rect(i),loaded:i.complete&&i.naturalWidth>0,natural:[i.naturalWidth,i.naturalHeight]})),backgrounds:bgEls.map(e=>({tag:e.tagName,className:String(e.className||'').slice(0,120),image:win.getComputedStyle(e).backgroundImage.slice(0,500),color:win.getComputedStyle(e).backgroundColor})),resourceFailures:resources.filter(r=>r.duration===0&&r.transferSize===0).slice(0,20).map(r=>r.name)});
      } catch(e){finish({path:job.path,viewport:job.name,error:String(e.stack||e)})}
    };
    document.body.appendChild(f); f.src='https://www.zhixinpaper.com'+job.path;
  });
  const out=[]; let ix=0;
  async function worker(){while(ix<jobs.length){const i=ix++;out[i]=await frame(jobs[i]);}}
  await Promise.all(Array.from({length:Math.min(6,jobs.length)},worker));
  return out;
})()