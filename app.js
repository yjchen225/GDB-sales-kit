const slides=[...document.querySelectorAll('.slide')];
const links=[...document.querySelectorAll('nav a')];
const modeButton=document.querySelector('#mode');
const small=matchMedia('(max-width:959px), (max-height:539px)');
let modeOverride=null;
let current=Math.max(0,slides.findIndex(s=>s.id===location.hash.slice(1)));
let reading=true;
let scrollLocked=false;
function scrollToCurrent(){
 scrollLocked=true;
 slides[current].scrollIntoView({behavior:"instant"});
 requestAnimationFrame(()=>requestAnimationFrame(()=>{scrollLocked=false;}));
}
const labels=['核心價值','服務內容','服務內容','服務內容','服務內容','服務內容','客戶背書','商業模式','合作流程'];
function update(){
 slides.forEach((s,i)=>{s.classList.toggle('active',i===current);s.inert=!reading&&i!==current;s.setAttribute('aria-hidden',String(!reading&&i!==current));});
 const section=current>=9?9:current===0?0:current<6?1:current;
 links.forEach(a=>{if(Number(a.dataset.section)===section)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});
 document.querySelector('#page-number').textContent=String(current+1).padStart(2,'0');
 document.querySelector('#page-label').textContent=labels[current]??'供應商合作';
 document.querySelector('#page-total').textContent=String(slides.length).padStart(2,'0');
}
function fit(){document.documentElement.style.setProperty('--scale',Math.min(innerWidth/1440,(innerHeight-120)/810));}
function applyMode(){
 reading=modeOverride??small.matches;
 document.body.classList.toggle('reading',reading);
 document.body.classList.toggle('presentation',!reading);
 modeButton.dataset.mode=reading?'reading':'presentation';
 modeButton.setAttribute('aria-label',reading?'切換為簡報模式':'切換為閱讀模式');
 fit();update();
 if(reading)requestAnimationFrame(scrollToCurrent);
}
function go(index,replace=false){
 current=Math.max(0,Math.min(slides.length-1,index));
 if(location.hash!==`#${slides[current].id}`)history[replace?'replaceState':'pushState'](null,'',`#${slides[current].id}`);
 update();if(reading)scrollToCurrent();
}
links.forEach(a=>a.addEventListener('click',e=>{e.preventDefault();go(Number(a.dataset.section));}));
document.querySelector('.wordmark').addEventListener('click',e=>{e.preventDefault();go(0);});
modeButton.addEventListener('click',()=>{modeOverride=!reading;applyMode();});
window.addEventListener('resize',fit);
small.addEventListener('change',()=>{modeOverride=null;applyMode();});
window.addEventListener('hashchange',()=>{const i=slides.findIndex(s=>s.id===location.hash.slice(1));if(i>=0){current=i;update();if(reading)scrollToCurrent();}});
document.addEventListener('keydown',e=>{
 // Ordinary toolbar buttons do not use arrow keys; keep navigation available after a mode change.
 if((reading&&!matchMedia('(hover: hover) and (pointer: fine)').matches)||e.defaultPrevented||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||e.target.closest('input,textarea,select,[contenteditable]:not([contenteditable="false"]),[role="slider"],[role="tablist"],[role="menu"]'))return;
 const moves={ArrowRight:current+1,ArrowDown:current+1,ArrowLeft:current-1,ArrowUp:current-1,Home:0,End:slides.length-1};
 if(e.key in moves){e.preventDefault();go(moves[e.key]);}
});
let ticking=false;
window.addEventListener('scroll',()=>{if(!reading||ticking||scrollLocked)return;ticking=true;requestAnimationFrame(()=>{if(!reading||scrollLocked){ticking=false;return;}const offset=document.querySelector('.toolbar').offsetHeight+40;let index=0;slides.forEach((s,i)=>{if(s.getBoundingClientRect().top<=offset)index=i;});if(index!==current){current=index;update();history.replaceState(null,'',`#${slides[current].id}`);}ticking=false;});},{passive:true});
document.querySelectorAll('img').forEach(img=>{img.addEventListener('error',()=>{const fallback=document.createElement('span');fallback.className='img-fallback';fallback.textContent=img.alt;img.replaceWith(fallback);});});
applyMode();
