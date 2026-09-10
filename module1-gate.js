/* Gate real do Módulo 1: o próximo volume depende do desempenho auditivo na versão atual do treinamento. */
(function(){
function m1(){try{return JSON.parse(localStorage.getItem('pm_m1_v2')||'{}')}catch(e){return {}}}
function performance(){let m=m1(),done=Object.keys(m.done||{}).length,acc=m.attempts?Math.round((m.correct||0)/m.attempts*100):0;return {done,acc,ready:done>=40&&acc>=80}}
const oldOpen=window.openVol;
window.openVol=function(id){if(id===2){let p=performance();if(!p.ready){shell('courses',`<div class="hero"><h2>🔒 Volume 2 ainda bloqueado</h2><p>Antes de avançar, consolide o Módulo 1 pelos exercícios de reconhecimento das notas.</p><div class="callout"><b>Critério:</b> completar pelo menos <b>40 dos 50 exercícios oficiais</b> e manter <b>80% de precisão</b>. Depois, passe no teste de prontidão com 85%.</div><p>Atual: <b>${p.done}/50</b> exercícios • <b>${p.acc}%</b> de precisão.</p><button class="btn" data-route="train">Continuar Módulo 1</button></div>`);return}}oldOpen(id)};
const oldCourses=window.courses;
window.courses=function(){oldCourses();setTimeout(()=>{document.querySelectorAll('[data-volume="2"]').forEach(b=>{let p=performance();if(!p.ready){b.disabled=true;b.textContent='🔒 Bloqueado — complete o Módulo 1';b.style.opacity='.65'}})},0)};
window.PM_M1_GATE={performance};
})();
