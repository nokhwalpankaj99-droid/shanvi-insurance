const STS_FEEDS = {
  tax: { q:'Income Tax India CBDT ITR TDS', official:'https://www.incometax.gov.in/iec/foportal/latest-news' },
  gst: { q:'GST India GSTN GST Council tax', official:'https://www.gst.gov.in/' },
  business: { q:'MSME Udyam India business tax compliance', official:'https://udyamregistration.gov.in/' },
  food: { q:'FSSAI FoSCoS food license India compliance', official:'https://fssai.gov.in/business' }
};
const STS_QUIZ = [
 {t:'GST BASICS',q:'Which return is generally used by a regular taxpayer to report outward supplies?',o:['GSTR-1','GSTR-9C','CMP-08','ITR-1'],a:0,e:'GSTR-1 is used for reporting outward supplies.'},
 {t:'INCOME TAX',q:'What does AIS stand for on the Income Tax e-Filing portal?',o:['Annual Information Statement','Annual Income Summary','Assessed Income Sheet','Account Information Service'],a:0,e:'AIS means Annual Information Statement.'},
 {t:'MSME',q:'What is the official government portal for Udyam Registration?',o:['udyamregistration.gov.in','msme-help.in','gst.gov.in','mca-udyam.com'],a:0,e:'Udyam Registration is provided through the official Government of India portal.'},
 {t:'FSSAI',q:'Which portal is used for Food Safety Compliance System (FoSCoS)?',o:['foscos.fssai.gov.in','fssai-gst.gov.in','foodindia.gov.in','foodsafety.in'],a:0,e:'FoSCoS is FSSAI’s Food Safety Compliance System.'},
 {t:'TDS',q:'TDS stands for:',o:['Tax Deducted at Source','Tax Deposit System','Total Deduction Statement','Tax Data Service'],a:0,e:'TDS means Tax Deducted at Source.'},
 {t:'GST',q:'Which tax is generally charged under the GST framework on an intra-state supply?',o:['CGST + SGST/UTGST','IGST only','TDS only','Cess only'],a:0,e:'Intra-state supplies generally involve CGST and SGST/UTGST, subject to the applicable rules.'},
 {t:'ACCOUNTING',q:'Which statement records assets, liabilities and equity?',o:['Balance Sheet','Sales Register','Cash Memo','Purchase Order'],a:0,e:'A balance sheet presents assets, liabilities and equity at a point in time.'}
];

function localDayIndex(){ const d=new Date(); const start=new Date(d.getFullYear(),0,0); return Math.floor((d-start)/86400000); }
function setToday(){
  const d=new Date();
  const opts={day:'2-digit',month:'short',year:'numeric'};
  const el=document.getElementById('todayDate'); if(el) el.textContent=d.toLocaleDateString('en-IN',opts);
  const qd=document.getElementById('quizDay'); if(qd) qd.textContent=String((localDayIndex()%99)+1).padStart(2,'0');
}
function escapeHTML(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));}
function timeAgo(date){
  const n=Date.now()-new Date(date).getTime(); if(!isFinite(n)) return '';
  const h=Math.floor(n/3600000); if(h<1) return 'Just now'; if(h<24) return h+'h ago'; return Math.floor(h/24)+'d ago';
}
async function loadNews(feed='tax'){
  const list=document.getElementById('newsList'); if(!list)return;
  const cfg=STS_FEEDS[feed]||STS_FEEDS.tax;
  list.innerHTML='<div class="loading-card">Loading latest '+escapeHTML(feed)+' news…</div>';
  const rss='https://news.google.com/rss/search?q='+encodeURIComponent(cfg.q)+'&hl=en-IN&gl=IN&ceid=IN:en';
  const api='https://api.rss2json.com/v1/api.json?rss_url='+encodeURIComponent(rss);
  try{
    const res=await fetch(api,{cache:'no-store'}); if(!res.ok) throw new Error('feed');
    const data=await res.json(); const items=(data.items||[]).slice(0,7);
    if(!items.length) throw new Error('empty');
    list.innerHTML=items.map((x,i)=>`<article class="news-item"><div class="news-rank">${String(i+1).padStart(2,'0')}</div><div><span>${escapeHTML((x.author||'Tax News').slice(0,45))} • ${timeAgo(x.pubDate)}</span><h3><a href="${escapeHTML(x.link)}" target="_blank" rel="noopener">${escapeHTML(x.title)}</a></h3><p>${escapeHTML((x.description||'').replace(/<[^>]+>/g,'').slice(0,150))}</p></div></article>`).join('');
  }catch(e){
    list.innerHTML=`<div class="news-fallback"><b>Live feed temporarily unavailable.</b><p>Open the official update page for the latest verified notifications.</p><a class="sts-btn primary" href="${cfg.official}" target="_blank" rel="noopener">Open Official Updates ↗</a></div>`;
  }
}
function loadDailyQuiz(){
  const q=STS_QUIZ[localDayIndex()%STS_QUIZ.length];
  document.getElementById('quizTopic').textContent=q.t;
  document.getElementById('quizQuestion').textContent=q.q;
  const box=document.getElementById('quizOptions'), result=document.getElementById('quizResult'), next=document.getElementById('quizNext');
  result.innerHTML=''; next.style.display='none';
  box.innerHTML=q.o.map((x,i)=>`<button class="quiz-option" onclick="answerQuiz(${i},${q.a})"><span>${String.fromCharCode(65+i)}</span>${escapeHTML(x)}</button>`).join('');
}
function answerQuiz(selected,correct){
  const result=document.getElementById('quizResult'), q=STS_QUIZ[localDayIndex()%STS_QUIZ.length];
  document.querySelectorAll('.quiz-option').forEach((b,i)=>{b.disabled=true;if(i===correct)b.classList.add('correct');if(i===selected&&i!==correct)b.classList.add('wrong')});
  result.className='quiz-result '+(selected===correct?'good':'bad');
  result.innerHTML=(selected===correct?'✓ Correct! ':'✕ Not quite. ')+escapeHTML(q.e);
  document.getElementById('quizNext').style.display='inline-flex';
}
function calcGSTNew(){
  const a=Number(document.getElementById('gstAmount').value||0), r=Number(document.getElementById('gstRate').value)/100, m=document.getElementById('gstMode').value;
  let base,gst,total;
  if(m==='exclusive'){base=a;gst=a*r;total=a+gst}else{total=a;gst=a-a/(1+r);base=a-gst}
  document.getElementById('gstResult').innerHTML='<b>Taxable:</b> ₹'+base.toFixed(2)+' &nbsp; <b>GST:</b> ₹'+gst.toFixed(2)+' &nbsp; <b>Total:</b> ₹'+total.toFixed(2);
}
document.addEventListener('DOMContentLoaded',()=>{
  setToday(); loadDailyQuiz(); loadNews('tax');
  document.querySelectorAll('.news-tab').forEach(btn=>btn.addEventListener('click',()=>{
    document.querySelectorAll('.news-tab').forEach(x=>x.classList.remove('active')); btn.classList.add('active'); loadNews(btn.dataset.feed);
  }));
});
