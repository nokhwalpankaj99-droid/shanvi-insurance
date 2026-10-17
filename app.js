/* Shanvi Insurance Services — client-side demo workflows */
const SIS = {
  keys:{policies:"sis_policies_v1", enquiries:"sis_enquiries_v1", photos:"sis_photos_v1", settings:"sis_settings_v1", agents:"sis_agents_v1", currentAdmin:"sis_admin_session", adminCredentials:"sis_admin_credentials_v1"},
  phone:"919664029638",
  get(k, fallback=[]){try{const v=JSON.parse(localStorage.getItem(k));return v===null?fallback:v}catch(e){return fallback}},
  set(k,v){localStorage.setItem(k,JSON.stringify(v))},
  escape(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))},
  normalizeVehicle(v){return String(v||"").toUpperCase().replace(/[^A-Z0-9]/g,"")},
  money(n){return "₹"+Number(n||0).toLocaleString("en-IN",{maximumFractionDigits:2})},
  date(d){if(!d)return "—";const x=new Date(d+"T00:00:00");return isNaN(x)?d:x.toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})},
  whatsApp(text){window.open("https://wa.me/"+this.phone+"?text="+encodeURIComponent(text),"_blank","noopener")},
  status(el,text,kind="notice"){if(el){el.className=kind==="notice"?"notice":"notice "+kind;el.textContent=text}},
  daysUntil(d){if(!d)return null;return Math.ceil((new Date(d+"T00:00:00")-new Date(new Date().toDateString()))/86400000)}
};

async function saveSharedLead(lead){
  if(typeof SUPABASE_URL==="undefined"||typeof SUPABASE_PUBLISHABLE_KEY==="undefined")throw new Error("Shared database configuration is missing.");
  const payload={name:lead.name,mobile:lead.mobile,email:lead.email||null,insurance_type:lead.insurance_type||((lead.type||"Vehicle")+" - "+(lead.cover||"Enquiry")),message:lead.message||"",vehicle_number:lead.vehicle||lead.vehicle_number||null,source:lead.source||"website enquiry"};
  const response=await fetch(SUPABASE_REST_URL+"/leads",{method:"POST",headers:{apikey:SUPABASE_PUBLISHABLE_KEY,Authorization:"Bearer "+SUPABASE_PUBLISHABLE_KEY,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(payload)});
  if(!response.ok)throw new Error("Shared database did not accept the enquiry.");
  return true;
}

document.addEventListener("DOMContentLoaded",()=>{
  const toggle=document.getElementById("menuToggle"), nav=document.getElementById("mainNav");
  if(toggle&&nav)toggle.addEventListener("click",()=>nav.classList.toggle("open"));
  const q=document.getElementById("quoteForm");
  if(q)q.addEventListener("submit",e=>{
    e.preventDefault();const f=new FormData(q),lead={id:crypto.randomUUID?crypto.randomUUID():String(Date.now()),name:String(f.get("name")).trim(),mobile:String(f.get("mobile")).trim(),vehicle:String(f.get("vehicle")).trim().toUpperCase(),type:f.get("type"),cover:f.get("cover"),createdAt:new Date().toISOString()};
    if(!/^[6-9]\d{9}$/.test(lead.mobile)){document.getElementById("quoteMessage").innerHTML='<span class="error">Please enter a valid 10-digit mobile number.</span>';return}
    const arr=SIS.get(SIS.keys.enquiries,[]);arr.unshift(lead);SIS.set(SIS.keys.enquiries,arr);
    const msg=document.getElementById("quoteMessage");
    try{await saveSharedLead({...lead,source:"homepage quick enquiry"});msg.textContent="Enquiry saved to the shared database. WhatsApp is opening; press Send to contact Shanvi.";msg.className="form-message success"}
    catch(err){msg.textContent="Enquiry saved only in this browser because the shared database is not configured or unavailable. WhatsApp is opening; press Send to contact Shanvi.";msg.className="form-message error"}
    SIS.whatsApp(`Hello Shanvi Insurance Services, I need insurance assistance.\\nName: ${lead.name}\\nMobile: ${lead.mobile}\\nVehicle: ${lead.vehicle}\\nType: ${lead.type}\\nRequirement: ${lead.cover}`);
    q.reset();
  });
});
