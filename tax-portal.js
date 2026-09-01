const STS_FEEDS = {
  tax: { q:'Income Tax India CBDT ITR TDS', official:'https://www.incometax.gov.in/iec/foportal/latest-news' },
  gst: { q:'GST India GSTN GST Council tax', official:'https://www.gst.gov.in/' },
  business: { q:'MSME Udyam India business tax compliance', official:'https://udyamregistration.gov.in/' },
  food: { q:'FSSAI FoSCoS food license India compliance', official:'https://fssai.gov.in/business' }
};
const STS_QUIZ_BANK = [
 {t:'GST',q:'Which return is generally used by a regular taxpayer to report outward supplies?',o:['GSTR-1','GSTR-9C','CMP-08','ITR-1'],a:0,e:'GSTR-1 is used for reporting outward supplies.'},
 {t:'INCOME TAX',q:'What does AIS stand for on the Income Tax e-Filing portal?',o:['Annual Information Statement','Annual Income Summary','Assessed Income Sheet','Account Information Service'],a:0,e:'AIS means Annual Information Statement.'},
 {t:'MSME',q:'Which is the official government domain for Udyam Registration?',o:['udyamregistration.gov.in','msme-help.in','gst.gov.in','mca-udyam.com'],a:0,e:'Udyam Registration is provided through the official Government of India portal.'},
 {t:'FSSAI',q:'Which portal is used for the Food Safety Compliance System (FoSCoS)?',o:['foscos.fssai.gov.in','fssai-gst.gov.in','foodindia.gov.in','foodsafety.in'],a:0,e:'FoSCoS is FSSAI’s Food Safety Compliance System.'},
 {t:'TDS',q:'TDS stands for:',o:['Tax Deducted at Source','Tax Deposit System','Total Deduction Statement','Tax Data Service'],a:0,e:'TDS means Tax Deducted at Source.'},
 {t:'GST',q:'Which tax components generally apply to an intra-State taxable supply under GST?',o:['CGST + SGST/UTGST','IGST only','TDS only','Cess only'],a:0,e:'Intra-State supplies generally involve CGST and SGST/UTGST, subject to applicable rules.'},
 {t:'ACCOUNTING',q:'Which financial statement presents assets, liabilities and equity at a point in time?',o:['Balance Sheet','Sales Register','Cash Memo','Purchase Order'],a:0,e:'A balance sheet presents assets, liabilities and equity at a point in time.'},
 {t:'ACCOUNTING',q:'The basic accounting equation is:',o:['Assets = Liabilities + Capital','Assets = Capital − Liabilities','Capital = Assets + Liabilities','Liabilities = Assets + Capital'],a:0,e:'The accounting equation is Assets = Liabilities + Capital.'},
 {t:'ACCOUNTING',q:'Which account is classified as a real account?',o:['Cash Account','Salary Account','Sales Account','Commission Received Account'],a:0,e:'Cash is a real account representing an asset.'},
 {t:'ACCOUNTING',q:'Outstanding salary at year-end is generally treated as:',o:['Expense and current liability','Income and current asset','Capital receipt','Fixed asset'],a:0,e:'Outstanding salary is an expense incurred and a liability payable.'},
 {t:'ACCOUNTING',q:'A trial balance is mainly prepared to check:',o:['Arithmetical accuracy of ledger balances','Market value of assets','Future sales','GST registration status'],a:0,e:'A trial balance helps check the arithmetical agreement of debit and credit ledger balances.'},
 {t:'ACCOUNTING',q:'Which is normally a current asset?',o:['Trade receivables','Land','Goodwill','Long-term investment'],a:0,e:'Trade receivables are normally expected to be realised in the operating cycle.'},
 {t:'ACCOUNTING',q:'When goods are purchased for cash, which entry is generally correct?',o:['Purchases debited, Cash credited','Cash debited, Purchases credited','Sales debited, Cash credited','Capital debited, Purchases credited'],a:0,e:'A cash purchase increases purchases and decreases cash.'},
 {t:'ACCOUNTING',q:'Bank reconciliation compares:',o:['Cash book bank balance with bank statement balance','Sales register with purchase register','Trial balance with balance sheet only','GST return with income tax return'],a:0,e:'Bank reconciliation explains differences between the cash book and bank statement balances.'},
 {t:'GST',q:'Input Tax Credit under GST generally relates to:',o:['Eligible GST paid on business inputs','Income tax deducted from salary','Customs duty only','TDS deposited by employee'],a:0,e:'ITC generally refers to eligible GST paid on business inputs, subject to conditions.'},
 {t:'GST',q:'GSTR-1 primarily reports:',o:['Outward supplies','Annual income tax deductions','TDS certificates','Fixed assets'],a:0,e:'GSTR-1 is the statement used for reporting outward supplies.'},
 {t:'GST',q:'A credit note under GST may be issued when:',o:['Taxable value or tax charged earlier needs reduction, subject to rules','A new fixed asset is purchased','Cash is deposited into bank','A salary is accrued'],a:0,e:'A credit note can be issued for specified reductions such as excess taxable value or tax, subject to GST rules.'},
 {t:'INCOME TAX',q:'TDS is generally a mechanism under which:',o:['Tax is deducted at source on specified payments','GST is collected only at import','Salary is never taxed','Business assets are depreciated'],a:0,e:'TDS requires tax deduction at source on specified payments under applicable provisions.'},
 {t:'AUDIT',q:'A compliance checklist is primarily useful for:',o:['Tracking whether required obligations and documents have been addressed','Replacing all accounting records','Guaranteeing a tax refund','Creating a bank account automatically'],a:0,e:'A checklist helps track completion of required compliance steps and supporting records.'},
 {t:'MSME',q:'Udyam Registration is associated with:',o:['MSME registration','Income tax return filing only','FSSAI food licensing only','Motor vehicle registration'],a:0,e:'Udyam Registration is the government registration framework for MSMEs.'},
 {t:'FSSAI',q:'FSSAI is primarily associated with:',o:['Food safety and food business regulation','Income tax assessment','GST return filing','Company incorporation'],a:0,e:'FSSAI is the statutory authority responsible for food safety regulation in India.'},
 {t:'ACCOUNTING',q:'The purpose of a Profit and Loss Account is to determine:',o:['Profit or loss for an accounting period','Only bank balance','Only total assets','Only GST registration status'],a:0,e:'The Profit and Loss Account determines the result of operations for the accounting period.'},
 {t:'ACCOUNTING',q:'Which is normally a capital expenditure?',o:['Purchase of machinery for business use','Monthly office electricity bill','Routine stationery purchase','Monthly telephone expense'],a:0,e:'Machinery purchased for business use provides a long-term benefit and is normally capital expenditure.'},
 {t:'GST',q:'For an intra-State taxable supply, GST is generally split between:',o:['CGST and SGST/UTGST','IGST and customs duty','TDS and TCS','Income tax and cess'],a:0,e:'Intra-State GST is generally composed of CGST and SGST/UTGST.'},
 {t:'INCOME TAX',q:'AIS on the Income Tax portal is intended to provide taxpayers with:',o:['Information reported about specified financial transactions and related data','Only a list of GST invoices','Only bank passwords','Only company incorporation documents'],a:0,e:'AIS provides reported financial and tax-related information to taxpayers for review.'},
 {t:'TDS',q:'Which document is commonly associated with reporting tax deducted at source to the deductee?',o:['TDS certificate','Purchase order','Balance sheet','FSSAI licence'],a:0,e:'A TDS certificate records tax deducted and related details for the deductee.'},
 {t:'AUDIT',q:'Reconciliation in accounting primarily means:',o:['Comparing related records and investigating differences','Deleting old ledger entries','Changing all debit entries to credit','Skipping supporting documents'],a:0,e:'Reconciliation compares related records and investigates differences.'},
 {t:'ACCOUNTING',q:'A ledger is used to:',o:['Classify and summarise transactions account-wise','Issue government notifications','Generate only GST registration numbers','Record only cash transactions'],a:0,e:'A ledger classifies transactions into individual accounts and summarises their balances.'},
 {t:'GST',q:'GST registration is primarily used to:',o:['Identify and administer taxable persons under the GST framework','Issue income tax PAN automatically','Grant food licences','Register motor vehicles'],a:0,e:'GST registration identifies taxable persons and enables GST compliance under applicable rules.'},
 {t:'MSME',q:'The term MSME refers to:',o:['Micro, Small and Medium Enterprises','Monthly Sales and Market Estimates','Municipal Service Management Entity','Minimum Salary Monthly Entitlement'],a:0,e:'MSME stands for Micro, Small and Medium Enterprises.'}
];

let dailyQuizState={questions:[],index:0,answers:[],seconds:600,timer:null,started:false,submitted:false};
function quizDayNumber(){ const d=new Date(); return Math.floor((Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())-Date.UTC(d.getFullYear(),0,1))/86400000)+1; }
function quizSeed(){ const d=new Date(); return Number(String(d.getFullYear())+String(d.getMonth()+1).padStart(2,'0')+String(d.getDate()).padStart(2,'0')); }
function buildDailyQuiz(){
  const bank=[...STS_QUIZ_BANK], seed=quizSeed(); let x=seed>>>0;
  bank.sort(()=>{x=(x*1664525+1013904223)>>>0; return (x/4294967296)-0.5;});
  return bank.slice(0,10);
}
function initDailyQuiz(){
  dailyQuizState={questions:buildDailyQuiz(),index:0,answers:Array(10).fill(null),seconds:600,timer:null,started:true,submitted:false};
  const d=new Date(); const dateLabel=document.getElementById('quizDateLabel'); if(dateLabel) dateLabel.textContent=d.toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'});
  const qd=document.getElementById('quizDay'); if(qd) qd.textContent=String(quizDayNumber()).padStart(2,'0');
  document.getElementById('dailyQuizFinal').style.display='none'; document.getElementById('dailyQuizArea').style.display='block';
  renderDailyQuizQuestion(); startDailyQuizTimer(); updateDailyQuizStats();
}
function startDailyQuizTimer(){clearInterval(dailyQuizState.timer);dailyQuizState.timer=setInterval(()=>{dailyQuizState.seconds--;updateDailyQuizTimer();if(dailyQuizState.seconds<=0)submitDailyQuiz();},1000);updateDailyQuizTimer();}
function updateDailyQuizTimer(){const el=document.getElementById('quizTimer');if(!el)return;const m=Math.floor(dailyQuizState.seconds/60),s=dailyQuizState.seconds%60;el.textContent=String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');}
function renderDailyQuizQuestion(){
 const q=dailyQuizState.questions[dailyQuizState.index]; document.getElementById('quizProgress').textContent='Question '+(dailyQuizState.index+1)+' of '+dailyQuizState.questions.length;document.getElementById('quizTopic').textContent=q.t;document.getElementById('quizQuestion').textContent=q.q;document.getElementById('quizResult').innerHTML='';
 document.getElementById('quizOptions').innerHTML=q.o.map((x,i)=>`<button type="button" class="quiz-option ${dailyQuizState.answers[dailyQuizState.index]===i?'selected':''}" onclick="selectDailyQuizOption(${i})"><span>${String.fromCharCode(65+i)}</span>${escapeHTML(x)}</button>`).join('');
 document.getElementById('quizNext').style.display=dailyQuizState.index<dailyQuizState.questions.length-1?'inline-flex':'none';document.getElementById('quizSubmit').style.display=dailyQuizState.index===dailyQuizState.questions.length-1?'inline-flex':'none';
}
function selectDailyQuizOption(i){dailyQuizState.answers[dailyQuizState.index]=i;document.querySelectorAll('#quizOptions .quiz-option').forEach((b,n)=>b.classList.toggle('selected',n===i));}
function dailyQuizNext(){if(dailyQuizState.answers[dailyQuizState.index]===null){alert('Please select an answer.');return;}dailyQuizState.index++;renderDailyQuizQuestion();}
function submitDailyQuiz(){if(dailyQuizState.submitted)return;if(dailyQuizState.answers[dailyQuizState.index]===null && dailyQuizState.index<dailyQuizState.questions.length){const unanswered=dailyQuizState.answers.filter(v=>v===null).length;if(unanswered>0 && !confirm('You have '+unanswered+' unanswered question(s). Submit anyway?'))return;}dailyQuizState.submitted=true;clearInterval(dailyQuizState.timer);let score=0;dailyQuizState.questions.forEach((q,i)=>{if(dailyQuizState.answers[i]===q.a)score++;});const pct=Math.round(score/10*100);saveDailyQuizResult(score,pct);showDailyQuizFinal(score,pct);}
function saveDailyQuizResult(score,pct){const key='stsDailyQuizHistory';const h=JSON.parse(localStorage.getItem(key)||'[]');const day=new Date().toISOString().slice(0,10);h.push({day,score,pct,at:new Date().toISOString()});const dedup=h.filter((v,i,a)=>i===a.findIndex(x=>x.day===v.day&&x.at===v.at));localStorage.setItem(key,JSON.stringify(dedup.slice(-100)));updateDailyQuizStats();}
function updateDailyQuizStats(){const h=JSON.parse(localStorage.getItem('stsDailyQuizHistory')||'[]');const today=new Date().toISOString().slice(0,10);const todayRows=h.filter(x=>x.day===today);const best=todayRows.reduce((m,x)=>Math.max(m,x.pct),0);const el=(id)=>document.getElementById(id);if(el('dailyQuizStatus'))el('dailyQuizStatus').textContent=todayRows.length?'Completed':'Not attempted';if(el('dailyBestScore'))el('dailyBestScore').textContent=todayRows.length?best+'%':'—';if(el('dailyAttempts'))el('dailyAttempts').textContent=todayRows.length;let streak=0;for(let i=0;i<365;i++){const d=new Date();d.setDate(d.getDate()-i);const k=d.toISOString().slice(0,10);if(h.some(x=>x.day===k)){streak++;}else break;}if(el('dailyStreak'))el('dailyStreak').textContent=streak+' day'+(streak===1?'':'s');}
function showDailyQuizFinal(score,pct){document.getElementById('dailyQuizArea').style.display='none';const final=document.getElementById('dailyQuizFinal');final.style.display='block';const pass=pct>=70;final.innerHTML=`<div class="daily-final ${pass?'pass':'fail'}"><div class="daily-final-score">${score}/10 · ${pct}%</div><h3>${pass?'Excellent! Daily Quiz Passed':'Keep Learning — Try Again'}</h3><p>${pass?'You cleared today’s 70% practice target.':'The practice target is 70%. Review the topics and try today’s quiz again.'}</p><div class="daily-review">${dailyQuizState.questions.map((q,i)=>{const ok=dailyQuizState.answers[i]===q.a;return `<div class="daily-review-row"><b>Q${i+1}</b><span>${ok?'✓':'✕'}</span><small>${escapeHTML(q.t)}</small></div>`}).join('')}</div><button class="sts-btn primary" onclick="initDailyQuiz()">Retake Today’s Quiz</button></div>`;}
function loadDailyQuiz(){initDailyQuiz();}

function calcGSTNew(){
  const a=Number(document.getElementById('gstAmount').value||0), r=Number(document.getElementById('gstRate').value)/100, m=document.getElementById('gstMode').value;
  let base,gst,total;
  if(m==='exclusive'){base=a;gst=a*r;total=a+gst}else{total=a;gst=a-a/(1+r);base=a-gst}
  document.getElementById('gstResult').innerHTML='<b>Taxable:</b> ₹'+base.toFixed(2)+' &nbsp; <b>GST:</b> ₹'+gst.toFixed(2)+' &nbsp; <b>Total:</b> ₹'+total.toFixed(2);
}
document.addEventListener('DOMContentLoaded',()=>{
  setToday(); loadDailyQuiz(); loadNews('tax');
  document.querySelectorAll('.news-tab').forEach(btn=>btn.addEventListener('click',()=>{
    document.querySelectorAll('.news-tab').forEach(x=>x.classList.remove('active')); btn.classList.add('active'); loadNews(btn.dataset.feed);
  }));
});

/* Accountant Academy - Accounting Certification Exam */
const ACCOUNTING_EXAM = [
 {q:'Which account is classified as a real account?',o:['Cash Account','Salary Account','Sales Account','Commission Received Account'],a:0},
 {q:'The basic accounting equation is:',o:['Assets = Liabilities + Capital','Assets = Capital − Liabilities','Capital = Assets + Liabilities','Liabilities = Assets + Capital'],a:0},
 {q:'A debit balance in the cash account normally represents:',o:['Cash available with the business','Amount payable to supplier','Revenue earned','Capital withdrawn'],a:0},
 {q:'Which document is commonly prepared when goods are sold on credit?',o:['Sales invoice','Purchase order','Debit note from supplier','Bank reconciliation statement'],a:0},
 {q:'Outstanding salary at year-end is treated as:',o:['Current liability and expense','Current asset and income','Capital receipt','Fixed asset'],a:0},
 {q:'Depreciation is generally charged to:',o:['Profit and Loss Account','Capital Account only','Sales Account','Bank Account'],a:0},
 {q:'A trial balance is mainly prepared to check:',o:['Arithmetical accuracy of ledger balances','Market value of assets','Future sales','GST registration status'],a:0},
 {q:'Which is an example of a current asset?',o:['Trade receivables','Land','Goodwill','Long-term investment'],a:0},
 {q:'When a business purchases goods for cash, which combination is correct?',o:['Purchases debited, Cash credited','Cash debited, Purchases credited','Sales debited, Cash credited','Capital debited, Purchases credited'],a:0},
 {q:'Bank reconciliation compares:',o:['Cash book bank balance with bank statement balance','Sales register with purchase register','Trial balance with balance sheet only','GST return with income tax return'],a:0},
 {q:'Input Tax Credit under GST generally relates to:',o:['Eligible GST paid on business inputs','Income tax deducted from salary','Customs duty only','TDS deposited by employee'],a:0},
 {q:'GSTR-1 is primarily used for reporting:',o:['Outward supplies','Annual income tax deductions','TDS certificates','Fixed assets'],a:0},
 {q:'TDS stands for:',o:['Tax Deducted at Source','Tax Deposit Summary','Total Deduction System','Tax Data Sheet'],a:0},
 {q:'A credit note is commonly issued when:',o:['Taxable value or tax charged earlier needs reduction, subject to applicable rules','A new fixed asset is purchased','Cash is deposited into bank','A salary is accrued'],a:0},
 {q:'Which financial statement presents assets, liabilities and equity at a point in time?',o:['Balance Sheet','Cash Flow Statement only','Sales Register','Purchase Order'],a:0},
 {q:'Revenue received in advance is generally treated as:',o:['A liability until earned','An expense immediately','A fixed asset','Drawings'],a:0},
 {q:'A ledger is used to:',o:['Classify and summarize transactions account-wise','Issue government notifications','Generate only GST registration numbers','Record only cash transactions'],a:0},
 {q:'The purpose of a profit and loss account is to determine:',o:['Profit or loss for the accounting period','Only bank balance','Only total assets','Only GST registration status'],a:0},
 {q:'Which is normally a capital expenditure?',o:['Purchase of machinery for business use','Monthly office electricity bill','Routine stationery purchase','Monthly telephone expense'],a:0},
 {q:'The accounting principle that assumes a business will continue operating is called:',o:['Going concern assumption','Matching principle','Prudence principle','Dual aspect concept'],a:0}
];
let examState={index:0,answers:[],name:'',timer:null,seconds:1800};
function startAccountingExam(){
  const input=document.getElementById('studentName'); const name=(input?.value||'').trim();
  if(!name){alert('Please enter the student full name.'); input?.focus(); return;}
  examState={index:0,answers:Array(ACCOUNTING_EXAM.length).fill(null),name,timer:null,seconds:1800};
  document.getElementById('examStart').style.display='none'; document.getElementById('examResult').style.display='none'; document.getElementById('examBody').style.display='block';
  renderExamQuestion(); startExamTimer();
}
function startExamTimer(){clearInterval(examState.timer); examState.timer=setInterval(()=>{examState.seconds--; updateExamTimer(); if(examState.seconds<=0){clearInterval(examState.timer); submitAccountingExam();}},1000); updateExamTimer();}
function updateExamTimer(){const el=document.getElementById('examTimer'); if(!el)return; const m=Math.floor(examState.seconds/60),s=examState.seconds%60; el.textContent=String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');}
function renderExamQuestion(){
  const q=ACCOUNTING_EXAM[examState.index]; document.getElementById('examProgress').textContent=`Question ${examState.index+1} of ${ACCOUNTING_EXAM.length}`; document.getElementById('examQuestion').textContent=q.q;
  document.getElementById('examOptions').innerHTML=q.o.map((x,i)=>`<button type="button" class="exam-option ${examState.answers[examState.index]===i?'selected':''}" onclick="selectExamOption(${i})"><span>${String.fromCharCode(65+i)}</span><b>${escapeHTML(x)}</b></button>`).join('');
  document.getElementById('examNext').textContent=examState.index===ACCOUNTING_EXAM.length-1?'Submit Exam ✓':'Next Question →';
}
function selectExamOption(i){examState.answers[examState.index]=i; document.querySelectorAll('.exam-option').forEach((b,n)=>b.classList.toggle('selected',n===i));}
function nextExamQuestion(){if(examState.answers[examState.index]===null){alert('Please select an answer.');return;} if(examState.index<ACCOUNTING_EXAM.length-1){examState.index++;renderExamQuestion();}else submitAccountingExam();}
function submitAccountingExam(){
  clearInterval(examState.timer); let score=0; ACCOUNTING_EXAM.forEach((q,i)=>{if(examState.answers[i]===q.a)score++;});
  const pct=Math.round(score/ACCOUNTING_EXAM.length*100), pass=pct>=70; const panel=document.getElementById('examResult'); document.getElementById('examBody').style.display='none'; panel.style.display='block'; panel.className='exam-result-panel '+(pass?'pass':'fail');
  panel.innerHTML=`<div class="exam-score">${score}/${ACCOUNTING_EXAM.length} · ${pct}%</div><h3>${pass?'Congratulations — Exam Passed':'Exam Not Passed'}</h3><p>${pass?'You have met the 70% passing requirement. You can now generate your Accountant Academy course-completion certificate.':'The passing requirement is 70%. You can restart the exam and try again.'}</p><div class="certificate-action"><button class="sts-btn primary" onclick="${pass?'showCertificateForm()':'restartAccountingExam()'}">${pass?'Generate Certificate':'Retake Exam'}</button><a class="sts-btn outline" href="#academy">Back to Academy</a></div>${pass?'<div id="certificateArea"></div>':''}`;
}
function restartAccountingExam(){document.getElementById('examResult').style.display='none';document.getElementById('examStart').style.display='block';document.getElementById('studentName').value=examState.name;}
function showCertificateForm(){
 const area=document.getElementById('certificateArea'); if(!area)return; area.innerHTML=`<div class="certificate-form"><label>Certificate name</label><input id="certificateName" value="${escapeHTML(examState.name)}" maxlength="80"><button class="sts-btn primary" onclick="renderCertificate()">Create Certificate</button><small style="display:block;margin-top:8px;color:#7d8796;font-size:9px">Use the same name you want printed on the certificate.</small></div>`;
}
function renderCertificate(){
 const name=(document.getElementById('certificateName')?.value||examState.name).trim(); if(!name){alert('Enter the certificate name.');return;} const id='Accountant Academy-'+new Date().getFullYear()+'-'+Math.random().toString(36).slice(2,8).toUpperCase(); const date=new Date().toLocaleDateString('en-IN',{day:'2-digit',month:'long',year:'numeric'}); const area=document.getElementById('certificateArea');
 area.innerHTML=`<div class="certificate-preview" id="printCertificate"><div class="cert-org">ACCOUNTANT ACADEMY</div><h2>Certificate of Completion</h2><p>This certificate is proudly presented to</p><div class="cert-name">${escapeHTML(name)}</div><p>for successfully passing the Accounting & GST Certification Examination conducted through<br><b>Accountant Academy</b> in association with <b>Smart Tax Solution</b>.</p><p><b>Examination Score: ${Math.round((examState.answers.filter((v,i)=>v===ACCOUNTING_EXAM[i].a).length/ACCOUNTING_EXAM.length)*100)}%</b><br>Certificate ID: ${id}<br>Date: ${date}</p><div class="cert-footer"><span class="cert-founder">Adv. Pankaj Nokhwal<br>Founder, Smart Tax Solution</span><span>Accountant Academy<br>Course Completion Certificate</span></div></div><button class="sts-btn primary" style="margin-top:12px" onclick="printCertificate()">Print / Save Certificate</button>`;
}
function printCertificate(){const el=document.getElementById('printCertificate');if(!el)return;const w=window.open('','_blank','width=1000,height=750');w.document.write(`<html><head><title>Accountant Academy Certificate</title><style>body{font-family:Arial,sans-serif;padding:30px}.certificate-preview{border:7px double #b18a4d;padding:70px 40px;text-align:center;min-height:520px}.cert-org{letter-spacing:2px;font-weight:900}.certificate-preview h2{font-family:Georgia,serif;font-size:36px}.cert-name{font-family:Georgia,serif;font-size:30px;font-weight:700;border-bottom:1px solid #b18a4d;display:inline-block;padding:0 25px 10px}.certificate-preview p{line-height:1.7}.cert-footer{display:flex;justify-content:space-between;margin-top:45px;font-size:12px}</style></head><body>${el.outerHTML}</body></html>`);w.document.close();w.focus();w.print();}
