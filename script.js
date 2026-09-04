const SHANVI={
  supportPhone:'96640-29638', supportEmail:'nokhwalpankaj99@gmail.com', address:'58 LNP Ridmalsar Road, Sri Ganganagar, Rajasthan - 335061', piFee:190,
  commission:{bike:75,car:210}, agentCodePrefix:'SIS2022'
};


/* Supabase enquiry integration */
async function submitSupabaseLead(lead){
  if(typeof SUPABASE_URL==='undefined' || typeof SUPABASE_PUBLISHABLE_KEY==='undefined') throw new Error('Supabase configuration missing.');
  const response=await fetch(`${SUPABASE_REST_URL}/leads`,{
    method:'POST',
    headers:{'apikey':SUPABASE_PUBLISHABLE_KEY,'Authorization':`Bearer ${SUPABASE_PUBLISHABLE_KEY}`,'Content-Type':'application/json','Prefer':'return=minimal'},
    body:JSON.stringify(lead)
  });
  if(!response.ok) throw new Error(await response.text()||'Supabase request failed');
  // Send an email notification through the Supabase Edge Function.
  try{
    await fetch(`${SUPABASE_URL}/functions/v1/notify-lead`,{
      method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(lead)
    });
  }catch(e){ console.warn('Email notification failed:',e); }
  return true;
}
const insurers=[
['United India Insurance','uii'],['National Insurance','national'],['The Oriental Insurance','oriental'],['Shriram General Insurance','shriram'],['Go Digit General Insurance','digit'],['SBI General Insurance','sbi'],['ICICI Lombard','icici'],['HDFC ERGO','hdfc'],['Bajaj Allianz General Insurance','bajaj'],['Tata AIG','tataaig'],['Reliance General Insurance','reliance'],['ACKO General Insurance','acko']
];
function cleanVehicle(v){return (v||'').toUpperCase().replace(/[^A-Z0-9]/g,'')}
function getQuote(){
 const el=id=>document.getElementById(id); const v=cleanVehicle(el('vehicleNo').value), type=el('vehicleType').value, cover=el('cover').value;
 const out=el('quoteResults'), status=el('quoteStatus');
 if(v.length<6){status.innerHTML='<span class="error">Please enter a valid vehicle number.</span>';out.innerHTML='';return}
 const base=type==='bike'?(cover==='comprehensive'?1850:843):(cover==='comprehensive'?7200:cover==='thirdparty'?3416:2800);
 status.innerHTML=`<b>Vehicle:</b> ${v} &nbsp; <span class="success">Quote options are ready.</span>`;
 out.innerHTML=insurers.map((x,i)=>{let p=Math.round(base*(1+(i%5-2)*.035));return `<div class="quote-card"><div class="insurer-mini"><div class="ins-logo logo-${x[1]}">${x[0].split(' ').map(w=>w[0]).slice(0,2).join('')}</div><div><b>${x[0]}</b><small>${cover==='comprehensive'?'Comprehensive':cover==='thirdparty'?'Third Party':'Limited Third Party'}</small></div></div><div><b>${type==='bike'?'Two Wheeler':'Car'}</b><small>${v}</small></div><div class="price">₹${p.toLocaleString('en-IN')}</div><button class="btn primary" onclick="requestQuote('${x[0]}',${p})">Request</button></div>`}).join('');
}
async function requestQuote(insurer,price){
  const v=document.getElementById('vehicleNo').value.trim().toUpperCase();
  const vehicleType=document.getElementById('vehicleType')?.value||'';
  const cover=document.getElementById('cover')?.value||'';
  const name=prompt('Customer name / नाम दर्ज करें:');
  if(!name) return;
  const mobile=prompt('Mobile number / मोबाइल नंबर दर्ज करें:');
  if(!mobile) return;
  const lead={
    name:name.trim(),
    mobile:mobile.trim(),
    email:'',
    insurance_type:`${vehicleType==='bike'?'Bike':'Car'} Insurance - ${cover} - ${insurer}`,
    message:`Quote Request\nVehicle: ${v}\nQuoted Premium: ₹${price}\nInsurer: ${insurer}`
  };
  try{
    const saved=await submitSupabaseLead(lead);
    if(saved){
      const st=document.getElementById('quoteStatus');
      if(st) st.innerHTML='<b>Request received.</b> <span class="success">Shanvi team will contact you shortly.</span>';
    }
  }catch(err){
    // Keep a mailto fallback if the backend is temporarily unavailable.
    const subject=encodeURIComponent('Insurance Quote Request - Shanvi Insurance Services');
    const body=encodeURIComponent(`Customer: ${lead.name}\nMobile: ${lead.mobile}\nVehicle: ${v}\nInsurance Company: ${insurer}\nQuoted Premium: ₹${price}\n`);
    window.location.href=`mailto:${SHANVI.supportEmail}?subject=${subject}&body=${body}`;
  }
}
function store(key,val){localStorage.setItem(key,JSON.stringify(val));} function load(key,def){try{return JSON.parse(localStorage.getItem(key))??def}catch{return def}}
function nextAgentCode(){let n=Number(localStorage.getItem('shanviAgentSerial')||600)+1;localStorage.setItem('shanviAgentSerial',n);return `SIS2022${String(n).padStart(3,'0')}`}
function hashLite(s){let h=0;for(let i=0;i<s.length;i++)h=((h<<5)-h+s.charCodeAt(i))|0;return String(Math.abs(h));}
function recordLogin(role, uid, name, email=''){
  try{
    const logs=load('shanviLoginHistory',[]);
    logs.push({role,uid,name:name||uid,email:email||'',at:new Date().toISOString()});
    store('shanviLoginHistory',logs.slice(-2000));
  }catch(e){}
}
function registerCustomer(e){e.preventDefault(); const name=c('cName').value.trim(),email=c('cEmail').value.trim().toLowerCase(),mobile=c('cMobile').value.trim(),pass=c('cPass').value,uid=c('cUid').value.trim(); if(!name||!email||!mobile||!pass||!uid)return; let users=load('shanviCustomers',[]); if(users.some(u=>u.uid===uid||u.email===email)){msg('regMsg','User ID or email already registered.','error');return} users.push({name,email,mobile,uid,pwd:hashLite(pass),createdAt:new Date().toISOString()});store('shanviCustomers',users);store('shanviCurrentCustomer',uid);location.href='customer-portal.html';}
function loginCustomer(e){e.preventDefault();let uid=c('cLoginUid').value.trim(),pwd=c('cLoginPass').value,users=load('shanviCustomers',[]);let u=users.find(x=>x.uid===uid&&x.pwd===hashLite(pwd));if(!u){msg('loginMsg','Invalid User ID or Password.','error');return}store('shanviCurrentCustomer',u.uid);recordLogin('Customer',u.uid,u.name,u.email);startPortalSession('customer',u.uid);location.href='customer-portal.html'}
function registerAgent(e){
 e.preventDefault();
 let name=c('aName').value.trim(),email=c('aEmail').value.trim().toLowerCase(),mobile=c('aMobile').value.trim(),uid=c('aUid').value.trim(),pass=c('aPass').value;
 if(!name||!email||!mobile||!uid||!pass){msg('agentRegMsg','All fields are mandatory.','error');return}
 let users=load('shanviAgents',[]);
 if(users.some(u=>u.uid===uid||u.email===email)){msg('agentRegMsg','User ID or email already registered.','error');return}
 let u={name,email,mobile,uid,pwd:hashLite(pass),code:null,certificateIssued:false,certificateNo:null,issuedAt:null,createdAt:new Date().toISOString()};
 users.push(u);store('shanviAgents',users);store('shanviCurrentAgent',uid);
 msg('agentRegMsg',`Registration submitted successfully.<br><b>Agent:</b> ${name}<br><b>User ID:</b> ${uid}<br><br>Admin approval और certificate issue होने के बाद Agent Login active होगा.`,`success`);
}
function loginAgent(e){e.preventDefault();let uid=c('aLoginUid').value.trim(),pwd=c('aLoginPass').value,users=load('shanviAgents',[]),u=users.find(x=>x.uid===uid&&x.pwd===hashLite(pwd));if(!u){msg('agentLoginMsg','Invalid User ID or Password.','error');return}if(u.deactivated){msg('agentLoginMsg','This agent account is deactivated by Admin.','error');return}if(u.certificateRejected){msg('agentLoginMsg','Certificate rejected by Admin. Please contact Shanvi Admin.','error');return}if(!u.certificateIssued){msg('agentLoginMsg','Agent certificate must be issued before login.','error');return}store('shanviCurrentAgent',u.uid);recordLogin('Agent',u.uid,u.name,u.email);startPortalSession('agent',u.uid);location.href='agent-portal.html'}
function c(id){return document.getElementById(id)} function msg(id,text,cls='notice'){if(c(id))c(id).innerHTML=`<div class="${cls}">${text}</div>`}
function currentAgent(){let uid=localStorage.getItem('shanviCurrentAgent');return load('shanviAgents',[]).find(x=>x.uid===uid)}
function currentCustomer(){let uid=localStorage.getItem('shanviCurrentCustomer');return load('shanviCustomers',[]).find(x=>x.uid===uid)}
function downloadText(filename,text){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([text],{type:'text/html'}));a.download=filename;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500)}

function saveInsuranceRequest(req){let a=load('shanviInsuranceRequests',[]);a.push(req);store('shanviInsuranceRequests',a)}


/* Shanvi portal session security: 10-minute inactivity timeout + portal isolation */
const SHANVI_SESSION_TIMEOUT = 10 * 60 * 1000;
function startPortalSession(type, id){
  const key = 'shanviSession_'+type;
  localStorage.setItem(key, JSON.stringify({id:id, lastActivity:Date.now()}));
  bindPortalSession(type);
}
function touchPortalSession(type){
  const key='shanviSession_'+type;
  try{const x=JSON.parse(localStorage.getItem(key)||'null'); if(x){x.lastActivity=Date.now();localStorage.setItem(key,JSON.stringify(x));}}catch(e){}
}
function clearPortalSession(type){localStorage.removeItem('shanviSession_'+type);}
function guardPortalSession(type, loginPage){
  const key='shanviSession_'+type;
  let x=null;
  try{x=JSON.parse(localStorage.getItem(key)||'null')}catch(e){}
  if(!x || !x.id || Date.now()-Number(x.lastActivity||0)>SHANVI_SESSION_TIMEOUT){
    clearPortalSession(type);
    if(type==='agent') localStorage.removeItem('shanviCurrentAgent');
    if(type==='customer') localStorage.removeItem('shanviCurrentCustomer');
    if(type==='admin') localStorage.removeItem('shanviAdmin');
    location.href=loginPage+'?timeout=1'; return false;
  }
  bindPortalSession(type); return true;
}
function bindPortalSession(type){
  if(window.__shanviBound===type)return;
  window.__shanviBound=type;
  ['click','keydown','mousemove','scroll','touchstart'].forEach(ev=>window.addEventListener(ev,()=>touchPortalSession(type),{passive:true}));
  setupSessionUI(type);
  clearInterval(window.__shanviSessionTimer);
  window.__shanviSessionTimer=setInterval(()=>{
    const key='shanviSession_'+type;
    try{
      const x=JSON.parse(localStorage.getItem(key)||'null');
      if(!x){return}
      const remaining=Math.max(0,SHANVI_SESSION_TIMEOUT-(Date.now()-Number(x.lastActivity||0)));
      updateSessionUI(remaining);
      if(remaining<=0){
        clearPortalSession(type);
        if(type==='agent')localStorage.removeItem('shanviCurrentAgent');
        if(type==='customer')localStorage.removeItem('shanviCurrentCustomer');
        if(type==='admin')localStorage.removeItem('shanviAdmin');
        location.href=(type==='agent'?'agent-login.html':type==='customer'?'customer-login.html':'admin-login.html')+'?timeout=1';
      }
    }catch(e){}
  },1000);
}
function setupSessionUI(type){
  if(document.getElementById('shanviSessionBar'))return;
  const bar=document.createElement('div');bar.id='shanviSessionBar';bar.className='session-bar';
  bar.innerHTML=`<span>🔐 Session active</span><b id="shanviSessionTimer">10:00</b><span id="shanviSessionNotice">Auto logout after 10 min inactivity</span>`;
  document.body.appendChild(bar);
  protectPortalLinks(type);
}
function updateSessionUI(remaining){
  const el=document.getElementById('shanviSessionTimer'), n=document.getElementById('shanviSessionNotice'); if(!el)return;
  const sec=Math.ceil(remaining/1000),m=Math.floor(sec/60),s=sec%60; el.textContent=`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  if(sec<=120){n.textContent='⚠️ Session soon expire hogi — activity karein ya Logout karein.';document.getElementById('shanviSessionBar').classList.add('warning')}
}
function protectPortalLinks(type){
  const other={admin:['agent-login.html','agent-portal.html','customer-login.html','customer-portal.html'],agent:['admin-login.html','admin-portal.html','customer-login.html','customer-portal.html'],customer:['admin-login.html','admin-portal.html','agent-login.html','agent-portal.html']};
  document.querySelectorAll('a[href]').forEach(a=>a.addEventListener('click',e=>{
    const href=(a.getAttribute('href')||'').split('?')[0];
    if(other[type]?.includes(href)){e.preventDefault();alert('Pehle current portal se Logout karein, uske baad dusre portal mein login karein.');}
  }));
}
function recordSiteVisit(page='index.html', customer){
  try{
    let visits=load('shanviSiteVisits',[]);
    const visitorId=localStorage.getItem('shanviVisitorId')||('VIS-'+Math.random().toString(36).slice(2,10).toUpperCase());
    localStorage.setItem('shanviVisitorId',visitorId);
    visits.push({visitorId,page,customerUid:customer?.uid||'',customerName:customer?.name||'Guest',customerEmail:customer?.email||'',at:new Date().toISOString()});
    store('shanviSiteVisits',visits.slice(-500));
  }catch(e){}
}
function logoutPortal(type, page){clearPortalSession(type);if(type==='agent')localStorage.removeItem('shanviCurrentAgent');if(type==='customer')localStorage.removeItem('shanviCurrentCustomer');if(type==='admin')localStorage.removeItem('shanviAdmin');location.href=page;}


/* v17 Home + Admin helpers */
function initHome(){
  recordSiteVisit('index.html', currentCustomer());
  const defaults=[
    '💰 Agent Commission — Bike ₹75 | Car ₹210 per policy',
    '🌸 Raksha Bandhan Special — Protect your family & vehicle today',
    '🛡️ Shanvi Insurance Services — Secure Today, Protected Tomorrow'
  ];
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
