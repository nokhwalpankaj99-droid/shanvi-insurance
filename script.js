const demoQuotes={
"RJ13AB1234":{vehicle:"Maruti Swift • Petrol",year:"2021",insurers:[["United India Insurance","Third Party","₹ 3,416"],["Digit Insurance","Comprehensive","₹ 8,950"],["HDFC ERGO","Comprehensive","₹ 9,420"]]},
"RJ13ES8650":{vehicle:"Bajaj CT 100 • Petrol",year:"2018",insurers:[["United India Insurance","Third Party","₹ 843"],["Digit Insurance","Third Party","₹ 843"],["National Insurance","Third Party","₹ 843"],["Oriental Insurance","Third Party","₹ 843"]]},
"RJ13EC6126":{vehicle:"Car • Petrol",year:"2020",insurers:[["United India Insurance","Comprehensive","₹ 7,820"],["Digit Insurance","Comprehensive","₹ 8,120"],["SBI General","Comprehensive","₹ 8,460"]]}
};
function getQuote(){
 const input=document.getElementById("vehicleNo");
 const n=input.value.replace(/[^a-z0-9]/gi,"").toUpperCase();
 const box=document.getElementById("quoteResult");
 if(!n){box.className="quote-result";box.innerHTML="<b>Please enter a vehicle number.</b>";return}
 const d=demoQuotes[n];
 if(!d){box.className="quote-result";box.innerHTML="<b>No demo quote found.</b><p>Try RJ13AB1234, RJ13ES8650 or RJ13EC6126. For any other vehicle, connect an authorised live insurer/PB Partners API before showing a real premium.</p>";return}
 box.className="quote-result";
 box.innerHTML=`<div class="result-top"><div><span class="badge">QUOTE PREVIEW</span><h3>${d.vehicle}</h3><p>Vehicle: <b>${n}</b> • Model year: ${d.year}</p></div><a class="btn whatsapp" href="https://wa.me/919664029638?text=Please%20quote%20vehicle%20${n}">💬 WhatsApp</a></div><div class="quote-cards">${d.insurers.map(x=>`<div class="qcard"><small>${x[0]}</small><div>${x[1]}</div><strong>${x[2]}</strong><small>Premium preview</small></div>`).join("")}</div><p><small>⚠️ Demo prices only. Final premium must come from the insurer's authorised quote system.</small></p>`;
}