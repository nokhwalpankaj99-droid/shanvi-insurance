/* Shanvi Insurance Services — client-side demo workflows */
const SIS = {
  keys:{policies:"sis_policies_v1", enquiries:"sis_enquiries_v1", photos:"sis_photos_v1", settings:"sis_settings_v1", agents:"sis_agents_v1", currentAdmin:"sis_admin_session"},
  adminUser:"shanvi112", adminPass:"Shanvi@123", phone:"919664029638",
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
document.addEventListener("DOMContentLoaded",()=>{
  const toggle=document.getElementById("menuToggle"), nav=document.getElementById("mainNav");
  if(toggle&&nav)toggle.addEventListener("click",()=>nav.classList.toggle("open"));
  const q=document.getElementById("quoteForm");
  if(q)q.addEventListener("submit",e=>{
    e.preventDefault();const f=new FormData(q),lead={id:crypto.randomUUID?crypto.randomUUID():String(Date.now()),name:String(f.get("name")).trim(),mobile:String(f.get("mobile")).trim(),vehicle:String(f.get("vehicle")).trim().toUpperCase(),type:f.get("type"),cover:f.get("cover"),createdAt:new Date().toISOString()};
    if(!/^[6-9]\d{9}$/.test(lead.mobile)){document.getElementById("quoteMessage").innerHTML='<span class="error">Please enter a valid 10-digit mobile number.</span>';return}
    const arr=SIS.get(SIS.keys.enquiries,[]);arr.unshift(lead);SIS.set(SIS.keys.enquiries,arr);
    document.getElementById("quoteMessage").innerHTML='<span class="success">Enquiry saved in this browser. WhatsApp is opening with your message; press Send there to contact Shanvi.</span>';
    SIS.whatsApp(`Hello Shanvi Insurance Services, I need insurance assistance.\nName: ${lead.name}\nMobile: ${lead.mobile}\nVehicle: ${lead.vehicle}\nType: ${lead.type}\nRequirement: ${lead.cover}`);
    q.reset();
  });
});
