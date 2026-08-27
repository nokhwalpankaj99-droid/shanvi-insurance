
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".menu-btn");
  const nav = document.querySelector(".nav");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.querySelectorAll(".nav a").forEach(a => a.addEventListener("click", () => {
      nav.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    }));
  }

  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a").forEach(a => {
    a.classList.toggle("active", a.getAttribute("href") === current);
  });

  const form = document.getElementById("quoteForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const labels = [
        ["Name", "name"], ["Mobile", "mobile"], ["Email", "email"],
        ["Insurance Type", "type"], ["Vehicle Type", "vehicle"],
        ["Registration No.", "reg"], ["City", "city"], ["Pin Code", "pin"]
      ];
      const lines = labels
        .filter(([, key]) => String(data.get(key) || "").trim())
        .map(([label, key]) => `${label}: ${String(data.get(key)).trim()}`);
      const message = "Hello Shanvi Insurance Services,%0A%0AI need insurance assistance.%0A" +
        encodeURIComponent(lines.join("\n"));
      window.open("https://wa.me/919664029638?text=" + message, "_blank", "noopener");
    });
  }

  

document.addEventListener("DOMContentLoaded", () => {
  const insurers = [
    "Acko General Insurance","Bajaj General Insurance","Cholamandalam MS General Insurance",
    "Generali Central Insurance","Go Digit General Insurance","HDFC ERGO General Insurance",
    "ICICI Lombard General Insurance","IFFCO TOKIO General Insurance","Zurich Kotak General Insurance",
    "Liberty General Insurance","Magma General Insurance","National Insurance Company",
    "Navi General Insurance","Raheja QBE General Insurance","Reliance General Insurance",
    "Royal Sundaram General Insurance","SBI General Insurance","Shriram General Insurance",
    "Tata AIG General Insurance","The New India Assurance","The Oriental Insurance",
    "United India Insurance","Universal Sompo General Insurance","Zuno General Insurance"
  ];

  const vehicleBtn=document.getElementById("vehicleSearchBtn");
  const vehicleInput=document.getElementById("vehicleNumber");
  const vehicleStatus=document.getElementById("vehicleStatus");
  const vehicleResult=document.getElementById("vehicleResult");
  const tabs=[...document.querySelectorAll(".quote-tab")];
  const coverRadios=[...document.querySelectorAll('input[name="coverType"]')];
  let vehicleType="car";

  const renderDirectory=()=>{
    const box=document.getElementById("insurerDirectory");
    if(box) box.innerHTML=insurers.map((n,i)=>`<div class="directory-card"><span class="insurer-logo">${n.split(" ").slice(0,2).map(x=>x[0]).join("")}</span><b>${n}</b><small>Motor insurance</small></div>`).join("");
  };
  renderDirectory();

  tabs.forEach(tab=>tab.addEventListener("click",()=>{
    tabs.forEach(x=>x.classList.remove("active")); tab.classList.add("active");
    vehicleType=tab.dataset.type;
  }));
  coverRadios.forEach(r=>r.addEventListener("change",()=>{
    document.querySelectorAll(".cover-option").forEach(x=>x.classList.remove("active"));
    r.closest(".cover-option").classList.add("active");
  }));

  const runQuote=()=>{
    if(!vehicleBtn||!vehicleInput)return;
    const clean=vehicleInput.value.trim().toUpperCase().replace(/\s+/g,"");
    if(!clean){vehicleStatus.textContent="Please enter a vehicle registration number.";vehicleStatus.style.color="#c0392b";vehicleResult.hidden=true;return;}
    const cover=document.querySelector('input[name="coverType"]:checked')?.value||"comprehensive";
    const coverName={comprehensive:"Comprehensive",thirdparty:"Third Party",od:"Standalone OD"}[cover];
    vehicleStatus.textContent="Checking vehicle and preparing comparison...";
    vehicleStatus.style.color="#637083"; vehicleResult.hidden=true; vehicleBtn.disabled=true; vehicleBtn.textContent="Checking...";
    setTimeout(()=>{
      document.getElementById("vVehicle").textContent=clean;
      document.getElementById("vModel").textContent=vehicleType==="bike"?"Two-Wheeler (API verification pending)":"Private Car (API verification pending)";
      document.getElementById("vFuel").textContent="As per RC/API";
      document.getElementById("vCover").textContent=coverName;
      const base=vehicleType==="bike"?(cover==="thirdparty"?1200:cover==="od"?1800:2400):(cover==="thirdparty"?3200:cover==="od"?5200:8200);
      const cards=document.getElementById("insurerCards");
      cards.innerHTML=insurers.map((name,i)=>{
        const premium=Math.round(base*(1+(i%7)*0.035));
        return `<div class="insurer-card"><div class="insurer-name">${name}</div><div class="insurer-meta">Motor • ${coverName}</div><div class="premium">₹${premium.toLocaleString("en-IN")}</div><small>Indicative premium</small><a class="small-btn blue-btn quote-whatsapp" target="_blank" rel="noopener" href="https://wa.me/919664029638?text=${encodeURIComponent("Hello Shanvi Insurance Services, please provide a final "+coverName+" quote for "+clean+" from "+name+".")}">Get Quote</a></div>`;
      }).join("");
      document.getElementById("quoteCount").textContent=insurers.length+" insurers";
      vehicleStatus.textContent="Comparison loaded. Final premium will be confirmed after live API/insurer verification.";
      vehicleStatus.style.color="#07865a";vehicleResult.hidden=false;vehicleBtn.disabled=false;vehicleBtn.textContent="Check Vehicle";
    },600);
  };
  vehicleBtn?.addEventListener("click",runQuote);
  vehicleInput?.addEventListener("keydown",e=>{if(e.key==="Enter")runQuote();});
  vehicleInput?.addEventListener("input",()=>vehicleInput.value=vehicleInput.value.toUpperCase());
});
