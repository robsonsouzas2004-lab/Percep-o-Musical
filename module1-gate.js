/* Gate final do Módulo 1 v2 — reaplicado após a estrutura do curso para impedir que código legado v1 sobrescreva a regra. */
(function(){
const KEY='pm_m1_v2';
function m1(){try{return JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){return {}}}
function performance(){let m=m1(),done=Object.keys(m.done||{}).length,acc=m.attempts?Math.round((m.correct||0)/m.attempts*100):0;return {done,acc,ready:done>=40&&acc>=80}}
function apply(){
 const oldOpen=window.openVol;
 if(oldOpen&&!oldOpen.__m1v2){
  const wrapped=function(id){if(id===2){let p=performance();if(!p.ready){shell('courses',`<div class="hero"><h2>🔒 Volume 2 ainda bloqueado</h2><p>Antes de avançar, consolide o Módulo 1 pelos exercícios de reconhecimento das notas.</p><div class="callout"><b>Critério:</b> completar pelo menos <b>40 dos 50 exercícios oficiais</b> e manter <b>80% de precisão</b>.</div><p>Atual: <b>${p.done}/50</b> exercícios • <b>${p.acc}%</b> de precisão.</p><button class="btn" data-route="train">Continuar Módulo 1</button></div>`);return}}return oldOpen(id)};
  wrapped.__m1v2=true;window.openVol=wrapped;
 }
 const oldCourses=window.courses;
 if(oldCourses&&!oldCourses.__m1v2){
  const wrappedCourses=function(){oldCourses();setTimeout(()=>{document.querySelectorAll('[data-volume="2"]').forEach(b=>{let p=performance();if(!p.ready){b.disabled=true;b.textContent='🔒 Bloqueado — complete o Módulo 1';b.style.opacity='.65'}})},0)};
  wrappedCourses.__m1v2=true;window.courses=wrappedCourses;
 }
}
window.PM_M1_GATE={performance};
apply();
setTimeout(apply,0);
setTimeout(apply,50);
setTimeout(apply,250);
})();
