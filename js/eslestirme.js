/* 12'li eşleştirme tahtası: okuldaki kâğıt oyunun ekrandaki karşılığı.
   Bir takımın 12 görseli ve aynı 12 ad kartı birlikte görünür; öğrenci görsele ve ada dokunarak eşler.
   Öğreniyorum: her eşleşme hemen denetlenir, yanlışta ipucu ve ikinci deneme vardır.
   Kendimi Deniyorum: 12 eşleşme bitince "Kontrol et" ile toplu bakılır; tek deneme. */
'use strict';
const BOARD_PREV_START=startContent,BOARD_PREV_RENDER=render,BOARD_PREV_BACK=back;
/* Kural: bütün eşleştirmeler 12'li tahtayla oynanır. Kartlarda takım (set) yoksa sıralarına göre 12'li takımlara bölünür. */
function boardSetsFill(){const a=contentArr();if(st.op!=='match'||!a.length||a.some(x=>x.set))return;a.forEach((x,i)=>{x.set=Math.floor(i/12)+1;if(!x.source)x.source={};if(!x.source.card)x.source.card=i%12+1;});}
function boardActive(){boardSetsFill();return st.op==='match'&&contentSets().length>0;}
startContent=function(setNo){
  if(!boardActive())return BOARD_PREV_START(setNo);
  if(setNo!==undefined){st.contentSet=setNo;go('boardmode');return;}
  startBoard(st.practice||'learn');
};
back=function(){if(st.screen==='boardmode'){go('content');return;}BOARD_PREV_BACK();};
function startBoard(practice){
  st.practice=practice;
  const items=contentArr().filter(x=>x.set===st.contentSet).slice().sort((a,b)=>(a.source&&b.source?a.source.card-b.source.card:0));
  st.board={items,names:shuffle(items.map(x=>x.answer)),pair:{},sel:null,selName:null,tries:{},res:{},checked:false,last:Date.now()};
  st.brk=0;st.kDone=false;st.done=false;st.inBreak=false;st.lastRes=null;
  st.sess={id:Date.now(),p:st.guest?'Misafir':st.prof,t:new Date().toISOString(),op:'match',subject:st.subject,practice,set:st.contentSet,s:0,ok:0,fix:0,bad:0,br:0,qs:[]};
  st.savedMsg=st.guest?'Misafir oturumu: sonuçlar kaydedilmiyor.':'';
  tStart();st.screen='board';render();window.scrollTo(0,0);
}
function boardItem(id){return st.board.items.find(x=>x.id===id);}
function boardUsed(name){return Object.values(st.board.pair).includes(name);}
function boardRow(it,r){
  const now=Date.now(),s=Math.round((now-st.board.last)/100)/10;st.board.last=now;
  st.board.res[it.id]=r;
  if(r===1){st.sess.ok++;st.sess.s+=10;}else if(r===2){st.sess.fix++;st.sess.s+=5;}else st.sess.bad++;
  st.sess.qs.push({q:it.set+'. takım, '+it.source.card+'. kart',a:it.answer,r,s,hintUsed:r===2,source:it.source});
}
function boardFinished(){
  st.kDone=true;st.run=false;st.t0=0;saveProgress();
}
function tapImg(id){
  const b=st.board;if(st.kDone||st.inBreak||st.modalOpen||b.checked)return;
  if(st.practice==='learn'&&b.res[id]!==undefined)return;
  if(st.practice==='check'&&b.pair[id]&&!b.selName){delete b.pair[id];b.sel=id;render();return;}
  if(b.selName){tryPair(id,b.selName);return;}
  b.sel=b.sel===id?null:id;render();
}
function tapName(i){
  const b=st.board,name=b.names[i];if(st.kDone||st.inBreak||st.modalOpen||b.checked||boardUsed(name))return;
  if(b.sel){tryPair(b.sel,name);return;}
  b.selName=b.selName===name?null:name;render();
}
function tryPair(id,name){
  const b=st.board,it=boardItem(id);b.sel=null;b.selName=null;
  if(st.practice==='check'){
    b.pair[id]=name;st.lastRes=null;
    if(Object.keys(b.pair).length===b.items.length)st.lastRes={cls:'',head:'12 görselin hepsi eşlendi.',text:'Kontrol etmeden önce değiştirmek istediğin görsele dokun.'};
    render();return;
  }
  if(name===it.answer){
    const r=(b.tries[id]||0)===0?1:2;b.pair[id]=name;boardRow(it,r);
    st.lastRes={cls:r===1?'ok':'fix',head:(r===1?'Doğru! +10 puan':'Düzelttin! +5 puan')+' · '+it.answer,text:it.explanation||''};
  }else{
    b.tries[id]=(b.tries[id]||0)+1;
    if(b.tries[id]>=2){b.pair[id]=it.answer;boardRow(it,0);st.lastRes={cls:'fix',head:'Bu görselin adı: '+it.answer,text:it.explanation||''};}
    else st.lastRes={cls:'fix',head:'Bu eşleşme doğru değil. Birlikte tekrar deneyelim.',text:it.hint||'Görseli ve adları yeniden incele.'};
  }
  if(Object.keys(b.res).length===b.items.length){boardFinished();st.lastRes={cls:'ok',head:'Çalışma tamamlandı.',text:'12 görseli eşledin.'};}
  render();
}
function checkBoard(){
  const b=st.board;if(b.checked||Object.keys(b.pair).length<b.items.length)return;
  b.checked=true;b.items.forEach(it=>boardRow(it,b.pair[it.id]===it.answer?1:0));
  boardFinished();
  st.lastRes={cls:'ok',head:'Kontrol edildi: '+st.sess.ok+' / '+b.items.length+' doğru.',text:st.sess.bad?'Kırmızı kartların altında doğru ad yazıyor.':'Hepsi doğru.'};
  render();
}
function zoomImg(id){
  const it=boardItem(id),ov=document.getElementById('ov');st.modalOpen=true;pauseT();
  ov.innerHTML='<div class="modal zoom" role="dialog" aria-modal="true" aria-label="Büyük görsel"><img src="'+esc(it.image)+'" alt="'+esc(it.imageAlt||'Araç fotoğrafı')+'"><button class="btn pri" id="zClose">Kapat</button></div>';
  ov.className='on';const c=document.getElementById('zClose');c.onclick=closeModal;c.focus();
}
function boardModeHTML(){
  return topBar(subjectName()+' · '+st.contentSet+'. takım')+'<div class="wrap"><h1>Nasıl çalışalım?</h1><div class="list">'+
    menuButton('Öğreniyorum','Her eşleşme hemen denetlenir. Yanlışta ipucu ve ikinci deneme var.',"startBoard('learn')")+
    menuButton('Kendimi Deniyorum','12 görseli eşle, sonra Kontrol et düğmesine dokun.',"startBoard('check')")+
    '</div><p class="note">Her oturumda 1 mola hakkın var.</p></div>';
}
function boardHTML(){
  const b=st.board,done=Object.keys(st.practice==='check'?b.pair:b.res).length;
  let h=topBar(subjectName()+' · Eşleştirme · '+st.contentSet+'. takım',true)+'<div class="wrap board-wrap">';
  h+='<div class="stats"><span class="chip">Eşlenen <b>'+done+' / '+b.items.length+'</b></span>'+(st.practice==='learn'||b.checked?'<span class="chip">Puan <b>'+st.sess.s+'</b></span>':'')+'</div>';
  if(!st.kDone)h+='<p class="board-help">'+(b.selName?'<b>'+esc(b.selName)+'</b> seçildi. Şimdi görsele dokun.':b.sel?'Görsel seçildi. Şimdi doğru ada dokun.':'Önce bir görsele, sonra doğru ada dokun.')+'</p>';
  h+='<div class="board"><div class="board-imgs">';
  b.items.forEach((it,i)=>{
    const r=b.res[it.id],nm=b.pair[it.id],sel=b.sel===it.id;
    let cls='bimg'+(sel?' sel':'')+(r===1||r===2?' ok':'')+(r===0?(st.practice==='check'?' bad':' shown'):'');
    let lbl=nm?esc(nm):'&nbsp;';
    if(b.checked&&r===0)lbl='<s>'+esc(nm)+'</s><br>'+esc(it.answer);
    h+='<div class="'+cls+'"><button class="bimg-btn" aria-pressed="'+sel+'" aria-label="'+(i+1)+'. görsel'+(nm?', eşlenen ad: '+esc(nm):'')+'" onclick="tapImg(\''+it.id+'\')"><img src="'+esc(it.image)+'" alt=""></button>'+
      '<button class="zoom-btn" aria-label="'+(i+1)+'. görseli büyüt" onclick="zoomImg(\''+it.id+'\')">⤢</button><div class="blbl">'+lbl+'</div></div>';
  });
  h+='</div><div class="board-side">'+msgHtml()+'<div class="board-names">';
  b.names.forEach((n,i)=>{if(boardUsed(n))return;h+='<button class="bname'+(b.selName===n?' sel':'')+'" aria-pressed="'+(b.selName===n)+'" onclick="tapName('+i+')">'+esc(n)+'</button>';});
  h+='</div>';
  if(st.practice==='check'&&!b.checked)h+='<button class="btn pri" onclick="checkBoard()"'+(done<b.items.length?' disabled':'')+'>Kontrol et</button>';
  if(st.kDone)h+='<button class="btn pri" onclick="finish()">Raporu Gör</button><button class="btn" onclick="startBoard(st.practice)">Bu takımı yeniden oyna</button>';
  h+='</div></div>'+footHtml()+'</div>';
  return h;
}
render=function(){
  if(st.screen==='boardmode'||st.screen==='board'){
    document.getElementById('app').innerHTML=st.screen==='board'?boardHTML():boardModeHTML();
    document.querySelectorAll('.msg').forEach(e=>{e.setAttribute('role','status');e.setAttribute('aria-live','polite');});
    return;
  }
  BOARD_PREV_RENDER();
};
