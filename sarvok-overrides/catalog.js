document.querySelectorAll('dialog .close').forEach(b=>b.onclick=()=>b.closest('dialog').close());
const zoom=document.querySelector('#zoom');
document.querySelector('#zoom-open')?.addEventListener('click',()=>zoom?.showModal());
document.querySelectorAll('.gallery-thumbnail').forEach(button=>button.addEventListener('click',()=>{
 const selected=button.querySelector('img');
 for(const image of document.querySelectorAll('#zoom-open img, #zoom img')){image.src=selected.src;image.alt=selected.alt;}
 document.querySelectorAll('.gallery-thumbnail').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
}));
document.querySelectorAll('[data-marketplace]').forEach(link=>link.addEventListener('click',()=>{
 if(typeof window.gtag==='function')window.gtag('event','marketplace_click',{marketplace:'digikala',link_url:link.href,page_path:location.pathname});
}));

