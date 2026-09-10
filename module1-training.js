/* Módulo 1 v2 — Fundamentos da Escuta Musical.
   Princípio: conhecer a nota → associar som e nome → ampliar escolhas → comparar → retirar referências.
   O aluno não precisa chegar sabendo teoria ou reconhecendo notas previamente. */
(function(){
const KEY='pm_m1_v2';
let m;try{m=JSON.parse(localStorage.getItem(KEY)||'{"done":{},"attempts":0,"correct":0}')}catch(e){m={done:{},attempts:0,correct:0}};
m.done=m.done||{};m.attempts=m.attempts||0;m.correct=m.correct||0;
const N=['C','C#','D','Eb','E','F','F#','G','Ab','A','Bb','B'];
const natural=['C','D','E','F','G','A','B'];
function save(){localStorage.setItem(KEY,JSON.stringify(m))}
function up(n,s){return N[(N.indexOf(n)+s+12)%12]}
function label(n){return ({C:'Dó',D:'Ré',E:'Mi',F:'Fá',G:'Sol',A:'Lá',B:'Si', 'C#':'Dó♯',Eb:'Mi♭',F#:'Fá♯',Ab:'Lá♭',Bb:'Si♭'})[n]||n}
function make(id,stage,skill,prompt,answer,choices,seq,explain){return {id,stage,skill,prompt,answer,choices,seq,note:answer,explain}}
const bank=[];
// ETAPA 1 — duas notas muito diferentes. Sempre há referência antes do alvo.
for(let i=0;i<10;i++){
  const pairs=[['C','G'],['G','C'],['C','E'],['E','C'],['C','F'],['F','C'],['C','A'],['A','C'],['C','D'],['D','C']];
  const [a,b]=pairs[i]; const answer=i%2?b:a;
  bank.push(make(i+1,1,'reconhecimento inicial',`Qual nota você ouviu? Escolha pelo som: ${label(a)} ou ${label(b)}.`,answer,[a,b],[[a,.65],[answer,.8]],`Primeiro ouça ${label(a)} como referência. Depois compare o som-alvo. Não tente adivinhar pela memória visual; escute a altura.`));
}
// ETAPA 2 — três notas naturais, mantendo Dó como âncora no começo.
for(let i=0;i<10;i++){
  const sets=[['C','D','G'],['C','E','G'],['C','F','G'],['C','A','G'],['C','D','E'],['D','F','A'],['E','G','B'],['C','E','A'],['D','G','B'],['C','F','A']];
  const set=sets[i]; const answer=set[(i*2+1)%3];
  bank.push(make(i+11,2,'três notas naturais',`Qual foi a nota-alvo?`,answer,set,[[set[0],.55],[set[1],.55],[set[2],.55],[answer,.78]],`Agora há três possibilidades. Primeiro reconheça o conjunto; depois compare o alvo com cada possibilidade mentalmente.`));
}
// ETAPA 3 — cinco notas naturais. A escolha aumenta, mas ainda há apoio contextual.
for(let i=0;i<10;i++){
  const sets=[['C','D','E','G','A'],['C','D','F','G','B'],['D','E','F','A','B'],['C','E','F','A','B'],['C','D','E','F','G']];
  const set=sets[i%sets.length]; const answer=set[(i+2)%5];
  bank.push(make(i+21,3,'cinco notas naturais',`Qual nota foi tocada?`,answer,set,[[set[0],.48],[set[1],.48],[set[2],.48],[set[3],.48],[set[4],.48],[answer,.78]],`Você já conhece a ideia de nota como uma altura nomeada. A dificuldade agora é separar sons parecidos dentro de um grupo maior.`));
}
// ETAPA 4 — sete notas naturais. Sem acidentes ainda: objetivo é consolidar o mapa básico.
for(let i=0;i<10;i++){
  const answer=natural[(i*3+1)%7];
  const seq=natural.map((n,j)=>[n,.36,j*.01]); seq.push([answer,.75,.02]);
  bank.push(make(i+31,4,'sete notas naturais',`Qual das sete notas naturais foi o alvo?`,answer,natural.slice(),seq,`As sete notas são Dó, Ré, Mi, Fá, Sol, Lá e Si. Não é necessário decorar tudo de uma vez: use comparação, canto mental e repetição.`));
}
// ETAPA 5 — consolidação: oitavas, repetição e retirada progressiva da referência.
for(let i=0;i<10;i++){
  if(i<4){
    const n=natural[[0,2,4,6][i]]; const high=n; const low=n;
    bank.push(make(i+41,5,'mesma nota em oitavas',`Os dois sons têm o mesmo nome de nota, mesmo estando em alturas diferentes. Qual é a nota?`,n,natural.slice(),[[n,.42],[up(n,7),.55],[n,.42]],`A oitava muda o registro, mas mantém o nome da nota. Aqui você aprende a não confundir “mais agudo” com “outra nota”.`));
  } else if(i<7){
    const answer=natural[(i+1)%7];
    bank.push(make(i+41,5,'sem referência completa',`Sem uma nota de referência anunciada: qual nota natural você reconheceu?`,answer,natural.slice(),[[answer,.72]],`Agora a referência externa foi retirada. Use o mapa sonoro que você construiu nas etapas anteriores.`));
  } else {
    const a=natural[(i+2)%7],b=natural[(i+4)%7]; const answer=i%2?a:b;
    bank.push(make(i+41,5,'comparação final',`Ouça os dois sons. Qual deles corresponde à nota indicada nas opções?`,answer,[a,b],[[a,.52],[b,.52],[answer,.72]],`A etapa final verifica se você consegue reconhecer e comparar sem depender de uma sequência longa de notas.`));
  }
}
function play(e){
  if(typeof playNotes==='function'){playNotes(e.seq,'instrument')}
  else e.seq.forEach((x,i)=>setTimeout(()=>beep(x[0],x[1]),i*600));
}
function finish(e,ok){m.attempts++;if(ok)m.correct++;m.done[e.id]=1;save()}
function pct(){return m.attempts?Math.round(m.correct/m.attempts*100):0}
window.PM_M1={bank,play,state:()=>m,save,version:'v2'};
window.train=function(){
  let completed=Object.keys(m.done).length;
  let next=completed<50?bank[completed]:bank[Math.floor(Math.random()*50)];
  window._m1ex=next;
  const progress=Math.round(completed/50*100);
  shell('train',`<div class="section"><h2>🎧 Módulo 1 — Conhecendo as Notas</h2><p class="muted">Exercício ${next.id}/50 • Etapa ${next.stage} de 5 • ${next.skill}</p><div class="progress"><div class="bar" style="width:${progress}%"></div></div><p class="small">${completed}/50 concluídos • ${pct()}% de precisão</p></div><div class="callout"><b>Como estudar:</b> ouça → compare → tente dizer o nome mentalmente → responda → confira → repita o erro. <b>Você não precisa saber isso antes.</b> O módulo foi feito para ensinar a reconhecer.</div><div class="exercise"><h3>${next.prompt}</h3><button class="btn" id="m1play">🔊 Ouvir</button><div class="choices">${next.choices.map(c=>`<button class="choice m1ans" data-a="${encodeURIComponent(c)}">${label(c)}</button>`).join('')}</div><div id="m1res"></div></div><div class="card" style="margin-top:13px"><h3>💡 O que este exercício treina?</h3><p>${next.explain}</p><p class="small"><b>Próxima evolução:</b> mais notas → notas mais próximas → oitavas → menos referências.</p></div>`)
}
document.addEventListener('click',e=>{
  if(e.target.id==='m1play'&&window._m1ex){play(window._m1ex);return}
  let a=e.target.closest('.m1ans');
  if(a&&window._m1ex){
    let x=window._m1ex,ans=decodeURIComponent(a.dataset.a),ok=ans===x.answer;finish(x,ok);
    document.querySelectorAll('.m1ans').forEach(b=>b.disabled=true);
    document.getElementById('m1res').innerHTML=`<div class="result ${ok?'ok':'bad'}"><b>${ok?'✅ Correto!':'❌ Ainda não. Vamos reforçar.'}</b><br>Resposta: <b>${label(x.answer)}</b><br><span>${x.explain}</span></div><div class="row" style="margin-top:10px"><button class="btn" data-route="train">Próximo</button><button class="btn alt" id="m1replay">🔊 Repetir</button></div>`;
    return;
  }
  if(e.target.id==='m1replay'&&window._m1ex)play(window._m1ex)
})
})();
