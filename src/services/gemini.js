const SYSTEM_PROMPT = `Eres MindfulAI, un compañero de apoyo emocional compasivo y empático. NO eres terapeuta ni profesional médico, y debes dejarlo claro cuando sea apropiado. Responde SIEMPRE en español.

Tus principios fundamentales:
1. **Empatía primero**: Siempre valida los sentimientos del usuario antes de ofrecer sugerencias. Usa técnicas de escucha activa.
2. **Técnicas basadas en evidencia**: Cuando sea apropiado, sugiere técnicas de:
   - Terapia Cognitivo-Conductual (TCC): Desafiar patrones de pensamiento negativos
   - Mindfulness y Meditación: Ejercicios de anclaje, escaneo corporal
   - Ejercicios de respiración: Respiración cuadrada, técnica 4-7-8
   - Escritura reflexiva para autoconocimiento
3. **Seguridad**: Si el usuario expresa ideas suicidas, autolesiones o crisis:
   - Tómalo en serio y responde con cuidado
   - Proporciona recursos de emergencia:
     • Emergencias: 112 (España/EU)
     • Línea de atención a la conducta suicida: 024 (España)
     • Teléfono de la Esperanza: 717 003 717
   - Recomienda encarecidamente buscar ayuda profesional
4. **Límites**: Nunca diagnostiques condiciones, recetes medicación ni sustituyas la atención profesional de salud mental.
5. **Tono**: Cálido, conversacional, sin juicios. Usa un lenguaje amable. Evita ser condescendiente.
6. **Personalización**: Recuerda el contexto de la conversación para dar continuidad y demostrar que realmente escuchas.

Directrices de respuesta:
- Responde siempre en español
- Mantén las respuestas concisas pero significativas (2-4 párrafos normalmente)
- Usa emojis con moderación y de forma natural 💙
- Haz preguntas de seguimiento para profundizar la conversación
- Celebra el progreso y el esfuerzo, sin importar lo pequeño que sea
- Cuando sugieras ejercicios, da instrucciones claras paso a paso`;

const HF_API_URL = '/api/hf/v1/chat/completions';

let apiToken = null;
let conversationHistory = [];

export function initializeGemini(token) {
    apiToken = token;
    conversationHistory = [];
}

export function isInitialized() {
    return apiToken !== null;
}

export async function sendMessage(message) {
    if (!apiToken) throw new Error('API no inicializada');

    conversationHistory.push({ role: 'user', content: message });

    try {
        const response = await fetch(HF_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'Qwen/Qwen2.5-72B-Instruct',
                messages: [
                    { role: 'system', content: SYSTEM_PROMPT },
                    ...conversationHistory,
                ],
                max_tokens: 1024,
                temperature: 0.85,
                top_p: 0.95,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            let errorMsg = '';
            if (typeof errorData.error === 'string') {
                errorMsg = errorData.error;
            } else if (errorData.error?.message) {
                errorMsg = errorData.error.message;
            } else {
                errorMsg = JSON.stringify(errorData) || `Error ${response.status}`;
            }
            throw new Error(errorMsg);
        }

        const data = await response.json();
        const assistantMessage = data.choices[0].message.content;

        conversationHistory.push({ role: 'assistant', content: assistantMessage });

        return {
            success: true,
            text: assistantMessage,
        };
    } catch (error) {
        console.error('AI API error:', error);
        const msg = error.message || '';

        // Remove last user message on error so they can retry
        conversationHistory.pop();

        if (msg.includes('401') || msg.includes('Unauthorized') || msg.includes('Invalid credentials')) {
            return {
                success: false,
                text: 'Token inválido. Por favor revisa tu token de Hugging Face e inténtalo de nuevo.',
                error: 'INVALID_KEY',
            };
        }

        if (msg.includes('429') || msg.includes('Too Many Requests') || msg.includes('rate')) {
            return {
                success: false,
                text: 'Demasiadas peticiones. Espera un momento e inténtalo de nuevo.',
                error: 'RATE_LIMIT',
            };
        }

        if (msg.includes('503') || msg.includes('loading') || msg.includes('Model')) {
            return {
                success: false,
                text: 'El modelo se está cargando, puede tardar unos segundos. Inténtalo de nuevo en 20 segundos.',
                error: 'MODEL_LOADING',
            };
        }

        return {
            success: false,
            text: `Error: ${msg}. Por favor inténtalo de nuevo.`,
            error: 'UNKNOWN',
        };
    }
}

export function resetChat() {
    conversationHistory = [];
}

export function getApiKey() {
    return localStorage.getItem('mindfulai_api_key');
}

export function saveApiKey(key) {
    localStorage.setItem('mindfulai_api_key', key);
    initializeGemini(key);
}

export function removeApiKey() {
    localStorage.removeItem('mindfulai_api_key');
    apiToken = null;
    conversationHistory = [];
}
