export default async function getCuriosity() {
  try {
    const response = await fetch('/api/generateCuriosity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar a curiosidade: ' + response.statusText);
    }

    const data = await response.json();

    return data.curiosity;
  } catch (error) {
    console.error('Erro:', error);
    return null;
  }
}
