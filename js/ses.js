/* Sesli okuma: okumada zorlanan öğrenciler için cihazın Türkçe sesiyle (Web Speech API) okuma.
   İlke: okuma desteği cevabı vermez.
   - Ad kartları, sorular, seçenekler ve geri bildirimler okunur.
   - Eşleştirmede görselin adı eşleşmeden önce okunmaz; Kendimi Deniyorum'da görsele dokununca hiç okunmaz.
   - Aynı anda tek ses çalar; yeni okuma öncekini susturur. Arka plan sesi ve müzik yoktur.
   - Cihazda Türkçe ses yoksa uyarı gösterilir; oyun sessiz çalışmaya devam eder. */
'use strict';
var SES={acik:true,sira:[],sonMesaj:null,uyari:false};
try{var _s=localStorage.getItem(PRE+'ses');if(_s!==null)SES.acik=JSON.parse(_s)!==false;}catch(e){}
/* Yabancı kökenli adların okunuşu: ekrandaki yazı değişmez, yalnız okunuş düzeltilir. */
var OKUNUS={
  'SMOOTHİE BLENDERİ':'smuti blenderi',
  'WAFFLE MAKİNESİ':'vaffıl makinesi',
  'MUFFİN KALIBI':'mafin kalıbı',
  'GASTRONORM (GN) KÜVET':'gastronorm küvet, ge ne küvet',
  'ÇAY MAKİNESİ (ÇAYCI)':'çay makinesi, çaycı',
  'KESME TAHTASI (DOĞRAMA TAHTASI)':'kesme tahtası, doğrama tahtası',
  'LİMON RENDESİ (ZESTER)':'limon rendesi'
};
function sesVar(){try{return typeof window!=='undefined'&&'speechSynthesis' in window&&typeof SpeechSynthesisUtterance!=='undefined';}catch(e){return false;}}
function sesAd(ad){ad=String(ad||'').trim();return OKUNUS[ad]||OKUNUS[ad.toLocaleUpperCase('tr')]||ad.toLocaleLowerCase('tr');}
/* Ölçü birimleri, boşluklar ve parantezler cihazın doğru okuyacağı biçime getirilir. */
function sesMetin(t){
  t=String(t||'');
  Object.keys(OKUNUS).forEach(function(k){t=t.split(k).join(OKUNUS[k]);});
  return t.replace(/…+|\.{3,}/g,' boşluk ').replace(/(\d)\s*[–-]\s*(\d)/g,'$1 ile $2')
    .replace(/(\d)\s*ml(?![\wçğıöşüÇĞİÖŞÜ])/g,'$1 mililitre').replace(/(\d)\s*g(?![\wçğıöşüÇĞİÖŞÜ])/g,'$1 gram').replace(/°\s*C/g,' derece').replace(/(\d)\s*cm(?![\wçğıöşüÇĞİÖŞÜ])/g,'$1 santimetre')
    .replace(/\bGN\b/g,'ge ne').replace(/\s+/g,' ').trim();
}
function sesBirlestir(a,b){a=String(a||'').trim();if(!b)return a;return a+(/[.?!:]$/.test(a)?' ':'. ')+b;}
function sesTurkce(){try{return speechSynthesis.getVoices().filter(function(v){return /^tr/i.test(v.lang);});}catch(e){return [];}}
function sesSoyle(metin,sirala){
  if(!SES.acik||!metin||!sesVar())return;
  try{
    if(!sirala)speechSynthesis.cancel();
    var u=new SpeechSynthesisUtterance(sesMetin(metin));u.lang='tr-TR';u.rate=0.9;
    var v=sesTurkce();if(v.length)u.voice=v[0];
    else if(speechSynthesis.getVoices().length&&!SES.uyari){SES.uyari=true;sesUyari();}
    speechSynthesis.speak(u);
  }catch(e){}
}
function sesSus(){try{if(sesVar())speechSynthesis.cancel();}catch(e){}}
function sesUyari(){
  var a=document.getElementById('app');if(!a||!a.insertAdjacentHTML)return;
  a.insertAdjacentHTML('afterbegin','<p class="ses-uyari" role="status">Bu cihazda Türkçe ses bulunamadı. Telefonun ayarlarından Türkçe metin okuma sesi yüklenebilir. Oyun sessiz devam eder.</p>');
}
/* 🔊 düğmesi: okunacak metin bir listede tutulur, düğme sıra numarasıyla okutur. */
function sesDugme(metin,etiket){
  if(SES.sira.length>400)SES.sira=[];
  SES.sira.push(metin);
  return '<button type="button" class="spk" aria-label="'+esc(etiket||'Sesli dinle')+'" onclick="event.stopPropagation();sesSoyle(SES.sira['+(SES.sira.length-1)+'])">🔊</button>';
}
function sesAcKapa(){SES.acik=!SES.acik;try{localStorage.setItem(PRE+'ses',JSON.stringify(SES.acik));}catch(e){}if(!SES.acik)sesSus();render();}

/* ---- Ekranlara bağlama (bu dosya en son yüklenir) ---- */
var SES_TOP=topBar;
topBar=function(t,nb){return SES_TOP(t,nb).replace('<div class="who">','<button type="button" class="ses-ac" aria-pressed="'+SES.acik+'" aria-label="Sesli okuma '+(SES.acik?'açık. Kapatmak için dokun':'kapalı. Açmak için dokun')+'" onclick="sesAcKapa()">'+(SES.acik?'🔊':'🔇')+'</button><div class="who">');};
/* Geri bildirim (Doğru, Tekrar dene, açıklama) bir kez kendiliğinden okunur; kutudaki 🔊 ile yeniden dinlenir. */
var SES_MSG=msgHtml;
msgHtml=function(){
  var h=SES_MSG();if(!st.lastRes||!h)return h;
  var t=sesBirlestir(st.lastRes.head,st.lastRes.text);
  if(st.lastRes!==SES.sonMesaj){SES.sonMesaj=st.lastRes;sesSoyle(t,true);}
  return h.replace(/^(<div class="msg[^"]*">)/,'$1'+sesDugme(t,'Geri bildirimi dinle'));
};
/* Yeni soru ekrana gelince soru ve seçenekler bir kez okunur. */
function sesSoru(anahtar,metin){if(anahtar!==SES.sonSoru){SES.sonSoru=anahtar;sesSoyle(metin);}}
var SES_QUIZ=quizHtml;
quizHtml=function(){
  var h=SES_QUIZ();
  if(st.op==='ad'&&st.q&&st.q.opts&&!st.kDone){
    var t='Öne çıkan parçanın adı nedir? Seçenekler: '+st.q.opts.map(function(o){return sesAd(ITEMS[o].ad);}).join(', ')+'.';
    h=h.replace('<div class="qtext">','<div class="qtext">'+sesDugme(t,'Soruyu dinle'));
    if(!st.done&&!st.tries)sesSoru('ad'+st.sess.id+'-'+st.sess.qs.length,t);
  }else if(st.op==='kur'&&st.q&&!st.kDone){
    var k='Sıradaki parça: '+sesAd(ITEMS[st.q.key].ad)+'. Masada bu parçanın yerine dokun.';
    h=h.replace('<div class="nm">','<div class="nm">'+sesDugme(k,'Parçanın adını dinle'));
    if(!st.done&&!st.tries)sesSoru('kur'+st.sess.id+'-'+st.q.key,k);
  }
  return h;
};
var SES_CQ=contentQuizHTML;
contentQuizHTML=function(){
  var h=SES_CQ(),q=st.q;
  if(!q||st.kDone||!q.choices)return h;
  var resimli=q.choices.some(function(c){return c.image;});
  var t=sesBirlestir(q.prompt,(resimli?'Seçenekler fotoğraflıdır: A, B, C ve D.':q.choices.map(function(c){return (q.group?c.id+', ':'')+sesAd(c.text);}).join('. ')+'.'));
  h=h.replace('<section class="card"><h2>','<section class="card"><h2>'+sesDugme(t,'Soruyu ve seçenekleri dinle'));
  if(!st.done&&!st.tries)sesSoru('q'+st.sess.id+'-'+q.id,t);
  return h;
};
var SES_GO=go;
go=function(s){sesSus();SES_GO(s);};
