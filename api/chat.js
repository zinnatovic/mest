module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { messages, systemPrompt } = req.body;

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + process.env.GROQ_API_KEY,
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ]
    })
  });

  const data = await response.json();
  if (data.error) {
    res.json({ reply: 'Hata: ' + data.error.message });
    return;
  }
  const reply = data.choices?.[0]?.message?.content || 'Yanıt alınamadı.';
  res.json({ reply });
}
