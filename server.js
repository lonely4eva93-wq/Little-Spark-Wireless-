import '@dotenvx/dotenvx/config';
import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import OpenAI from 'openai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;
const model = process.env.OPENAI_MODEL || 'gpt-5.5';
const systemPrompt = fs.readFileSync(path.join(__dirname, 'system-prompt.md'), 'utf8');

if (!process.env.OPENAI_API_KEY) {
  console.warn('\n⚠️  Missing OPENAI_API_KEY. Copy .env.example to .env and add your key.\n');
}

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, 'public')));

function cleanMessages(messages = []) {
  return messages
    .filter((m) => m && ['user', 'assistant'].includes(m.role) && typeof m.content === 'string')
    .slice(-20)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 8000) }));
}

app.post('/api/chat', async (req, res) => {
  try {
    const messages = cleanMessages(req.body.messages);
    const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user');

    if (!lastUserMessage) {
      return res.status(400).json({ error: 'Send at least one user message.' });
    }

    const response = await client.responses.create({
      model,
      instructions: systemPrompt,
      input: messages,
      max_output_tokens: 1200
    });

    res.json({ reply: response.output_text || 'I did not get text back from the model.' });
  } catch (error) {
    console.error(error);
    const message = error?.message || 'Unknown server error';
    res.status(500).json({
      error: message,
      hint: 'Check your .env key, billing, model access, and terminal logs.'
    });
  }
});

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, model, hasKey: Boolean(process.env.OPENAI_API_KEY) });
});

app.listen(port, () => {
  console.log(`\nARC-ONE is awake locally: http://localhost:${port}`);
  console.log(`Model: ${model}\n`);
});
