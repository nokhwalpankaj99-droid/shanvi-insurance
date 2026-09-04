function escapeHTML(v){return String(v??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');}

  const saved=load('shanviSiteSettings',{}), heads=(saved.headlines&&saved.headlines.length?saved.headlines:defaults); const poster=document.querySelector('.festival-poster'); if(poster&&saved.poster?.data)poster.src=saved.poster.data;
  const el=document.getElementById('headlineRotator');
  if(el){let i=0;el.textContent=heads[0]||defaults[0];setInterval(()=>{i=(i+1)%heads.length;el.classList.remove('ticker-in');void el.offsetWidth;el.classList.add('ticker-in');el.textContent=heads[i]||defaults[0]},3500)}
}
function fileDataURL(file){
  return new Promise((resolve,reject)=>{
    if(!file){resolve(null);return}
    if(file.size>3*1024*1024){reject(new Error('File 3 MB se chhoti rakhein static portal storage ke liye.'));return}
    const r=new FileReader();r.onload=()=>resolve({name:file.name,type:file.type,size:file.size,data:r.result});r.onerror=reject;r.readAsDataURL(file);
  });
}
function emailRequest(subject,body){
  try{window.open(`mailto:${SHANVI.supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,'_self')}catch(e){}
}
function getPIForCustomer(u){
  return load('shanviPIRequests',[]).filter(x=>u && ((x.email||'').toLowerCase()===(u.email||'').toLowerCase())).pop();
}

/* v22 premium conversion + WhatsApp helpers */
function shanviWhatsApp(text){
  const url=`https://wa.me/919664029638?text=${encodeURIComponent(text)}`;
  window.open(url,'_blank','noopener');
}
function quoteCustomer(){
  return {
    name:(document.getElementById('quoteName')?.value||'').trim(),
    mobile:(document.getElementById('quoteMobile')?.value||'').trim(),
    email:(document.getElementById('quoteEmail')?.value||'').trim().toLowerCase()
  };
}
function getQuote(){
  const el=id=>document.getElementById(id); const v=cleanVehicle(el('vehicleNo').value), type=el('vehicleType').value, cover=el('cover').value;
  const out=el('quoteResults'), status=el('quoteStatus'), customer=quoteCustomer();
  if(customer.name.length<2){status.innerHTML='<span class="error">Please enter customer name.</span>';return}
  if(!/^[6-9]\d{9}$/.test(customer.mobile.replace(/\D/g,''))){status.innerHTML='<span class="error">Please enter a valid 10-digit mobile number.</span>';return}
  if(v.length<6){status.innerHTML='<span class="error">Please enter a valid vehicle number.</span>';out.innerHTML='';return}
  const base=type==='bike'?(cover==='comprehensive'?1850:843):(cover==='comprehensive'?7200:cover==='thirdparty'?3416:2800);
  status.innerHTML=`<b>Vehicle:</b> ${v} &nbsp; <span class="success">Quote options are ready for ${customer.name}.</span>`;
  out.innerHTML=insurers.map((x,i)=>{let p=Math.round(base*(1+(i%5-2)*.035));return `<div class="quote-card"><div class="insurer-mini"><div class="ins-logo logo-${x[1]}">${x[0].split(' ').map(w=>w[0]).slice(0,2).join('')}</div><div><b>${x[0]}</b><small>${cover==='comprehensive'?'Comprehensive':cover==='thirdparty'?'Third Party':'Limited Third Party'}</small></div></div><div><b>${type==='bike'?'Two Wheeler':'Car'}</b><small>${v}</small></div><div class="price">₹${p.toLocaleString('en-IN')}</div><button class="btn primary" onclick="requestQuote('${x[0]}',${p})">WhatsApp Request →</button></div>`}).join('');
}
async function requestQuote(insurer,price){
  const v=document.getElementById('vehicleNo').value.trim().toUpperCase();
  const vehicleType=document.getElementById('vehicleType')?.value||'';
  const cover=document.getElementById('cover')?.value||'';
  const q=quoteCustomer();
  if(!q.name || !q.mobile){getQuote();return}
  const lead={name:q.name,mobile:q.mobile,email:q.email,insurance_type:`${vehicleType==='bike'?'Bike':'Car'} Insurance - ${cover} - ${insurer}`,message:`Quote Request\nVehicle: ${v}\nQuoted Premium: ₹${price}\nInsurer: ${insurer}`};
  const wa=`Hello Shanvi Insurance Services,\nI want an insurance quote.\n\nName: ${q.name}\nMobile: ${q.mobile}\nVehicle: ${v}\nVehicle Type: ${vehicleType}\nCover: ${cover}\nInsurer: ${insurer}\nIndicative Premium: ₹${price}`;
  try{
    await submitSupabaseLead(lead);
    const st=document.getElementById('quoteStatus'); if(st) st.innerHTML='<b>Request saved.</b> <span class="success">WhatsApp is opening with your enquiry.</span>';
  }catch(err){console.warn(err)}
  shanviWhatsApp(wa);
}

const SHANVI_MAX_IMAGE = 8*1024*1024;
const SHANVI_MAX_VIDEO = 35*1024*1024;
async function uploadPIFile(file, requestId, folder){
  if(!file) throw new Error(`${folder} file is required.`);
  const isVideo=file.type.startsWith('video/');
  const limit=isVideo?SHANVI_MAX_VIDEO:SHANVI_MAX_IMAGE;
  if(file.size>limit) throw new Error(`${file.name} is too large. Images max 8 MB, video max 35 MB.`);
  const safe=file.name.replace(/[^a-zA-Z0-9._-]/g,'_');
  const path=`${requestId}/${folder}-${Date.now()}-${safe}`;
  const r=await fetch(`${SUPABASE_URL}/storage/v1/object/INSURANCE/${path}`,{method:'POST',headers:{apikey:SUPABASE_PUBLISHABLE_KEY,Authorization:`Bearer ${SUPABASE_PUBLISHABLE_KEY}`,'Content-Type':file.type||'application/octet-stream'},body:file});
  if(!r.ok) throw new Error(await r.text()||`Upload failed: ${file.name}`);
  return `INSURANCE/${path}`;
}
async function savePIRequestBackend(req){
  const r=await fetch(`${SUPABASE_REST_URL}/pi_requests`,{method:'POST',headers:{apikey:SUPABASE_PUBLISHABLE_KEY,Authorization:`Bearer ${SUPABASE_PUBLISHABLE_KEY}`,'Content-Type':'application/json','Prefer':'return=minimal'},body:JSON.stringify(req)});
  if(!r.ok) throw new Error(await r.text()||'PI request could not be saved.');
  try{await fetch(`${SUPABASE_URL}/functions/v1/notify-pi`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(req)})}catch(e){console.warn('PI email notification failed',e)}
}


function calcGST(){
  const amount=Number(document.getElementById('gstAmount')?.value||0);
  const rate=Number(document.getElementById('gstRate')?.value||0);
  const mode=document.getElementById('gstMode')?.value;
  const out=document.getElementById('gstResult');
  if(!out) return;
  if(!amount || amount<0){ out.textContent='Please enter a valid amount.'; return; }
  let base,gst,total;
  if(mode==='inclusive'){ total=amount; base=amount/(1+rate/100); gst=amount-base; }
  else { base=amount; gst=amount*rate/100; total=base+gst; }
  const cgst=gst/2, sgst=gst/2;
  out.innerHTML=`<b>Taxable Amount:</b> ₹${base.toFixed(2)} &nbsp; | &nbsp; <b>GST:</b> ₹${gst.toFixed(2)}<br><b>CGST:</b> ₹${cgst.toFixed(2)} &nbsp; <b>SGST:</b> ₹${sgst.toFixed(2)}<br><b>Total:</b> ₹${total.toFixed(2)}`;
}

const DAILY_QUIZ=[
 {q:"GST stands for?",o:["Goods and Services Tax","General Sales Tax","Government Service Tax","Goods Supply Tariff"],a:0},
 {q:"Which return is generally used to report outward supplies?",o:["GSTR-1","GSTR-2","GSTR-9C","ITR-1"],a:0},
 {q:"PAN is issued by which department?",o:["Income Tax Department","GST Council","MCA","RBI"],a:0},
 {q:"TDS means?",o:["Tax Deducted at Source","Tax Deposit System","Total Duty Statement","Tax Data Service"],a:0},
 {q:"Udyam registration relates to?",o:["MSME","Passport","Vehicle RC","Income certificate"],a:0},
 {q:"FSSAI relates mainly to?",o:["Food safety","Insurance","Banking","Transport"],a:0},
 {q:"A balance sheet reports?",o:["Assets, liabilities and equity","Only sales","Only tax","Only cash"],a:0},
 {q:"GST is a?",o:["Indirect tax","Direct tax","Property tax only","Income tax only"],a:0},
 {q:"ITR is filed for?",o:["Income-tax reporting","GST registration only","Food licence only","Vehicle insurance"],a:0},
 {q:"TallyPrime is mainly used for?",o:["Accounting and business management","Passport issuance","GST lawmaking","Bank licensing"],a:0}
];
let quiz={i:0,ans:Array(10).fill(null),started:false,sec:600,timer:null};
function initDailyQuiz(){
 quiz={i:0,ans:Array(10).fill(null),started:true,sec:600,timer:null};
 const w=document.getElementById('quizWelcome'); if(w) w.style.display='none';
 const q=document.getElementById('quizQuestion'); if(q) q.style.display='block';
 const o=document.getElementById('quizOptions'); if(o) o.style.display='grid';
 const a=document.getElementById('quizActions'); if(a) a.style.display='flex';
 renderQuiz(); clearInterval(quiz.timer); quiz.timer=setInterval(()=>{quiz.sec--; const t=document.getElementById('quizTimer'); if(t)t.textContent=Math.floor(quiz.sec/60)+":"+String(quiz.sec%60).padStart(2,'0'); if(quiz.sec<=0) submitDailyQuiz();},1000);
}
function renderQuiz(){
 const q=DAILY_QUIZ[quiz.i], title=document.getElementById('quizQuestion'), box=document.getElementById('quizOptions');
 if(title) title.innerHTML=`Question ${quiz.i+1} of 10: ${escapeHTML(q.q)}`;
 if(box) box.innerHTML=q.o.map((x,i)=>`<button type="button" class="quiz-option ${quiz.ans[quiz.i]===i?'selected':''}" onclick="answerQuiz(${i})"><span>${String.fromCharCode(65+i)}</span>${escapeHTML(x)}</button>`).join('');
 const next=document.getElementById('quizNextBtn'); if(next) next.disabled=quiz.ans[quiz.i]===null;
}
function answerQuiz(i){quiz.ans[quiz.i]=i;renderQuiz();}
function nextDailyQuestion(){if(quiz.i<9){quiz.i++;renderQuiz();}else submitDailyQuiz();}
function submitDailyQuiz(){
 clearInterval(quiz.timer); let score=0; DAILY_QUIZ.forEach((q,i)=>{if(quiz.ans[i]===q.a)score++;});
 const pct=score*10; const final=document.getElementById('dailyQuizFinal'); if(final){final.style.display='block';final.innerHTML=`<div class="quiz-result"><div class="daily-final-score">${score}/10 (${pct}%)</div><p>${pct>=70?'Congratulations! You passed today’s quiz.':'Keep learning and try again tomorrow.'}</p></div>`;}
 const area=document.getElementById('dailyQuizArea'); if(area) area.style.display='none';
}
