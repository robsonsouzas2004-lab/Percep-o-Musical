/* Gate final Módulo 1 v3 — corrige cache e teste de prontidão. */
(function(){
const KEY='pm_m1_v2';
function m1(){try{return JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){return {}}}
function performance(){let m=m1(),done=Object.keys(m.done||{}).length,acc=m.attempts?Math.round((m.correct||0)/m.attempts*100):0;return {done,acc,ready:done>=40&&acc>=80}}
function apply(){
 const oldOpen=window.openVol;
 if(oldOpen&&!oldOpen.__m1v3){
  const wrapped=function(id){if(id===2){let p=performance();if(!p.ready){shell('courses',`<div class="hero"><h2>🔒 Volume 2 ainda bloqueado</h2><p>Antes de avançar, consolide o Módulo 1.</p><div class="callout"><b>Critério:</b> 40/50 exercícios e 80% de precisão.</div><p>Atual: <b>${p.done}/50</b> exercícios • <b>${p.acc}%</b>.</p><button class="btn" data-route="train">Continuar Módulo 1</button></div>`);return}}return oldOpen(id)};
  wrapped.__m1v3=true;window.openVol=wrapped;
 }
 const oldCourses=window.courses;
 if(oldCourses&&!oldCourses.__m1v3){
  const wrappedCourses=function(){oldCourses();setTimeout(()=>{document.querySelectorAll('[data-volume="2"]').forEach(b=>{let p=performance();if(!p.ready){b.disabled=true;b.textContent='🔒 Bloqueado — complete o Módulo 1';b.style.opacity='.65'}})},20)};
  wrappedCourses.__m1v3=true;window.courses=wrappedCourses;
 }
}
window.PM_M1_GATE={performance};
apply();setTimeout(apply,0);setTimeout(apply,100);setTimeout(apply,500);

/* O navegador pode manter o JS antigo. Carrega uma cópia com versão para garantir Módulo 1 v2. */
setTimeout(function(){
 if(window.PM_M1&&window.PM_M1.version==='v2')return;
 const s=document.createElement('script');s.src='module1-training.js?v=20260910-4';s.onload=function(){if(typeof train==='function')train()};document.head.appendChild(s);
},700);

/* Teste de prontidão próprio do M1. Executa antes do listener legado e não depende de funções internas antigas. */
document.addEventListener('click',function(e){
 const b=e.target.closest('[data-ready="1"]');
 if(!b)return;
 e.preventDefault();e.stopImmediatePropagation();
 if(!window.PM_M1){setTimeout(()=>b.click(),800);return}
 const bank=window.PM_M1.bank,qs=[];while(qs.length<15){const q=bank[Math.floor(Math.random()*bank.length)];if(!qs.some(x=>x.id===q.id))qs.push(q)}
 let pos=0,ok=0;
 function draw(){const q=qs[pos],opts=q.choices.slice().sort(()=>Math.random()-.5);window._gateReady={qs,pos,ok,q};shell('courses',`<div class="section"><h2>🧪 Teste de prontidão — Módulo 1</h2><p class="muted">Questão ${pos+1} de 15 • ouça antes de responder.</p></div><div class="exercise"><h3>${q.prompt}</h3><button class="btn" id="gateReadyPlay">🔊 Ouvir</button><div class="choices">${opts.map(a=>`<button class="choice gateReadyAns" data-a="${encodeURIComponent(a)}">${({'C':'Dó','D':'Ré','E':'Mi','F':'Fá','G':'Sol','A':'Lá','B':'Si','C#':'Dó♯','Eb':'Mi♭','F#':'Fá♯','Ab':'Lá♭','Bb':'Si♭'})[a]||a}</button>`).join('')}</div><p class="small">Acertos: ${ok}</p></div>`)}
 function finish(){const pct=Math.round(ok/15*100),m=m1();m.attempts=(m.attempts||0)+1;if(pct>=85)m.correct=(m.correct||0)+1;localStorage.setItem(KEY,JSON.stringify(m));shell('courses',`<div class="hero"><h2>${pct>=85?'🏆 Pronto para avançar!':'🔁 Reforço recomendado'}</h2><p>Resultado: <b>${pct}%</b> (${ok}/15).</p><p>${pct>=85?'Teste concluído com sucesso.':'Volte ao treino e repita as habilidades em que teve dificuldade.'}</p><button class="btn" data-volume="1">Voltar ao Módulo 1</button></div>`)}
 draw();window._gateReadyDraw=draw;window._gateReadyFinish=finish;
},{capture:true});
document.addEventListener('click',function(e){
 if(e.target.id==='gateReadyPlay'&&window._gateReady){e.preventDefault();window.PM_M1.play(window._gateReady.q);return}
 const a=e.target.closest('.gateReadyAns');if(a&&window._gateReady){const x=window._gateReady;x.ok+=decodeURIComponent(a.dataset.a)===x.q.answer?1:0;x.pos++;if(x.pos>=15){window._gateReady.ok=x.ok;window._gateReadyFinish()}else{window._gateReady={qs:x.qs,pos:x.pos,ok:x.ok,q:x.qs[x.pos]};window._gateReadyDraw()}}
},{capture:true});
})();