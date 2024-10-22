import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST() {
  try {
    const prompt =
      'Compartilhe uma curiosidade interessante, de forma afirmativa, com cerca de 30 palavras.';

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 1.0,
      max_tokens: 100,
    });

    const curiosity = response.choices[0].message.content;

    return new Response(JSON.stringify({ curiosity }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error calling the api:', error);
    return new Response(JSON.stringify({ error: 'Error processing request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
