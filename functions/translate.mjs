export async function handler(event, context) {
    try {
        const { text, sourceLang, targetLang } = JSON.parse(event.body);
        const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;

        // Dynamically import node-fetch
        const fetch = (await import('node-fetch')).default;

        const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}&q=${encodeURIComponent(text)}&source=${sourceLang}&target=${targetLang}`;

        const response = await fetch(url, { method: 'POST' });

        if (!response.ok) {
            throw new Error('Failed to fetch translation');
        }

        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify({ translatedText: data.data.translations[0].translatedText }),
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message || 'Failed to fetch translation' }),
        };
    }
}
