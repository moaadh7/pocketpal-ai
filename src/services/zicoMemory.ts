const ZICO_SERVER = 'http://127.0.0.1:8765';

export async function searchZicoMemory(
  query: string,
  token: string,
): Promise<string> {
  if (!query.trim() || !token.trim()) {
    return '';
  }

  try {
    const response = await fetch(`${ZICO_SERVER}/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query: query.trim() }),
    });

    if (!response.ok) {
      return '';
    }

    const data = await response.json();

    return typeof data.context === 'string'
      ? data.context
      : '';
  } catch {
    // Memory server is offline: continue chatting normally.
    return '';
  }
}
