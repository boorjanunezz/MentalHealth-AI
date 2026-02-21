import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send, Sparkles, Key, X, Trash2, AlertTriangle, Bot, User, ArrowLeft } from 'lucide-react';
import { sendMessage, getApiKey, saveApiKey, removeApiKey, isInitialized, initializeGemini, resetChat } from '../services/gemini';
import './Chat.css';

const QUICK_PROMPTS = [
    "Me siento ansioso/a hoy",
    "Ayúdame con un ejercicio de respiración",
    "No puedo dejar de pensar demasiado",
    "Necesito motivación para el día",
    "Ayúdame a practicar la gratitud",
    "Tengo problemas para dormir",
];

const WELCOME_MESSAGE = {
    role: 'ai',
    text: `Hola 💙 Soy MindfulAI, tu compañero de bienestar mental.

Estoy aquí para escucharte, apoyarte y compartir técnicas útiles cuando las necesites. Ya sea que te sientas estresado/a, ansioso/a, o simplemente necesites hablar con alguien — aquí estoy.

**¿Cómo puedo ayudarte hoy?** Puedes escribir libremente o probar uno de los temas rápidos de abajo.

_Recuerda: No soy terapeuta. Si estás en crisis, busca ayuda profesional o llama a una línea de crisis._`,
};

function Chat() {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([WELCOME_MESSAGE]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showApiModal, setShowApiModal] = useState(false);
    const [apiKeyInput, setApiKeyInput] = useState('');
    const [apiError, setApiError] = useState('');
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        const savedKey = getApiKey();
        if (savedKey) {
            initializeGemini(savedKey);
        }
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async (text) => {
        const messageText = text || input.trim();
        if (!messageText || isLoading) return;

        if (!isInitialized()) {
            setShowApiModal(true);
            return;
        }

        setInput('');
        setMessages((prev) => [...prev, { role: 'user', text: messageText }]);
        setIsLoading(true);

        const result = await sendMessage(messageText);

        setMessages((prev) => [
            ...prev,
            { role: 'ai', text: result.text },
        ]);
        setIsLoading(false);

        if (result.error === 'INVALID_KEY') {
            removeApiKey();
            setShowApiModal(true);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleSaveKey = () => {
        const key = apiKeyInput.trim();
        if (!key) {
            setApiError('Por favor introduce tu API key');
            return;
        }
        saveApiKey(key);
        setShowApiModal(false);
        setApiKeyInput('');
        setApiError('');
    };

    const handleClearChat = () => {
        setMessages([WELCOME_MESSAGE]);
        resetChat();
    };

    const renderMarkdown = (text) => {
        let html = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/_(.*?)_/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code>$1</code>')
            .replace(/\n/g, '<br/>');
        return { __html: html };
    };

    return (
        <motion.div
            className="page-wrapper chat-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            {/* Chat Header */}
            <div className="chat-page__header">
                <div className="container chat-page__header-inner">
                    <div className="chat-page__header-info">
                        <button className="chat-page__back-btn" onClick={() => navigate('/')} title="Volver al Inicio">
                            <ArrowLeft size={20} />
                        </button>
                        <div className="chat-page__avatar">
                            <Bot size={20} />
                            <span className="chat-page__status-dot" />
                        </div>
                        <div>
                            <h1>MindfulAI</h1>
                            <span className="chat-page__status">
                                {isLoading ? 'Pensando...' : 'En línea · Listo para ayudar'}
                            </span>
                        </div>
                    </div>
                    <div className="chat-page__actions">
                        <button
                            className="chat-page__action-btn"
                            onClick={() => setShowApiModal(true)}
                            title="Configurar API Key"
                        >
                            <Key size={18} />
                        </button>
                        <button
                            className="chat-page__action-btn"
                            onClick={handleClearChat}
                            title="Limpiar Chat"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="chat-page__messages">
                <div className="container chat-page__messages-inner">
                    {messages.map((msg, i) => (
                        <motion.div
                            key={i}
                            className={`chat-bubble chat-bubble--${msg.role}`}
                            initial={{ opacity: 0, y: 16, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="chat-bubble__avatar">
                                {msg.role === 'ai' ? <Bot size={18} /> : <User size={18} />}
                            </div>
                            <div
                                className="chat-bubble__content"
                                dangerouslySetInnerHTML={renderMarkdown(msg.text)}
                            />
                        </motion.div>
                    ))}

                    {isLoading && (
                        <motion.div
                            className="chat-bubble chat-bubble--ai"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className="chat-bubble__avatar">
                                <Bot size={18} />
                            </div>
                            <div className="chat-bubble__typing">
                                <span /><span /><span />
                            </div>
                        </motion.div>
                    )}

                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Quick Prompts */}
            {messages.length <= 1 && (
                <div className="chat-page__prompts container">
                    {QUICK_PROMPTS.map((prompt, i) => (
                        <button
                            key={i}
                            className="chat-page__prompt-btn"
                            onClick={() => handleSend(prompt)}
                        >
                            <Sparkles size={14} />
                            {prompt}
                        </button>
                    ))}
                </div>
            )}

            {/* Input */}
            <div className="chat-page__input-wrapper">
                <div className="container chat-page__input-inner">
                    <div className="chat-page__input-box">
                        <textarea
                            ref={inputRef}
                            className="chat-page__input"
                            placeholder="Escribe tu mensaje..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            rows={1}
                            disabled={isLoading}
                        />
                        <button
                            className="chat-page__send-btn"
                            onClick={() => handleSend()}
                            disabled={!input.trim() || isLoading}
                        >
                            <Send size={18} />
                        </button>
                    </div>
                    <p className="chat-page__disclaimer">
                        MindfulAI no sustituye la atención profesional de salud mental.
                    </p>
                </div>
            </div>

            {/* API Key Modal */}
            {showApiModal && (
                <div className="modal-overlay" onClick={() => setShowApiModal(false)}>
                    <motion.div
                        className="modal glass-card"
                        onClick={(e) => e.stopPropagation()}
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        <button
                            className="modal__close"
                            onClick={() => setShowApiModal(false)}
                        >
                            <X size={20} />
                        </button>

                        <div className="modal__icon">
                            <Key size={28} />
                        </div>

                        <h2>Conecta tu IA</h2>
                        <p className="modal__description">
                            Introduce tu token de Hugging Face para empezar a chatear.
                            Consigue uno gratis en{' '}
                            <a
                                href="https://huggingface.co/settings/tokens"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                huggingface.co/settings/tokens
                            </a>
                        </p>

                        {apiError && (
                            <div className="modal__error">
                                <AlertTriangle size={16} />
                                {apiError}
                            </div>
                        )}

                        <input
                            type="password"
                            className="modal__input"
                            placeholder="hf_..."
                            value={apiKeyInput}
                            onChange={(e) => setApiKeyInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSaveKey()}
                        />

                        <button className="btn-primary modal__submit" onClick={handleSaveKey}>
                            Guardar y Empezar a Chatear
                        </button>

                        <p className="modal__security">
                            🔒 Tu token se guarda localmente en tu navegador. Nunca se envía a nuestros servidores.
                        </p>
                    </motion.div>
                </div>
            )}
        </motion.div>
    );
}

export default Chat;
