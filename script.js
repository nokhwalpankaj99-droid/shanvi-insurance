const insurers=[
["United India","Third Party"],["Digit","Third Party"],["National Insurance","Third Party"],["Oriental Insurance","Third Party"],["Shriram General","Third Party"],
["SBI General","Comprehensive"],["ICICI Lombard","Comprehensive"],["HDFC ERGO","Comprehensive"],["Bajaj Allianz","Comprehensive"],["Tata AIG","Comprehensive"],["Reliance General","Comprehensive"],["ACKO","Comprehensive"]
];
function cleanVehicle(v){return v.toUpperCase().replace(/[^A-Z0-9]/g,'')}
function getQuote(){
 const v=cleanVehicle(document.getElementById('vehicleNo').value), type=document.getElementById('vehicleType').value, cover=document.getElementById('cover').value;
 const out=document.getElementById('quoteResults'), status=document.getElementById('quoteStatus');
 if(v.length<6){status.innerHTML='<span style="color:#c0392b">Please enter a valid vehicle number.</span>';out.innerHTML='';return}
 const base=type==='bike'?(cover==='comprehensive'?1850:843):(cover==='comprehensive'?7200:cover==='thirdparty'?3416:2800);
 status.innerHTML=`<b>Vehicle:</b> ${v} &nbsp; <span style="color:#16805a">Demo quote generated successfully.</span>`;
 out.innerHTML=insurers.map((x,i)=>{let p=Math.round(base*(1+(i%5-2)*.035));return `<div class="quote-card"><div><b>${x[0]}</b><small style="display:block;color:#75839a">${x[1]} Plan</small></div><div><b>${type==='bike'?'Two Wheeler':'Car'}</b><small style="display:block;color:#75839a">${v}</small></div><div class="price">₹${p.toLocaleString('en-IN')}</div><button class="btn primary" onclick="requestQuote('${x[0]}',${p})">Select</button></div>`}).join('');
}
function requestQuote(insurer,price){
 const subject=encodeURIComponent('Customer Quote Request - Shanvi Insurance');
 const body=encodeURIComponent(`Hello Shanvi Insurance,\n\nI want to proceed with:\nInsurance Company: ${insurer}\nQuoted Premium: ₹${price}\nVehicle: ${document.getElementById('vehicleNo').value}\n\nPlease contact me.`);
 window.location.href=`mailto:nokhwalpankaj99@gmail.com?subject=${subject}&body=${body}`;
}