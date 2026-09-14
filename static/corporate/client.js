/* Corporate LP v4. Approved v3 visuals; native carousel and Netlify Forms.
   Motion is event-driven, stays optional, and never hijacks scrolling. */
(() => {
 'use strict';
 const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
 const projects=JSON.parse($('#corporate-projects').textContent), byId=new Map(projects.map(p=>[p.id,p]));
 const motionMedia=matchMedia('(prefers-reduced-motion: reduce)'), finePointer=matchMedia('(pointer: fine)');
 let manualReduced=false;
 let reduced=motionMedia.matches, frame=0, px=0, py=0;
 const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
 const hero=$('.hero'), visual=$('.hero-visual'), scene=$('.architecture-scene');

 // Progressive imagery from versioned, same-origin repository assets.
 function bindImage(img){
  const box=img.closest('.product-media');
  const load=()=>{box.classList.add('is-loaded');box.classList.remove('is-error');};
  const fail=()=>{
   if(img.dataset.fallback&&!img.dataset.fallbackTried){img.dataset.fallbackTried='1';img.src=img.dataset.fallback;}
   else{box.classList.add('is-error');box.classList.remove('is-loaded');}
  };
  img.addEventListener('load',load);img.addEventListener('error',fail);
  if(img.complete){if(img.naturalWidth)load();else fail();}
 }
 $$('img[data-project-image]').forEach(bindImage);

 // Mobile navigation with a bounded focus sequence and escape support.
 const menu=$('#mobile-menu'), menuButton=$('.menu-toggle');
 function setMenu(open,restore=false){
  menu.hidden=!open;menuButton.setAttribute('aria-expanded',String(open));
  menuButton.setAttribute('aria-label',open?'メニューを閉じる':'メニューを開く');
  document.body.classList.toggle('menu-open',open);$('main').inert=open;$('.site-footer').inert=open;
  $('.site-header .brand').inert=open;$('.header-contact').inert=open;
  if(open)$('a',menu).focus();else if(restore)menuButton.focus();
 }
 menuButton.addEventListener('click',()=>setMenu(menu.hidden));
 $$('a',menu).forEach(a=>a.addEventListener('click',()=>setMenu(false)));
 document.addEventListener('keydown',e=>{
  if(menu.hidden)return;
  if(e.key==='Escape'){setMenu(false,true);return;}
  if(e.key==='Tab'){const stops=[menuButton,...$$('a,button',menu)],first=stops[0],last=stops.at(-1);
   if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
   else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
  }
 });

 // Corporate navigation follows the reader, not a chapter counter.
 if('IntersectionObserver' in window){
  const navObserver=new IntersectionObserver(entries=>{
   for(const e of entries)if(e.isIntersecting)$$('.desktop-nav a').forEach(a=>{
    if(a.hash==='#'+e.target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');
   });
  },{rootMargin:'-18% 0px -58% 0px'});
  ['services','approach','works','company','contact'].forEach(id=>navObserver.observe($('#'+id)));
 }

 // Reveal just once; default HTML remains fully visible without JS.
 let revealObserver=null;
 const revealEls=$$('.reveal');
 function setupReveal(){
  if(reduced||!('IntersectionObserver' in window)){revealEls.forEach(n=>n.classList.remove('pending'));return;}
  document.body.classList.add('motion-ready');
  revealObserver=new IntersectionObserver(entries=>entries.forEach(e=>{
   if(e.isIntersecting){e.target.classList.remove('pending');e.target.classList.add('visible');revealObserver.unobserve(e.target);}
  }),{threshold:.06,rootMargin:'0px 0px 28px 0px'});
  revealEls.forEach(el=>{
   if(el.getBoundingClientRect().top>innerHeight*.94){el.classList.add('pending');revealObserver.observe(el);}else el.classList.add('visible');
  });
 }

 // Small 3D layer separation and joining, driven by native scroll.
 function requestRender(){if(!frame)frame=requestAnimationFrame(render);}
 function render(){
  frame=0;const doc=document.documentElement;
  $('.reading-progress span').style.transform=`scaleX(${clamp(scrollY/Math.max(1,doc.scrollHeight-innerHeight))})`;
  if(reduced||document.hidden)return;
  const r=hero.getBoundingClientRect();
  if(r.bottom>0&&r.top<innerHeight){
   const p=clamp(-r.top/Math.max(1,hero.offsetHeight));
   scene.style.setProperty('--tilt-x',`${px*3.2+p*5}deg`);
   scene.style.setProperty('--tilt-y',`${py*-2.8-p*4}deg`);
   scene.style.setProperty('--scroll-shift',`${p*100}px`);
  }
 }
 visual.addEventListener('pointermove',e=>{
  if(reduced||!finePointer.matches)return;const r=visual.getBoundingClientRect();
  px=clamp((e.clientX-r.left)/r.width*2-1,-1,1);py=clamp((e.clientY-r.top)/r.height*2-1,-1,1);requestRender();
 },{passive:true});
 visual.addEventListener('pointerleave',()=>{px=py=0;requestRender();});
 window.addEventListener('scroll',requestRender,{passive:true});
 document.addEventListener('visibilitychange',()=>{document.body.classList.toggle('page-hidden',document.hidden);if(!document.hidden)requestRender();});
 if('IntersectionObserver' in window)new IntersectionObserver(es=>es.forEach(e=>hero.classList.toggle('scene-offscreen',!e.isIntersecting))).observe(hero);
 function updateMotion(){
  reduced=motionMedia.matches||manualReduced;document.body.classList.toggle('reduced-motion',reduced);
  document.documentElement.style.scrollBehavior=reduced?'auto':'';
  const b=$('.motion-toggle');b.setAttribute('aria-pressed',String(reduced));b.disabled=motionMedia.matches;
  $('.motion-label',b).textContent=motionMedia.matches?'OS設定で動きを抑制':reduced?'動きを再開':'動きを抑える';
  if(reduced){scene.style.setProperty('--scroll-shift','0px');scene.style.setProperty('--tilt-x','0deg');scene.style.setProperty('--tilt-y','0deg');revealObserver?.disconnect();revealEls.forEach(el=>el.classList.remove('pending'));}
  requestRender();
 }
 $('.motion-toggle').addEventListener('click',()=>{manualReduced=!manualReduced;updateMotion();});
 motionMedia.addEventListener('change',updateMotion);updateMotion();setupReveal();

 // Native scroll-snap carousel. No autoplay, scroll hijacking, or cloned slides.
 const track=$('#works-track'), cards=$$('.work-card',track);
 const prev=$('[data-carousel-prev]'), next=$('[data-carousel-next]');
 let carouselFrame=0;
 const cardLeft=card=>card.offsetLeft-cards[0].offsetLeft;
 function syncCarousel(){
  carouselFrame=0;
  const max=Math.max(0,track.scrollWidth-track.clientWidth),left=track.scrollLeft;
  prev.disabled=left<2;next.disabled=left>=max-2;
  const rect=track.getBoundingClientRect();
  const visible=cards.map((card,i)=>({r:card.getBoundingClientRect(),i})).filter(({r})=>Math.min(r.right,rect.right)-Math.max(r.left,rect.left)>r.width*.5);
  if(visible.length){const first=visible[0].i+1,last=visible.at(-1).i+1;$('#works-position').textContent=(first===last?first:`${first}–${last}`)+` / ${cards.length}`;}
 }
 function queueCarousel(){if(!carouselFrame)carouselFrame=requestAnimationFrame(syncCarousel);}
 function moveCarousel(direction){
  const current=cards.reduce((best,card,i)=>Math.abs(cardLeft(card)-track.scrollLeft)<Math.abs(cardLeft(cards[best])-track.scrollLeft)?i:best,0);
  const target=clamp(current+direction,0,cards.length-1);
  track.scrollTo({left:cardLeft(cards[target]),behavior:reduced?'instant':'smooth'});
 }
 prev.addEventListener('click',()=>moveCarousel(-1));next.addEventListener('click',()=>moveCarousel(1));
 track.addEventListener('scroll',queueCarousel,{passive:true});
 track.addEventListener('keydown',event=>{
  if(event.target!==track)return;
  if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();moveCarousel(event.key==='ArrowRight'?1:-1);}
  if(event.key==='Home'||event.key==='End'){event.preventDefault();track.scrollTo({left:event.key==='Home'?0:track.scrollWidth,behavior:reduced?'instant':'smooth'});}
 });
 if('ResizeObserver' in window)new ResizeObserver(queueCarousel).observe(track);
 syncCarousel();

 // Native dialogs preserve focus, scroll locking, backdrop and Escape behavior.
 const returnFocus=new WeakMap();
 function openDialog(d,trigger){returnFocus.set(d,trigger||document.activeElement);d.showModal();document.body.classList.add('dialog-open');}
 $$('dialog').forEach(d=>{
  $('.close-dialog',d).addEventListener('click',()=>d.close());
  d.addEventListener('close',()=>{if(!$$('dialog[open]').length)document.body.classList.remove('dialog-open');const f=returnFocus.get(d);if(f?.isConnected)f.focus({preventScroll:true});});
  d.addEventListener('click',e=>{if(e.target!==d||(d.id==='contact-dialog'&&sending))return;const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();});
 });
 function element(tag,text,cls){const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n;}
 function image(p){
  const box=element('div',undefined,'product-media');box.style.setProperty('--media-bg',p.color);
  const label=p.kind==='commissioned'?'機能イメージ':'公開紹介画像';
  const placeholder=element('div',undefined,'image-fallback');placeholder.setAttribute('aria-hidden','true');
  placeholder.append(element('span',p.name),element('small',label));
  const img=new Image();img.alt=`${p.name}の${label}`;img.width=p.width;img.height=p.height;img.decoding='async';
  img.src=p.src;box.append(placeholder,img);bindImage(img);return box;
 }
 $$('[data-open-project]').forEach(b=>b.addEventListener('click',()=>{
  const p=byId.get(b.dataset.openProject);if(!p)return;
  const host=$('#project-dialog-content');host.replaceChildren(image(p));const body=element('div',undefined,'dialog-body');
  body.append(element('span',p.kind==='commissioned'?'受託開発':'自社サービス','work-kind '+(p.kind==='commissioned'?'commissioned':'owned')),element('p',p.tag,'project-tag'));const title=element('h2',p.name);title.id='project-dialog-title';body.append(title,element('p',p.description,'project-description'));
  const ul=element('ul');p.points.forEach(x=>ul.append(element('li',x)));body.append(ul,element('p',`開発領域：${p.roles.join(' / ')}`,'project-roles'));
  if(p.url){
   const link=element('a',`${p.name}の公開サイトへ ↗`,'button primary');link.href=p.url;link.target='_blank';link.rel='noopener noreferrer';
   body.append(link,element('p','掲載画像は公開紹介画像です。現在の機能・提供状況はリンク先の公開サイトをご確認ください。','dialog-note'));
  }else{
   body.append(element('p','受託開発の実績です。企業名・システムURLは非公開としており、掲載画像は機能イメージです。','dialog-note'));
   const link=element('a','同様のシステム開発を相談する →','button primary');link.href='#contact';
   link.addEventListener('click',()=>{$('#project-dialog').close();$('#contact-form').elements.subject.value='Web・SaaS開発';});body.append(link);
  }
  host.append(body);openDialog($('#project-dialog'),b);
 }));
 $$('[data-open-privacy]').forEach(b=>b.addEventListener('click',()=>openDialog($('#privacy-dialog'),b)));

 // Confirmation first. Netlify receives data only after an explicit send click.
 const form=$('#contact-form'), message=form.elements.message, send=$('#send-contact');
 let mailBody='',mailSubject='',submission=null,sending=false;
 $$('[data-service]').forEach(a=>a.addEventListener('click',()=>{if([...form.elements.subject.options].some(o=>o.value===a.dataset.service))form.elements.subject.value=a.dataset.service;}));
 message.addEventListener('input',()=>{$('#message-count').textContent=`${message.value.length} / 1200`;message.setCustomValidity('');});
 form.elements.name.addEventListener('input',()=>form.elements.name.setCustomValidity(''));
 form.addEventListener('submit',event=>{
  event.preventDefault();if(sending)return;
  for(const field of [form.elements.name,message])field.setCustomValidity(field.value.trim()?'':'空白以外の文字を入力してください。');
  if(!form.reportValidity())return;
  const data=Object.fromEntries(new FormData(form));
  const pairs=[['会社名',data.company.trim()||'未入力'],['お名前',data.name.trim()],['メールアドレス',data.email.trim()],['ご相談分野',data.subject],['ご相談内容',data.message.trim()]];
  const dl=element('dl');pairs.forEach(([key,value])=>{const row=element('div');row.append(element('dt',key),element('dd',value));dl.append(row);});$('#contact-summary').replaceChildren(dl);
  submission=new URLSearchParams(data);
  mailBody='株式会社レーンスパイア ご担当者様\n\n以下の内容について相談を希望します。\n\n'+pairs.map(([key,value])=>`${key}\n${value}`).join('\n\n');
  mailSubject=`【開発・導入のご相談】${data.subject} / ${data.name.trim()}`;
  $('.copy-status').textContent='';$('#copy-fallback').hidden=true;$('#send-status').textContent='';$('#form-status').textContent='';
  send.disabled=false;send.textContent='この内容で送信する →';
  openDialog($('#contact-dialog'),$('button[type=submit]',form));
 });
 send.addEventListener('click',async()=>{
  if(sending||!submission)return;
  sending=true;send.disabled=true;send.textContent='送信中…';
  const status=$('#send-status'),dialog=$('#contact-dialog');
  status.dataset.state='sending';status.textContent='お問い合わせを送信しています。';
  const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),15000);
  $('.close-dialog',dialog).disabled=true;
  try{
   const response=await fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:submission.toString(),signal:controller.signal});
   if(!response.ok)throw new Error(`HTTP ${response.status}`);
   submission=null;form.reset();$('#message-count').textContent='0 / 1200';
   $('#form-status').textContent='お問い合わせを受け付けました。内容を確認のうえ、ご連絡いたします。';
   dialog.close();mailBody='';mailSubject='';$('#contact-summary').replaceChildren();$('#copy-fallback').value='';
  }catch(error){
   status.dataset.state='error';
   status.textContent=error.name==='AbortError'?'送信結果を確認できませんでした。重複送信を避けるため、再送前に info@lanespire.com へお問い合わせください。':'送信できませんでした。入力内容は保持しています。再度お試しいただくか、本文をコピーして info@lanespire.com へご連絡ください。';
  }finally{
   clearTimeout(timeout);sending=false;send.disabled=false;send.textContent='この内容で送信する →';$('.close-dialog',dialog).disabled=false;
  }
 });
 $('#contact-dialog').addEventListener('cancel',event=>{if(sending)event.preventDefault();});
 $('#copy-contact').addEventListener('click',async()=>{
  const text=`宛先: info@lanespire.com\n件名: ${mailSubject}\n\n${mailBody}`;
  try{if(!navigator.clipboard?.writeText)throw Error('Clipboard unavailable');await navigator.clipboard.writeText(text);$('.copy-status').textContent='宛先・件名・本文をコピーしました。';}
  catch{const field=$('#copy-fallback');field.value=text;field.hidden=false;field.focus();field.select();$('.copy-status').textContent='下の欄を選択しています。コピーしてメールに貼り付けてください。';}
 });
 form.inert=false;
 window.addEventListener('resize',()=>{if(innerWidth>800&&!menu.hidden)setMenu(false);queueCarousel();requestRender();},{passive:true});
 window.addEventListener('pageshow',requestRender);
 $$('details').forEach(d=>d.addEventListener('toggle',requestRender));
 requestRender();
})();
