(function(){
  const qs=(s,r=document)=>r.querySelector(s), qsa=(s,r=document)=>[...r.querySelectorAll(s)];
  const current=location.pathname.split('/').pop()||'index.html';
  qsa('.nav a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')===current));
  const menu=qs('.menu-btn'), nav=qs('.nav');
  if(menu&&nav) menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',open?'true':'false');});
  qsa('.nav a').forEach(a=>a.addEventListener('click',()=>nav&&nav.classList.remove('open')));

  const insurers=[
    ['Acko General Insurance','ACKO','acko.com'],['Bajaj General Insurance','BAJAJ','bajajallianz.com'],['Cholamandalam MS General Insurance','CHOLA','cholainsurance.com'],
    ['Generali Central Insurance','GEN','generalicentralinsurance.com'],['Go Digit General Insurance','DIGIT','godigit.com'],['HDFC ERGO General Insurance','HDFC','hdfcergo.com'],
    ['ICICI Lombard General Insurance','ICICI','icicilombard.com'],['IFFCO TOKIO General Insurance','IFFCO','iffcotokio.co.in'],['Zurich Kotak General Insurance','KOTAK','kotakgeneral.com'],
    ['Liberty General Insurance','LIBERTY','libertyinsurance.in'],['Magma General Insurance','MAGMA','magma-hdi.co.in'],['National Insurance Company','NIC','nationalinsurance.nic.co.in'],
    ['Navi General Insurance','NAVI','navi.com'],['Raheja QBE General Insurance','RQBE','rahejaqbe.com'],['Reliance General Insurance','RGI','reliancegeneral.co.in'],
    ['Royal Sundaram General Insurance','ROYAL','royalsundaram.in'],['SBI General Insurance','SBI','sbigeneral.in'],['Shriram General Insurance','SGI','shriramgi.com'],
    ['Tata AIG General Insurance','TATA AIG','tataaig.com'],['The New India Assurance','NEW INDIA','newindia.co.in'],['The Oriental Insurance','ORIENTAL','orientalinsurance.org.in'],
    ['United India Insurance','UII','uiic.co.in'],['Universal Sompo General Insurance','USGI','universalsompo.com'],['Zuno General Insurance','ZUNO','zunoinsurance.com']
  ];
  const logo=(domain,initials,name)=>`<span class="insurer-logo-wrap"><img src="https://www.google.com/s2/favicons?domain=${domain}&sz=64" alt="" loading="lazy" onerror="this.style.display='none'"><span class="insurer-logo-fallback">${initials}</span></span>`;
  const directory=qs('#insurerDirectory');
  if(directory) directory.innerHTML=insurers.map(([name,initials,domain])=>`<div class="directory-card">${logo(domain,initials,name)}<div><b>${name}</b><small>Motor insurance provider</small></div></div>`).join('');

  // Quote form: sends customer request to the owner's inbox through FormSubmit.
  const quoteForm=qs('#quoteForm');
  if(quoteForm){
    quoteForm.addEventListener('submit',async e=>{
      e.preventDefault();
      const btn=qs('button[type="submit"]',quoteForm), old=btn.textContent; btn.disabled=true; btn.textContent='Sending...';
      const fd=new FormData(quoteForm); fd.append('_subject','New Customer Insurance Request - Shanvi Insurance'); fd.append('_captcha','false'); fd.append('_template','table'); fd.append('_replyto',fd.get('email')||'');
      try{const r=await fetch('https://formsubmit.co/ajax/nokhwalpankaj99@gmail.com',{method:'POST',headers:{Accept:'application/json'},body:fd}); const j=await r.json();
        if(j.success){alert('Request sent successfully. Shanvi team will contact you shortly.');quoteForm.reset();} else throw new Error(j.message||'Submission failed');
      }catch(err){alert('Request send nahi ho payi. Please WhatsApp ya call karein.');}finally{btn.disabled=false;btn.textContent=old;}
    });
  }

  // Motor quote UI. It intentionally does NOT fake live insurer prices.
  const input=qs('#vehicleNumber'), searchBtn=qs('#vehicleSearchBtn'), status=qs('#vehicleStatus'), result=qs('#vehicleResult');
  const tabs=qsa('.quote-tab'), covers=qsa('input[name="coverType"]'); let vehicleType='car';
  tabs.forEach(t=>t.addEventListener('click',()=>{tabs.forEach(x=>x.classList.remove('active'));t.classList.add('active');vehicleType=t.dataset.type||'car';}));
  covers.forEach(r=>r.addEventListener('change',()=>{qsa('.cover-option').forEach(x=>x.classList.remove('active'));r.closest('.cover-option')?.classList.add('active');}));
  function validateVehicle(v){return /^[A-Z]{2}[0-9]{1,2}[A-Z]{0,3}[0-9]{1,4}$/.test(v.replace(/[-\s]/g,''));}
  function runQuote(){
    if(!input||!searchBtn||!status||!result)return;
    const clean=input.value.toUpperCase().replace(/[^A-Z0-9]/g,'');
    if(!clean){status.textContent='Vehicle number enter karein.';status.className='vehicle-status error';result.hidden=true;return;}
    if(!validateVehicle(clean)){status.textContent='Vehicle number format check karein, example: RJ13AB1234';status.className='vehicle-status error';result.hidden=true;return;}
    const cover=document.querySelector('input[name="coverType"]:checked')?.value||'comprehensive';
    const coverName={comprehensive:'Comprehensive',thirdparty:'Third Party',od:'Standalone OD'}[cover];
    searchBtn.disabled=true; searchBtn.textContent='Checking...'; status.textContent='Vehicle request received. Live insurer API not connected yet.'; status.className='vehicle-status'; result.hidden=true;
    setTimeout(()=>{
      qs('#vVehicle').textContent=clean; qs('#vModel').textContent=vehicleType==='bike'?'Two-Wheeler':'Private Car'; qs('#vFuel').textContent='To be verified from RC / authorized API'; qs('#vCover').textContent=coverName;
      const cards=qs('#insurerCards');
      cards.innerHTML=insurers.slice(0,12).map(([name,initials,domain])=>`<div class="insurer-card"><div class="insurer-card-top">${logo(domain,initials,name)}<div><b>${name}</b><small>${coverName}</small></div></div><div class="premium-placeholder">Live premium</div><small>Available after authorized quote integration</small><a class="small-btn blue-btn" target="_blank" rel="noopener" href="https://wa.me/919664029638?text=${encodeURIComponent('Hello Shanvi Insurance Services, please provide final '+coverName+' quote for '+clean+'.')}">Request Final Quote</a></div>`).join('');
      qs('#quoteCount').textContent='12 providers'; result.hidden=false; status.textContent='Vehicle number accepted. Final premium will be fetched only from an authorized insurer/aggregator integration.'; status.className='vehicle-status success'; searchBtn.disabled=false; searchBtn.textContent='Check Vehicle';
    },450);
  }
  if(searchBtn)searchBtn.addEventListener('click',runQuote); if(input)input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();runQuote();}});
  if(input)input.addEventListener('input',()=>input.value=input.value.toUpperCase());

  // PI upload timestamp + client-side size validation. The actual PI form uses
  // native multipart/form-data POST so FormSubmit can deliver file attachments.
  const stamp=qs('#piTimestamp');
  if(stamp){
    const updateStamp=()=>{stamp.value=new Date().toLocaleString('en-IN',{dateStyle:'medium',timeStyle:'medium'});};
    updateStamp(); setInterval(updateStamp,1000);
  }
  const pi=qs('#piForm');
  if(pi){
    pi.addEventListener('submit',e=>{
      const files=qsa('input[type="file"]',pi).flatMap(x=>[...x.files]);
      const total=files.reduce((n,f)=>n+f.size,0), max=9.5*1024*1024;
      if(total>max){
        e.preventDefault();
        alert('Files ka total size 9.5 MB se kam rakhein. Video ko compress karke upload karein.');
        return;
      }
      const video=files.find(f=>f.type.startsWith('video/'));
      if(video && video.size>7*1024*1024){
        e.preventDefault();
        alert('Video 7 MB se chhota rakhein, taaki RC/KYC/photos ke liye bhi email attachment limit ke andar jagah rahe.');
        return;
      }
      const btn=qs('button[type="submit"]',pi);
      if(btn){btn.disabled=true;btn.textContent='Uploading documents...';}
      // Do not preventDefault: native multipart POST is required for attachments.
    });
  }

})();
