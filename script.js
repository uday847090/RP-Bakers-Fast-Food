/* =========================================================
   R.P. BAKERS & FAST FOOD — MAIN JAVASCRIPT
   ========================================================= */
const WA="916387585913";const KEY="rpBakeryCart";let cart=JSON.parse(localStorage.getItem(KEY)||"[]");let slide=0;let timer;
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
/* ---------- PAGE NAVIGATION ---------- */
function page(){const id=location.hash.slice(1)||"home";$$('.page').forEach(x=>x.classList.toggle('active',x.id===id));$$('.nav-link').forEach(x=>x.classList.toggle('active',x.getAttribute('href')==='#'+id));$('.nav-links')?.classList.remove('open');window.scrollTo(0,0)}
window.addEventListener('hashchange',page);page();
/* ---------- MOBILE MENU ---------- */
$('.menu-btn')?.addEventListener('click',()=>$('.nav-links').classList.toggle('open'));
/* ---------- HERO SLIDER ---------- */
const slides=$$('.slide'),dots=$('.dots');slides.forEach((_,i)=>{const b=document.createElement('button');b.onclick=()=>{go(i);restart()};dots.appendChild(b)});
function go(i){slide=(i+slides.length)%slides.length;slides.forEach((x,n)=>x.classList.toggle('active',n===slide));$$('.dots button').forEach((x,n)=>x.classList.toggle('active',n===slide))}function restart(){clearInterval(timer);timer=setInterval(()=>go(slide+1),5000)}$('.next')?.addEventListener('click',()=>{go(slide+1);restart()});$('.prev')?.addEventListener('click',()=>{go(slide-1);restart()});go(0);restart();
/* ---------- MENU FILTER ---------- */
$$('.tab').forEach(t=>t.addEventListener('click',()=>{$$('.tab').forEach(x=>x.classList.remove('active'));t.classList.add('active');const c=t.dataset.cat;$$('.product').forEach(x=>x.style.display=c==='all'||x.dataset.cat===c?'':'none')}));
/* ---------- CART ---------- */
function save(){localStorage.setItem(KEY,JSON.stringify(cart))}function total(){return cart.reduce((a,x)=>a+x.price*x.qty,0)}
function render(){const box=$('#cart');if(!box)return;if(!cart.length){box.innerHTML='<p style="padding:35px 0;color:#aaa">Your cart is empty. <a href="#menu" class="nav-link" style="color:#f1c86a">Browse menu →</a></p>'}else{box.innerHTML=cart.map((x,i)=>`<div class="cart-row"><div><b>${x.name}</b><p>₹${x.price} × ${x.qty}</p></div><div class="qty"><button data-a="minus" data-i="${i}">−</button> <span>${x.qty}</span> <button data-a="plus" data-i="${i}">+</button> <button data-a="remove" data-i="${i}">×</button></div></div>`).join('')}$('#total').textContent='₹'+total()}
document.addEventListener('click',e=>{const b=e.target.closest('.add');if(!b)return;const old=cart.find(x=>x.name===b.dataset.name);old?old.qty++:cart.push({name:b.dataset.name,price:+b.dataset.price,qty:1});save();render();toast(b.dataset.name+' cart mein add ho gaya.')});
$('#cart')?.addEventListener('click',e=>{const b=e.target.closest('[data-a]');if(!b)return;const i=+b.dataset.i,a=b.dataset.a;if(a==='plus')cart[i].qty++;if(a==='minus')cart[i].qty--;if(a==='remove'||cart[i].qty<=0)cart.splice(i,1);save();render()});render();
/* ---------- WHATSAPP ORDER ---------- */
$('#phone')?.addEventListener('input',e=>e.target.value=e.target.value.replace(/\D/g,'').slice(0,10));$('#orderBtn')?.addEventListener('click',()=>{if(!cart.length)return toast('Pehle cart mein item add karein.');const n=$('#name').value.trim(),p=$('#phone').value.trim(),a=$('#address').value.trim();if(!n||p.length!==10||!a)return toast('Name, 10 digit mobile aur address fill karein.');const lines=cart.map((x,i)=>`${i+1}. ${x.name} × ${x.qty} = ₹${x.price*x.qty}`).join('\n');const msg=`Hello R.P. Bakers & Fast Food 👋\n\nI want to place an order:\n${lines}\n\nTotal: ₹${total()}\n\nName: ${n}\nMobile: ${p}\nAddress: ${a}\n\nPlease confirm my order. Thank you!`;window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`,'_blank')});
/* ---------- CAKE ENQUIRY ---------- */
document.addEventListener('click',e=>{const b=e.target.closest('.cake-btn');if(!b)return;const msg=`Hello R.P. Bakers & Fast Food 👋\n\nI want to enquire about: ${b.dataset.cake}\n\nPlease share size options, availability and price details.`;window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`,'_blank')});
/* ---------- GALLERY LIGHTBOX ---------- */
$$('.gallery-item').forEach(b=>b.addEventListener('click',()=>{$('.lightbox img').src=b.querySelector('img').dataset.full;$('.lightbox').classList.add('open')}));$('.lightbox button')?.addEventListener('click',()=>$('.lightbox').classList.remove('open'));$('.lightbox')?.addEventListener('click',e=>{if(e.target===$('.lightbox'))$('.lightbox').classList.remove('open')});document.addEventListener('keydown',e=>{if(e.key==='Escape')$('.lightbox')?.classList.remove('open')});
/* ---------- TOAST ---------- */
let toastTimer;function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('show'),2200)}
