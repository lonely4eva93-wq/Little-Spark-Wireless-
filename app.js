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
const ticketInput = $('ticketInput');
const ticketBtn = $('ticketBtn');
const ticketList = $('ticketList');
const userCount = $('userCount');
const messageCount = $('messageCount');
const ticketCount = $('ticketCount');
const selectedPlan = $('selectedPlan');

const OWNER_PIN = '123456';
const keys = {
  messages: 'littleSparkMessages',
  users: 'littleSparkUsers',
  tickets: 'littleSparkTickets',
  plan: 'littleSparkSelectedPlan',
  lead: 'littleSparkLead'
};

function read(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) || fallback; }
  catch { return fallback; }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
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
  let reply = 'Spark heard you. This prototype can save messages, accounts, tickets, and selected plans locally.';

  if (lower.includes('price') || lower.includes('plan')) reply = 'Plans start at $25/mo in this demo. Spark Plus is the featured middle option.';
  if (lower.includes('esim')) reply = 'eSIM activation needs a real provider API and backend keys. The hook section is ready for that next.';
  if (lower.includes('help') || lower.includes('support')) reply = 'Create a support ticket on the right and it will save locally for the owner dashboard.';

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

function refreshStats() {
  userCount.textContent = read(keys.users, []).length;
  messageCount.textContent = read(keys.messages, []).length;
  ticketCount.textContent = read(keys.tickets, []).length;
  selectedPlan.textContent = localStorage.getItem(keys.plan) || 'None';
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

document.querySelectorAll('.choosePlan').forEach(button => {
  button.addEventListener('click', () => {
    localStorage.setItem(keys.plan, button.dataset.plan);
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

clearMessagesBtn.addEventListener('click', () => {
  localStorage.removeItem(keys.messages);
  loadMessages();
  refreshStats();
});

clearAllBtn.addEventListener('click', () => {
  Object.values(keys).forEach(key => localStorage.removeItem(key));
  loadMessages();
  refreshTickets();
  refreshStats();
  alert('Demo reset complete');
});

loadMessages();
refreshTickets();
refreshStats();
