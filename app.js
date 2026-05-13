const $ = (id) => document.getElementById(id);

const sendBtn = $('sendBtn');
const messageInput = $('messageInput');
const messages = $('messages');
const saveLeadBtn = $('saveLeadBtn');
const ownerLoginBtn = $('ownerLoginBtn');
const ownerPinInput = $('ownerPinInput');
const ownerTools = $('ownerTools');
const clearMessagesBtn = $('clearMessagesBtn');
const clearAllBtn = $('clearAllBtn');
const signupForm = $('signupForm');
const founderForm = $('founderForm');
const founderNameInput = $('founderNameInput');
const founderEmailInput = $('founderEmailInput');
const founderPhoneInput = $('founderPhoneInput');
const founderInterestInput = $('founderInterestInput');
const founderCount = $('founderCount');
const founderList = $('founderList');
const exportFoundersBtn = $('exportFoundersBtn');
const ticketInput = $('ticketInput');
const ticketBtn = $('ticketBtn');
const ticketList = $('ticketList');
const userCount = $('userCount');
const messageCount = $('messageCount');
const ticketCount = $('ticketCount');
const selectedPlan = $('selectedPlan');
const grossRevenue = $('grossRevenue');
const houseFees = $('houseFees');
const cashoutTotal = $('cashoutTotal');
const riskScore = $('riskScore');
const cashoutAmountInput = $('cashoutAmountInput');
const cashoutMethodInput = $('cashoutMethodInput');
const cashoutBtn = $('cashoutBtn');
const cashoutList = $('cashoutList');
const simulateSaleBtn = $('simulateSaleBtn');
const securityPinInput = $('securityPinInput');
const securityLoginBtn = $('securityLoginBtn');
const securityTools = $('securityTools');
const securityNoteInput = $('securityNoteInput');
const securityNoteBtn = $('securityNoteBtn');
const simulateThreatBtn = $('simulateThreatBtn');
const securityLog = $('securityLog');
const shareBtn = $('shareBtn');
const installBtn = $('installBtn');
const installHint = $('installHint');
const referralLinkInput = $('referralLinkInput');
const copyReferralBtn = $('copyReferralBtn');
const qrBox = $('qrBox');
const downloadInviteBtn = $('downloadInviteBtn');
const scanBtn = $('scanBtn');
const scanProgress = $('scanProgress');
const activationStatus = $('activationStatus');

const OWNER_PIN = '123456';
const SECURITY_PIN = '999000';
const HOUSE_FEE_RATE = 0.12;
let deferredInstallPrompt = null;

const keys = { messages:'littleSparkMessages', users:'littleSparkUsers', founders:'littleSparkFounders', tickets:'littleSparkTickets', plan:'littleSparkSelectedPlan', planPrice:'littleSparkSelectedPlanPrice', lead:'littleSparkLead', sales:'littleSparkSales', cashouts:'littleSparkCashouts', security:'littleSparkSecurityLog', referral:'littleSparkReferralCode' };
function read(key, fallback){ try{return JSON.parse(localStorage.getItem(key)) || fallback;}catch{return fallback;} }
function write(key,value){localStorage.setItem(key,JSON.stringify(value));}
function money(value){return `$${Number(value||0).toFixed(2)}`;}
function csvEscape(value){return `"${String(value||'').replaceAll('"','""')}"`;}
function sparkCode(){return Math.random().toString(36).slice(2,8).toUpperCase();}
function getReferralCode(){let code=localStorage.getItem(keys.referral); if(!code){code=`SPARK-${sparkCode()}`; localStorage.setItem(keys.referral,code);} return code;}
function getReferralLink(){const url=new URL(window.location.href); url.hash=''; url.searchParams.set('ref',getReferralCode()); return url.toString();}
function toast(text){alert(text);}
function addMessage(text,who='user'){const div=document.createElement('div'); div.className=`bubble ${who}`; div.textContent=text; messages.appendChild(div); messages.scrollTop=messages.scrollHeight;}
function botReply(text){const lower=text.toLowerCase(); let reply='Spark heard you. This prototype can save messages, accounts, founders, tickets, selected plans, sales, cash-outs, and security notes locally.'; if(lower.includes('price')||lower.includes('plan')) reply='Plans start at $25/mo in this demo. Spark Plus is the featured middle option.'; if(lower.includes('esim')||lower.includes('activate')) reply='The activation simulator can model eSIM readiness, but real eSIM activation needs a provider API and backend keys.'; if(lower.includes('help')||lower.includes('support')) reply='Create a support ticket on the right and it will save locally for the owner dashboard.'; if(lower.includes('cash')||lower.includes('payout')) reply='The owner panel records demo cash-out requests and tracks total requested payout.'; if(lower.includes('founder')||lower.includes('waitlist')||lower.includes('referral')) reply='Founder leads and referral links are captured locally. The next real step is cloud storage.'; setTimeout(()=>{addMessage(reply,'bot'); const saved=read(keys.messages,[]); saved.push({who:'bot',text:reply,at:new Date().toISOString()}); write(keys.messages,saved); refreshStats();},350);}
function loadMessages(){messages.innerHTML=''; read(keys.messages,[]).forEach(msg=>addMessage(msg.text||msg,msg.who||'user'));}
function scoreFounder(founder){let score=30; if(founder.phone) score+=20; if(founder.interest==='Investor/partner') score+=35; if(founder.interest==='Business/family lines') score+=25; if(founder.email&&founder.email.includes('@')) score+=15; return Math.min(score,100);}
function refreshFounders(){const founders=read(keys.founders,[]); if(!founderList)return; founderList.innerHTML=''; founders.forEach((founder,index)=>{const div=document.createElement('div'); div.className='item'; div.textContent=`#${index+1} ${founder.name} - ${founder.email} - ${founder.interest} - Lead Score ${scoreFounder(founder)}`; founderList.appendChild(div);});}
function refreshTickets(){const tickets=read(keys.tickets,[]); ticketList.innerHTML=''; tickets.forEach((ticket,index)=>{const div=document.createElement('div'); div.className='item'; div.textContent=`#${index+1} ${ticket.text}`; ticketList.appendChild(div);});}
function refreshCashouts(){const cashouts=read(keys.cashouts,[]); cashoutList.innerHTML=''; cashouts.forEach((cashout,index)=>{const div=document.createElement('div'); div.className='item'; div.textContent=`#${index+1} ${money(cashout.amount)} via ${cashout.method} - ${cashout.status}`; cashoutList.appendChild(div);});}
function refreshSecurityLog(){const logs=read(keys.security,[]); securityLog.innerHTML=''; logs.forEach((entry,index)=>{const div=document.createElement('div'); div.className='item'; div.textContent=`#${index+1} [${entry.level}] ${entry.text}`; securityLog.appendChild(div);});}
function refreshReferral(){if(referralLinkInput)referralLinkInput.value=getReferralLink(); renderQr();}
function renderQr(){if(!qrBox)return; const code=getReferralCode().replace('SPARK-',''); const bits=[...code].map(ch=>ch.charCodeAt(0).toString(2).padStart(8,'0')).join(''); qrBox.innerHTML=''; for(let i=0;i<81;i++){const cell=document.createElement('span'); cell.className=bits[i%bits.length]==='1'||i%10===0||i<9||i>71?'on':''; qrBox.appendChild(cell);} }
function refreshStats(){const users=read(keys.users,[]), founders=read(keys.founders,[]), savedMessages=read(keys.messages,[]), tickets=read(keys.tickets,[]), sales=read(keys.sales,[]), cashouts=read(keys.cashouts,[]), securityEntries=read(keys.security,[]); const revenue=sales.reduce((sum,sale)=>sum+Number(sale.amount||0),0); const fees=revenue*HOUSE_FEE_RATE; const requestedCashout=cashouts.reduce((sum,cashout)=>sum+Number(cashout.amount||0),0); const highRiskCount=securityEntries.filter(entry=>entry.level==='HIGH').length; userCount.textContent=users.length; if(founderCount)founderCount.textContent=founders.length; messageCount.textContent=savedMessages.length; ticketCount.textContent=tickets.length; selectedPlan.textContent=localStorage.getItem(keys.plan)||'None'; grossRevenue.textContent=money(revenue); houseFees.textContent=money(fees); cashoutTotal.textContent=money(requestedCashout); riskScore.textContent=highRiskCount>0?'High':tickets.length>3?'Medium':'Low';}

sendBtn.addEventListener('click',()=>{const text=messageInput.value.trim(); if(!text)return; addMessage(text,'user'); const saved=read(keys.messages,[]); saved.push({who:'user',text,at:new Date().toISOString()}); write(keys.messages,saved); messageInput.value=''; refreshStats(); botReply(text);});
messageInput.addEventListener('keydown',event=>{if(event.key==='Enter')sendBtn.click();});
signupForm.addEventListener('submit',event=>{event.preventDefault(); const users=read(keys.users,[]); users.push({name:$('nameInput').value,email:$('emailInput').value,phone:$('phoneInput').value,ref:getReferralCode(),at:new Date().toISOString()}); write(keys.users,users); signupForm.reset(); toast('Demo account saved locally ⚡'); refreshStats();});
founderForm.addEventListener('submit',event=>{event.preventDefault(); const founders=read(keys.founders,[]); founders.push({name:founderNameInput.value,email:founderEmailInput.value,phone:founderPhoneInput.value,interest:founderInterestInput.value,ref:getReferralCode(),at:new Date().toISOString()}); write(keys.founders,founders); founderForm.reset(); toast('Founder waitlist saved locally ⚡'); refreshFounders(); refreshStats();});
document.querySelectorAll('.choosePlan').forEach(button=>button.addEventListener('click',()=>{localStorage.setItem(keys.plan,button.dataset.plan); localStorage.setItem(keys.planPrice,button.dataset.price||'0'); toast(`${button.dataset.plan} selected`); refreshStats();}));
ticketBtn.addEventListener('click',()=>{const text=ticketInput.value.trim(); if(!text)return; const tickets=read(keys.tickets,[]); tickets.push({text,status:'open',at:new Date().toISOString()}); write(keys.tickets,tickets); ticketInput.value=''; refreshTickets(); refreshStats();});
ownerLoginBtn.addEventListener('click',()=>{if(ownerPinInput.value===OWNER_PIN){ownerTools.classList.remove('hidden'); refreshCashouts(); refreshFounders(); refreshStats(); toast('Owner access granted ⚡');}else toast('Incorrect PIN');});
saveLeadBtn.addEventListener('click',()=>{localStorage.setItem(keys.lead,JSON.stringify({status:'Interested User',at:new Date().toISOString()})); toast('Lead saved locally ⚡');});
simulateSaleBtn.addEventListener('click',()=>{const plan=localStorage.getItem(keys.plan)||'Spark Plus'; const amount=Number(localStorage.getItem(keys.planPrice)||45); const sales=read(keys.sales,[]); sales.push({plan,amount,at:new Date().toISOString()}); write(keys.sales,sales); toast(`${plan} demo sale recorded for ${money(amount)} ⚡`); refreshStats();});
exportFoundersBtn.addEventListener('click',()=>{const founders=read(keys.founders,[]); if(!founders.length)return toast('No founder leads to export yet'); const header=['name','email','phone','interest','lead_score','referral','created_at']; const rows=founders.map(founder=>[founder.name,founder.email,founder.phone,founder.interest,scoreFounder(founder),founder.ref,founder.at].map(csvEscape).join(',')); const csv=[header.join(','),...rows].join('\n'); const blob=new Blob([csv],{type:'text/csv'}); const url=URL.createObjectURL(blob); const link=document.createElement('a'); link.href=url; link.download='little-spark-founder-leads.csv'; link.click(); URL.revokeObjectURL(url);});
cashoutBtn.addEventListener('click',()=>{const amount=Number(cashoutAmountInput.value); const method=cashoutMethodInput.value.trim()||'Manual Review'; if(!amount||amount<1)return toast('Enter a cash-out amount of at least $1'); const cashouts=read(keys.cashouts,[]); cashouts.push({amount,method,status:'pending demo review',at:new Date().toISOString()}); write(keys.cashouts,cashouts); cashoutAmountInput.value=''; cashoutMethodInput.value=''; refreshCashouts(); refreshStats();});
securityLoginBtn.addEventListener('click',()=>{if(securityPinInput.value===SECURITY_PIN){securityTools.classList.remove('hidden'); refreshSecurityLog(); refreshStats(); toast('Security access granted 🛡️');}else toast('Incorrect security PIN');});
securityNoteBtn.addEventListener('click',()=>{const text=securityNoteInput.value.trim(); if(!text)return; const logs=read(keys.security,[]); logs.push({level:'NOTE',text,at:new Date().toISOString()}); write(keys.security,logs); securityNoteInput.value=''; refreshSecurityLog(); refreshStats();});
simulateThreatBtn.addEventListener('click',()=>{const logs=read(keys.security,[]); logs.push({level:'HIGH',text:'Simulated threat alert: suspicious activity flagged for review.',at:new Date().toISOString()}); write(keys.security,logs); refreshSecurityLog(); refreshStats(); toast('Threat alert logged for demo review');});
clearMessagesBtn.addEventListener('click',()=>{localStorage.removeItem(keys.messages); loadMessages(); refreshStats();});
clearAllBtn.addEventListener('click',()=>{Object.values(keys).forEach(key=>localStorage.removeItem(key)); loadMessages(); refreshTickets(); refreshCashouts(); refreshFounders(); refreshSecurityLog(); refreshReferral(); refreshStats(); toast('Demo reset complete');});
if(shareBtn)shareBtn.addEventListener('click',async()=>{const shareData={title:'Little Spark Wireless',text:'Join the first Spark circle for AI-assisted wireless service.',url:getReferralLink()}; if(navigator.share)await navigator.share(shareData); else{await navigator.clipboard.writeText(shareData.url); toast('Invite link copied ⚡');}});
if(copyReferralBtn)copyReferralBtn.addEventListener('click',async()=>{await navigator.clipboard.writeText(getReferralLink()); toast('Referral invite copied ⚡');});
if(downloadInviteBtn)downloadInviteBtn.addEventListener('click',()=>{const card=`Little Spark Wireless\n\nJoin the first Spark circle.\nReferral: ${getReferralCode()}\n${getReferralLink()}\n\nAI assisted wireless concierge.`; const blob=new Blob([card],{type:'text/plain'}); const url=URL.createObjectURL(blob); const link=document.createElement('a'); link.href=url; link.download='little-spark-invite-card.txt'; link.click(); URL.revokeObjectURL(url);});
if(scanBtn)scanBtn.addEventListener('click',()=>{let progress=0; activationStatus.textContent='Scanning device profile, provider hooks, and payment readiness...'; scanProgress.style.width='0%'; const timer=setInterval(()=>{progress+=20; scanProgress.style.width=`${progress}%`; if(progress>=100){clearInterval(timer); activationStatus.textContent='Demo ready: eSIM provider API, backend auth, payment keys, and compliance review still required for real activation.';}},350);});
window.addEventListener('beforeinstallprompt',event=>{event.preventDefault(); deferredInstallPrompt=event; if(installHint)installHint.textContent='Install is ready on supported browsers.';});
if(installBtn)installBtn.addEventListener('click',async()=>{if(deferredInstallPrompt){deferredInstallPrompt.prompt(); await deferredInstallPrompt.userChoice; deferredInstallPrompt=null;}else toast('On iPhone: tap Share, then Add to Home Screen. On Android: use browser install if available.');});
if('serviceWorker' in navigator)navigator.serviceWorker.register('./sw.js').catch(()=>{});

loadMessages(); refreshTickets(); refreshCashouts(); refreshFounders(); refreshSecurityLog(); refreshReferral(); refreshStats();
