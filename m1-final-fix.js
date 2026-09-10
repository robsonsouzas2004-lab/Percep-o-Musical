/* Correção final M1 v2 — aplicada depois da estrutura do curso. */
(function(){
  const KEY='pm_m1_v2';
  function perf(){
    let m={}; try{m=JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){}
    const done=Object.keys(m.done||{}).length;
    const attempts=m.attempts||0, correct=m.correct||0;
    const acc=attempts?Math.round(correct/attempts*100):0;
    let ready=false; try{ready=!!(window.PM_COURSE&&window.PM_COURSE.moduleState(1).ready)}catch(e){}
    return {done,acc,ready:done>=40&&acc>=80&&ready};
  }
  const originalOpen=window.openVol;
  if(originalOpen){
    window.openVol=function(id){
      if(id===2){
        const p=perf();
        if(!p.ready){
          shell('courses',`<div class="hero"><h2>🔒 Volume 2 ainda bloqueado</h2><p>Conclua a fundação auditiva antes de avançar.</p><div class="callout"><b>Critério:</b> pelo menos <b>40/50 exercícios</b>, <b>80% de precisão</b> e <b>85% no teste de prontidão</b>.</div><p class="small">Seu progresso: ${p.done}/50 exercícios • ${p.acc}% de precisão.</p><button class="btn" data-volume="1">Voltar ao Módulo 1</button></div>`);
          return;
        }
      }
      return originalOpen(id);
    };
  }
  const originalCourses=window.courses;
  if(originalCourses){
    window.courses=function(){
      originalCourses();
      const p=perf();
      document.querySelectorAll('[data-volume="2"]').forEach(b=>{
        if(!p.ready){b.textContent='🔒 Volume 2 bloqueado';b.disabled=true;b.style.opacity='.55';}
      });
    };
  }
  window.PM_M1_GATE_V2={performance:perf};
})();
