const sendBtn = document.getElementById('sendBtn');
const messageInput = document.getElementById('messageInput');
const messages = document.getElementById('messages');
const saveLeadBtn = document.getElementById('saveLeadBtn');
const ownerLoginBtn = document.getElementById('ownerLoginBtn');
const ownerPinInput = document.getElementById('ownerPinInput');
const ownerTools = document.getElementById('ownerTools');
const clearMessagesBtn = document.getElementById('clearMessagesBtn');

const OWNER_PIN = '123456';

function loadMessages() {
  const saved = JSON.parse(localStorage.getItem('littleSparkMessages')) || [];
  saved.forEach(msg => addMessage(msg));
}

function addMessage(text) {
  const div = document.createElement('div');
  div.textContent = text;
  div.style.padding = '8px';
  div.style.marginBottom = '8px';
  div.style.background = '#334155';
  div.style.borderRadius = '8px';
  messages.appendChild(div);
}

sendBtn.addEventListener('click', () => {
  const text = messageInput.value.trim();

  if (!text) return;

  addMessage(text);

  const saved = JSON.parse(localStorage.getItem('littleSparkMessages')) || [];
  saved.push(text);
  localStorage.setItem('littleSparkMessages', JSON.stringify(saved));

  messageInput.value = '';
});

ownerLoginBtn.addEventListener('click', () => {
  if (ownerPinInput.value === OWNER_PIN) {
    ownerTools.classList.remove('hidden');
    alert('Owner access granted ⚡');
  } else {
    alert('Incorrect PIN');
  }
});

saveLeadBtn.addEventListener('click', () => {
  localStorage.setItem('littleSparkLead', 'Interested User');
  alert('Lead saved locally ⚡');
});

clearMessagesBtn.addEventListener('click', () => {
  localStorage.removeItem('littleSparkMessages');
  messages.innerHTML = '';
  alert('Messages cleared');
});

loadMessages();
