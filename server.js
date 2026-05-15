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
// Use a widely available default. Override in hosting env with OPENAI_MODEL when needed.
const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
const promptPath = path.join(__dirname, 'system-prompt.md');
const systemPrompt = fs.existsSync(promptPath)
  ? fs.readFileSync(promptPath, 'utf8')
  : 'You are Little Spark Wireless, a warm practical builder assistant.';

if (!process.env.OPENAI_API_KEY) {
  console.warn('\n⚠️  Missing OPENAI_API_KEY. Add it in your local .env or hosting environment variables.\n');
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
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        error: 'Missing OPENAI_API_KEY on the server.',
        hint: 'Add OPENAI_API_KEY in your host environment variables, then redeploy.'
      });
    }

    const messages = cleanMessages(req.body?.messages);
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
    console.error('Chat API error:', error);
    const message = error?.message || 'Unknown server error';
    const status = error?.status || 500;

    res.status(status >= 400 && status < 600 ? status : 500).json({
      error: message,
      hint: 'Check OPENAI_API_KEY, billing, model access, and deployment logs.'
    });
  }
});

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, model, hasKey: Boolean(process.env.OPENAI_API_KEY) });
});

app.listen(port, () => {
  console.log(`\nLittle Spark Wireless is awake: http://localhost:${port}`);
  console.log(`Model: ${model}`);
  console.log(`OpenAI key loaded: ${Boolean(process.env.OPENAI_API_KEY)}\n`);
});
