/* Shanvi Insurance Services - Supabase lead integration */
const SUPABASE_URL = 'https://dwfhqjoidrgjszlpyejr.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_O2Lj_PqZFP5k2ODiFmDXwA_03UoVRp3';

async function submitLeadToSupabase(lead){
  const res = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
    method:'POST',
    headers:{
      'apikey': SUPABASE_PUBLISHABLE_KEY,
      'Authorization': `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
      'Content-Type':'application/json',
      'Prefer':'return=minimal'
    },
    body: JSON.stringify({
      name: lead.name || '',
      mobile: lead.mobile || '',
      email: lead.email || '',
      insurance_type: lead.insurance_type || '',
      message: lead.message || '',
      vehicle_number: lead.vehicle_number || '',
      source: lead.source || 'website',
      created_at: new Date().toISOString()
    })
  });
  if(!res.ok){
    let detail='';
    try{detail=await res.text()}catch(e){}
    throw new Error(detail || `Supabase request failed (${res.status})`);
  }
  return true;
}

function initLeadForm(){
  const form=document.getElementById('leadForm');
  if(!form || form.dataset.bound==='1')return;
  form.dataset.bound='1';
  form.addEventListener('submit', async e=>{
    e.preventDefault();
    const status=document.getElementById('leadMsg');
    const btn=form.querySelector('button[type="submit"]');
    const lead={
      name:c('leadName').value.trim(),
      mobile:c('leadMobile').value.trim(),
      email:c('leadEmail').value.trim().toLowerCase(),
      insurance_type:c('leadInsurance').value,
      vehicle_number:c('leadVehicle').value.trim(),
      message:c('leadMessage').value.trim(),
      source:'website enquiry'
    };
    if(!lead.name || !lead.mobile || !lead.insurance_type){
      msg('leadMsg','Name, Mobile aur Insurance Type required hai.','error'); return;
    }
    btn.disabled=true; btn.textContent='Submitting…';
    try{
      await submitLeadToSupabase(lead);
      msg('leadMsg','✅ Enquiry successfully submit ho gayi. Hamari team aapse jaldi contact karegi.','success');
      form.reset();
    }catch(err){
      console.error('Supabase lead error:',err);
      /* Keep the enquiry locally so it is not lost if the database is temporarily unavailable. */
      let pending=load('shanviPendingLeads',[]);
      pending.push({...lead,created_at:new Date().toISOString()});
      store('shanviPendingLeads',pending.slice(-200));
      msg('leadMsg','⚠️ Enquiry locally save ho gayi, lekin online database connection mein problem aa rahi hai. Please WhatsApp/Call bhi kar sakte hain.','error');
    }finally{
      btn.disabled=false; btn.textContent='📨 Submit Enquiry';
    }
  });
}

const SHANVI={
  supportPhone:'96640-29638', supportEmail:'nokhwalpankaj99@gmail.com', address:'58 LNP Ridmalsar Road, Sri Ganganagar, Rajasthan - 335061', piFee:190,
  commission:{bike:75,car:210}, agentCodePrefix:'SIS2022'
};
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
function requestQuote(insurer,price){const v=document.getElementById('vehicleNo').value; const subject=encodeURIComponent('Insurance Quote Request - Shanvi Insurance Services'); const body=encodeURIComponent(`Customer insurance request\n\nInsurance Company: ${insurer}\nQuoted Premium: ₹${price}\nVehicle: ${v}\n\nPlease contact me.\n\nShanvi Insurance Services\n${SHANVI.supportPhone}`); window.location.href=`mailto:${SHANVI.supportEmail}?subject=${subject}&body=${body}`;}
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
  const safe={
    admin:new Set(['admin-portal.html','admin-settings.html','admin-login.html']),
    agent:new Set(['agent-portal.html','agent-certificate.html','agent-login.html','pi.html']),
    customer:new Set(['customer-portal.html','customer-login.html','pi.html'])
  };
  const current=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  document.querySelectorAll('a[href]').forEach(a=>{
    if(a.dataset.portalGuardBound==='1')return;
    a.dataset.portalGuardBound='1';
    a.addEventListener('click',e=>{
      const href=(a.getAttribute('href')||'').split('#')[0].split('?')[0];
      if(!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('upi:'))return;
      const file=(href.split('/').pop()||'').toLowerCase();
      if(file==='')return;
      const isLogout=(a.textContent||'').toLowerCase().includes('logout') || a.getAttribute('onclick')?.includes('logoutPortal');
      if(isLogout)return;
      if(!safe[type]?.has(file)){
        e.preventDefault();
        alert('Pehle current portal se Logout karein. Uske baad Website ya kisi doosre portal par ja sakte hain.');
      }
    });
  });
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

if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',initLeadForm)}else{initLeadForm()}
