/* SOSC JUS — landing (3 páginas) — script compartilhado */

/* ---------------- detecção de SO + link de loja ---------------- */
// TODO(Juliano): trocar '#' pelos links reais da App Store / Google Play quando publicados.
const STORE_LINKS = { ios:'#', android:'#' };
const ua = navigator.userAgent || '';
const isIOS = /iPhone|iPad|iPod/i.test(ua);
const isAndroid = /Android/i.test(ua);

function initNavCta(){
  const navctatext = document.getElementById('navctatext');
  if (!navctatext) return;
  if (isIOS){ navctatext.textContent = 'Baixar na App Store'; }
  else if (isAndroid){ navctatext.textContent = 'Baixar no Google Play'; }
  else { navctatext.textContent = 'Baixar o app'; }
}

function openStore(pref){
  const which = pref || (isIOS ? 'ios' : isAndroid ? 'android' : 'ios');
  const url = STORE_LINKS[which];
  if (url && url !== '#') window.open(url, '_blank');
  else alert('Link da loja ainda não configurado neste protótipo — troque STORE_LINKS em assets/app.js.');
}

/* ---------------- ticker (elemento de assinatura) ---------------- */
function buildTicker(elId, items){
  const el = document.getElementById(elId);
  if (!el) return;
  const html = items.map(i=>`
    <div class="ticker-item"><span class="tag">${i.tag}</span> ${i.txt} <span class="cnj">${i.meta}</span></div>
  `).join('');
  el.innerHTML = html + html; // duplicado para o loop contínuo
}

/* ---------------- PHONE SIMULATOR — toque pra avançar (tipo stories) ---------------- */
function initPhoneSimulator(rootId, screens){
  const root = document.getElementById(rootId);
  if (!root) return;
  const imgsWrap = root.querySelector('.phone-screens');
  const progressWrap = root.querySelector('.phone-progress');
  const captionEl = document.getElementById(rootId + 'Caption');

  imgsWrap.innerHTML = screens.map((s,i)=>`<img src="${s.img}" alt="${s.label}" class="${i===0?'active':''}">`).join('');
  progressWrap.innerHTML = screens.map(()=>`<div class="bar"><i></i></div>`).join('');

  let idx = 0;
  const imgs = imgsWrap.querySelectorAll('img');
  const bars = progressWrap.querySelectorAll('.bar');

  function render(){
    imgs.forEach((im,i)=> im.classList.toggle('active', i===idx));
    bars.forEach((b,i)=>{
      b.classList.toggle('done', i < idx);
      const inner = b.querySelector('i');
      inner.style.width = i === idx ? '100%' : (i < idx ? '100%' : '0%');
    });
    if (captionEl) captionEl.innerHTML = `<b>${screens[idx].label}</b> — ${screens[idx].desc}`;
  }
  function next(){ idx = (idx + 1) % screens.length; render(); registerEngagement(); }
  function prev(){ idx = (idx - 1 + screens.length) % screens.length; render(); }

  root.addEventListener('click', (e)=>{
    const rect = root.getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x < rect.width * 0.35) prev(); else next();
  });

  render();
}

/* ---------------- modal de ferramenta ---------------- */
function openModal(tool){
  const backdrop = document.getElementById('modalBackdrop');
  document.getElementById('modalImg').src = tool.img;
  document.getElementById('modalImg').alt = tool.title;
  document.getElementById('modalEyebrow').textContent = tool.tag;
  document.getElementById('modalTitle').textContent = tool.title;
  document.getElementById('modalDesc').textContent = tool.desc;
  const noteEl = document.getElementById('modalNote');
  if (noteEl) noteEl.textContent = tool.note || '';
  backdrop.classList.add('open');
  registerEngagement();
}
function closeModal(){
  const backdrop = document.getElementById('modalBackdrop');
  if (backdrop) backdrop.classList.remove('open');
}

/* ---------------- montagem do grid de ferramentas ---------------- */
function buildToolGrid(elId, tools){
  const grid = document.getElementById(elId);
  if (!grid) return;
  grid.innerHTML = tools.map((t,i)=>`
    <button class="toolcard" onclick='openModal(${JSON.stringify(t).replace(/'/g, "&apos;")})'>
      <div class="icon">${t.icon}</div>
      <h3>${t.title}</h3>
      <p>${t.desc}</p>
      <div class="see">Ver na tela real
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </div>
    </button>
  `).join('');
}

/* ---------------- engajamento -> CTA fixo mais insistente ---------------- */
let __clicks = 0;
function registerEngagement(){
  __clicks++;
  const stickyCta = document.getElementById('stickyCta');
  if (!stickyCta) return;
  if (__clicks >= 2) stickyCta.classList.add('show');
  if (__clicks === 3){
    stickyCta.classList.add('nudge');
    setTimeout(()=>stickyCta.classList.remove('nudge'), 650);
  }
}
function initScrollEngagement(){
  const stickyCta = document.getElementById('stickyCta');
  if (!stickyCta) return;
  let scrolledDeep = false;
  window.addEventListener('scroll', ()=>{
    if (!scrolledDeep && (window.scrollY + window.innerHeight) > document.body.scrollHeight * 0.38){
      scrolledDeep = true;
      stickyCta.classList.add('show');
    }
  });
}

/* ---------------- SOS DEMO — 3 estados (toque / gravando / selada) ---------------- */
function initSosDemo(rootId){
  const root = document.getElementById(rootId);
  if (!root) return;
  const states = root.querySelectorAll('.sos-state');
  const bars = root.querySelectorAll('.sos-demo-progress .bar');
  let idx = 0;
  let timer = null;

  function render(){
    states.forEach((s,i)=> s.classList.toggle('active', i===idx));
    bars.forEach((b,i)=>{
      b.classList.toggle('done', i < idx);
      b.querySelector('i').style.width = i <= idx ? '100%' : '0%';
    });
  }
  function next(){ idx = (idx + 1) % states.length; render(); }
  function restart(){
    clearInterval(timer);
    timer = setInterval(next, 2800);
  }
  root.addEventListener('click', ()=>{ next(); restart(); });
  render();
  restart();
}

document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeModal(); });
document.addEventListener('DOMContentLoaded', initNavCta);
