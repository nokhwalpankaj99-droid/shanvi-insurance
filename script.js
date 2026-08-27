const menuBtn=document.querySelector('.menu-btn');const nav=document.querySelector('.nav');
menuBtn?.addEventListener('click',()=>nav.classList.toggle('open'));
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
document.getElementById('quoteForm')?.addEventListener('submit',function(e){
  e.preventDefault();
  const values=[...this.querySelectorAll('input,select')].map(x=>x.value.trim());
  const [name,mobile,email,type,vehicle,reg,city,pin]=values;
  const msg=`Hello Shanvi Insurance Services,%0A%0AI need an insurance quote.%0AName: ${name}%0AMobile: ${mobile}%0AEmail: ${email}%0AInsurance Type: ${type}%0AVehicle Type: ${vehicle}%0ARegistration No.: ${reg}%0ACity: ${city}%0APin Code: ${pin}`;
  window.open(`https://wa.me/919664029638?text=${msg}`,'_blank');
});
