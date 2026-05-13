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

const OWNER_PIN = '123456';
const SECURITY_PIN = '999000';
const HOUSE_FEE_RATE = 0.12;

const keys = {
  messages: 'littleSparkMessages',
  users: 'littleSparkUsers',
  founders: 'littleSparkFounders',
  tickets: 'littleSparkTickets',
  plan: 'littleSparkSelectedPlan',
  planPrice: 'littleSparkSelectedPlanPrice',
  lead: 'littleSparkLead',
  sales: 'littleSparkSales',
  cashouts: 'littleSparkCashouts',
  security: 'littleSparkSecurityLog'
};

function read(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) || fallback; }
  catch { return fallback; }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function money(value) {
  return `$${Number(value || 0).toFixed(2)}`;
}

function csvEscape(value) {
  return `"${String(value || '').replaceAll('"', '""')}"`;
}

function addMessage(text, who = 'user') {
  const div = document.createElement('div');
  div.className = `bubble ${who}`;
  div.textContent = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function botReply(text) {
  const lower = text.toLowerCase();
  let reply = 'Spark heard you. This prototype can save messages, accounts, founders, tickets, selected plans, sales, cash-outs, and security notes locally.';

  if (lower.includes('price') || lower.includes('plan')) reply = 'Plans start at $25/mo in this demo. Spark Plus is the featured middle option.';
  if (lower.includes('esim')) reply = 'eSIM activation needs a real provider API and backend keys. The hook section is ready for that next.';
  if (lower.includes('help') || lower.includes('support')) reply = 'Create a support ticket on the right and it will save locally for the owner dashboard.';
  if (lower.includes('cash') || lower.includes('payout')) reply = 'The owner panel can now record demo cash-out requests and track total requested payout.';
  if (lower.includes('founder') || lower.includes('waitlist')) reply = 'Founder leads are captured locally and can be exported as CSV from the owner panel.';

  setTimeout(() => {
    addMessage(reply, 'bot');
    const saved = read(keys.messages, []);
    saved.push({ who: 'bot', text: reply, at: new Date().toISOString() });
    write(keys.messages, saved);
    refreshStats();
  }, 350);
}

function loadMessages() {
  messages.innerHTML = '';
  const saved = read(keys.messages, []);
  saved.forEach(msg => addMessage(msg.text || msg, msg.who || 'user'));
}

function refreshFounders() {
  const founders = read(keys.founders, []);
  if (!founderList) return;
  founderList.innerHTML = '';
  founders.forEach((founder, index) => {
    const div = document.createElement('div');
    div.className = 'item';
    div.textContent = `#${index + 1} ${founder.name} - ${founder.email} - ${founder.interest}`;
    founderList.appendChild(div);
  });
}

function refreshTickets() {
  const tickets = read(keys.tickets, []);
  ticketList.innerHTML = '';
  tickets.forEach((ticket, index) => {
    const div = document.createElement('div');
    div.className = 'item';
    div.textContent = `#${index + 1} ${ticket.text}`;
    ticketList.appendChild(div);
  });
}

function refreshCashouts() {
  const cashouts = read(keys.cashouts, []);
  cashoutList.innerHTML = '';
  cashouts.forEach((cashout, index) => {
    const div = document.createElement('div');
    div.className = 'item';
    div.textContent = `#${index + 1} ${money(cashout.amount)} via ${cashout.method} - ${cashout.status}`;
    cashoutList.appendChild(div);
  });
}

function refreshSecurityLog() {
  const logs = read(keys.security, []);
  securityLog.innerHTML = '';
  logs.forEach((entry, index) => {
    const div = document.createElement('div');
    div.className = 'item';
    div.textContent = `#${index + 1} [${entry.level}] ${entry.text}`;
    securityLog.appendChild(div);
  });
}

function refreshStats() {
  const users = read(keys.users, []);
  const founders = read(keys.founders, []);
  const savedMessages = read(keys.messages, []);
  const tickets = read(keys.tickets, []);
  const sales = read(keys.sales, []);
  const cashouts = read(keys.cashouts, []);
  const securityEntries = read(keys.security, []);
  const revenue = sales.reduce((sum, sale) => sum + Number(sale.amount || 0), 0);
  const fees = revenue * HOUSE_FEE_RATE;
  const requestedCashout = cashouts.reduce((sum, cashout) => sum + Number(cashout.amount || 0), 0);
  const highRiskCount = securityEntries.filter(entry => entry.level === 'HIGH').length;

  userCount.textContent = users.length;
  if (founderCount) founderCount.textContent = founders.length;
  messageCount.textContent = savedMessages.length;
  ticketCount.textContent = tickets.length;
  selectedPlan.textContent = localStorage.getItem(keys.plan) || 'None';
  grossRevenue.textContent = money(revenue);
  houseFees.textContent = money(fees);
  cashoutTotal.textContent = money(requestedCashout);
  riskScore.textContent = highRiskCount > 0 ? 'High' : tickets.length > 3 ? 'Medium' : 'Low';
}

sendBtn.addEventListener('click', () => {
  const text = messageInput.value.trim();
  if (!text) return;
  addMessage(text, 'user');
  const saved = read(keys.messages, []);
  saved.push({ who: 'user', text, at: new Date().toISOString() });
  write(keys.messages, saved);
  messageInput.value = '';
  refreshStats();
  botReply(text);
});

messageInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') sendBtn.click();
});

signupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const users = read(keys.users, []);
  users.push({ name: $('nameInput').value, email: $('emailInput').value, phone: $('phoneInput').value, at: new Date().toISOString() });
  write(keys.users, users);
  signupForm.reset();
  alert('Demo account saved locally ⚡');
  refreshStats();
});

founderForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const founders = read(keys.founders, []);
  founders.push({
    name: founderNameInput.value,
    email: founderEmailInput.value,
    phone: founderPhoneInput.value,
    interest: founderInterestInput.value,
    at: new Date().toISOString()
  });
  write(keys.founders, founders);
  founderForm.reset();
  alert('Founder waitlist saved locally ⚡');
  refreshFounders();
  refreshStats();
});

document.querySelectorAll('.choosePlan').forEach(button => {
  button.addEventListener('click', () => {
    localStorage.setItem(keys.plan, button.dataset.plan);
    localStorage.setItem(keys.planPrice, button.dataset.price || '0');
    alert(`${button.dataset.plan} selected`);
    refreshStats();
  });
});

ticketBtn.addEventListener('click', () => {
  const text = ticketInput.value.trim();
  if (!text) return;
  const tickets = read(keys.tickets, []);
  tickets.push({ text, status: 'open', at: new Date().toISOString() });
  write(keys.tickets, tickets);
  ticketInput.value = '';
  refreshTickets();
  refreshStats();
});

ownerLoginBtn.addEventListener('click', () => {
  if (ownerPinInput.value === OWNER_PIN) {
    ownerTools.classList.remove('hidden');
    refreshCashouts();
    refreshFounders();
    refreshStats();
    alert('Owner access granted ⚡');
  } else {
    alert('Incorrect PIN');
  }
});

saveLeadBtn.addEventListener('click', () => {
  localStorage.setItem(keys.lead, JSON.stringify({ status: 'Interested User', at: new Date().toISOString() }));
  alert('Lead saved locally ⚡');
});

simulateSaleBtn.addEventListener('click', () => {
  const plan = localStorage.getItem(keys.plan) || 'Spark Plus';
  const amount = Number(localStorage.getItem(keys.planPrice) || 45);
  const sales = read(keys.sales, []);
  sales.push({ plan, amount, at: new Date().toISOString() });
  write(keys.sales, sales);
  alert(`${plan} demo sale recorded for ${money(amount)} ⚡`);
  refreshStats();
});

exportFoundersBtn.addEventListener('click', () => {
  const founders = read(keys.founders, []);
  if (!founders.length) {
    alert('No founder leads to export yet');
    return;
  }
  const header = ['name', 'email', 'phone', 'interest', 'created_at'];
  const rows = founders.map(founder => [founder.name, founder.email, founder.phone, founder.interest, founder.at].map(csvEscape).join(','));
  const csv = [header.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'little-spark-founder-leads.csv';
  link.click();
  URL.revokeObjectURL(url);
});

cashoutBtn.addEventListener('click', () => {
  const amount = Number(cashoutAmountInput.value);
  const method = cashoutMethodInput.value.trim() || 'Manual Review';
  if (!amount || amount < 1) {
    alert('Enter a cash-out amount of at least $1');
    return;
  }
  const cashouts = read(keys.cashouts, []);
  cashouts.push({ amount, method, status: 'pending demo review', at: new Date().toISOString() });
  write(keys.cashouts, cashouts);
  cashoutAmountInput.value = '';
  cashoutMethodInput.value = '';
  refreshCashouts();
  refreshStats();
});

securityLoginBtn.addEventListener('click', () => {
  if (securityPinInput.value === SECURITY_PIN) {
    securityTools.classList.remove('hidden');
    refreshSecurityLog();
    refreshStats();
    alert('Security access granted 🛡️');
  } else {
    alert('Incorrect security PIN');
  }
});

securityNoteBtn.addEventListener('click', () => {
  const text = securityNoteInput.value.trim();
  if (!text) return;
  const logs = read(keys.security, []);
  logs.push({ level: 'NOTE', text, at: new Date().toISOString() });
  write(keys.security, logs);
  securityNoteInput.value = '';
  refreshSecurityLog();
  refreshStats();
});

simulateThreatBtn.addEventListener('click', () => {
  const logs = read(keys.security, []);
  logs.push({ level: 'HIGH', text: 'Simulated threat alert: suspicious activity flagged for review.', at: new Date().toISOString() });
  write(keys.security, logs);
  refreshSecurityLog();
  refreshStats();
  alert('Threat alert logged for demo review');
});

clearMessagesBtn.addEventListener('click', () => {
  localStorage.removeItem(keys.messages);
  loadMessages();
  refreshStats();
});

clearAllBtn.addEventListener('click', () => {
  Object.values(keys).forEach(key => localStorage.removeItem(key));
  loadMessages();
  refreshTickets();
  refreshCashouts();
  refreshFounders();
  refreshSecurityLog();
  refreshStats();
  alert('Demo reset complete');
});

loadMessages();
refreshTickets();
refreshCashouts();
refreshFounders();
refreshSecurityLog();
refreshStats();
