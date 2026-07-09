export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { messages, systemPrompt } = req.body;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      system: systemPrompt,
      messages
    })
  });

  const data = await response.json();
  res.json({ reply: data.content[0].text });
}
