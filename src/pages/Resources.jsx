import { motion } from 'framer-motion';
import { Phone, Globe, MessageSquare, Heart, ExternalLink, AlertTriangle, BookOpen, Smile } from 'lucide-react';
import BreathingExercise from '../components/BreathingExercise';
import MoodTracker from '../components/MoodTracker';
import './Resources.css';

const crisisLines = [
    {
        name: 'Teléfono de la Esperanza',
        region: 'España',
        contact: '717 003 717',
        type: 'call',
        description: 'Línea de atención a la conducta suicida 24h',
    },
    {
        name: 'Teléfono de la Esperanza',
        region: 'España',
        contact: '024',
        type: 'call',
        description: 'Línea de atención a la conducta suicida (número corto)',
    },
    {
        name: 'Suicide & Crisis Lifeline',
        region: 'Estados Unidos',
        contact: '988',
        type: 'call',
        description: 'Apoyo gratuito 24/7 para personas en crisis',
    },
    {
        name: 'Crisis Text Line',
        region: 'Estados Unidos',
        contact: 'Envía HOME al 741741',
        type: 'text',
        description: 'Apoyo de crisis gratuito por mensaje de texto 24/7',
    },
    {
        name: 'Samaritans',
        region: 'Reino Unido',
        contact: '116 123',
        type: 'call',
        description: 'Apoyo emocional gratuito las 24 horas',
    },
    {
        name: 'Servicios de Emergencia',
        region: 'Internacional',
        contact: '112 / 911',
        type: 'call',
        description: 'Para emergencias que ponen en riesgo la vida',
    },
];

const tips = [
    {
        icon: <Smile size={24} />,
        title: 'Practica la Gratitud',
        content: 'Escribe 3 cosas por las que estás agradecido/a cada mañana. La gratitud redirige tu atención hacia lo positivo.',
    },
    {
        icon: <BookOpen size={24} />,
        title: 'Escribe un Diario',
        content: 'Dedica 10 minutos a escribir libremente sobre tus sentimientos. No juzgues — deja que las palabras fluyan.',
    },
    {
        icon: <Heart size={24} />,
        title: 'Mueve tu Cuerpo',
        content: 'Incluso 15 minutos caminando pueden reducir la ansiedad y mejorar tu estado de ánimo. El movimiento libera endorfinas.',
    },
    {
        icon: <MessageSquare size={24} />,
        title: 'Conecta con Alguien',
        content: 'Habla con un amigo o familiar. La conexión humana es una de las herramientas más poderosas para el bienestar.',
    },
];

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function Resources() {
    return (
        <motion.div
            className="page-wrapper resources"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            {/* Header */}
            <section className="resources__header">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1>
                            <span className="gradient-text">Recursos</span> de Salud Mental
                        </h1>
                        <p>Herramientas, técnicas y apoyo para tu camino hacia el bienestar</p>
                    </motion.div>
                </div>
            </section>

            {/* Mood Tracker */}
            <section className="resources__section container">
                <h2>
                    <Smile size={24} />
                    ¿Cómo te sientes?
                </h2>
                <MoodTracker />
            </section>

            {/* Breathing Exercise */}
            <section className="resources__section container">
                <h2>
                    <Heart size={24} />
                    Ejercicio de Respiración
                </h2>
                <p className="resources__section-desc">
                    La técnica de respiración 4-4-4-2 puede ayudar a calmar tu sistema nervioso y reducir la ansiedad.
                </p>
                <div className="glass-card resources__breathing-card">
                    <BreathingExercise />
                </div>
            </section>

            {/* Tips */}
            <section className="resources__section container">
                <h2>
                    <BookOpen size={24} />
                    Consejos de Bienestar
                </h2>
                <motion.div
                    className="resources__tips-grid"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                >
                    {tips.map((tip, index) => (
                        <motion.div key={index} className="glass-card resources__tip-card" variants={item}>
                            <div className="resources__tip-icon">{tip.icon}</div>
                            <h3>{tip.title}</h3>
                            <p>{tip.content}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Crisis Lines */}
            <section className="resources__section container">
                <h2>
                    <AlertTriangle size={24} />
                    Apoyo en Crisis
                </h2>
                <p className="resources__section-desc">
                    Si tú o alguien que conoces está en crisis, por favor busca ayuda. Hay apoyo disponible 24/7.
                </p>
                <motion.div
                    className="resources__crisis-grid"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                >
                    {crisisLines.map((line, index) => (
                        <motion.div key={index} className="glass-card resources__crisis-card" variants={item}>
                            <div className="resources__crisis-header">
                                <div className="resources__crisis-icon">
                                    {line.type === 'call' ? <Phone size={18} /> : <MessageSquare size={18} />}
                                </div>
                                <span className="resources__crisis-region">
                                    <Globe size={12} />
                                    {line.region}
                                </span>
                            </div>
                            <h3>{line.name}</h3>
                            <p className="resources__crisis-contact">{line.contact}</p>
                            <p className="resources__crisis-desc">{line.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* External Resources */}
            <section className="resources__section container">
                <h2>
                    <ExternalLink size={24} />
                    Saber Más
                </h2>
                <div className="resources__links">
                    <a href="https://www.who.int/es/health-topics/mental-health" target="_blank" rel="noopener noreferrer" className="glass-card resources__link">
                        <strong>OMS</strong>
                        <span>Recursos e información sobre salud mental</span>
                        <ExternalLink size={16} />
                    </a>
                    <a href="https://www.consaludmental.org/" target="_blank" rel="noopener noreferrer" className="glass-card resources__link">
                        <strong>Confederación Salud Mental</strong>
                        <span>Confederación Salud Mental España</span>
                        <ExternalLink size={16} />
                    </a>
                    <a href="https://www.iasp.info/resources/Crisis_Centres/" target="_blank" rel="noopener noreferrer" className="glass-card resources__link">
                        <strong>IASP</strong>
                        <span>Directorio internacional de centros de crisis</span>
                        <ExternalLink size={16} />
                    </a>
                </div>
            </section>

            {/* Footer */}
            <footer className="resources__footer">
                <div className="container">
                    <p>Hecho con 💜 por el bienestar mental · MindfulAI &copy; {new Date().getFullYear()}</p>
                </div>
            </footer>
        </motion.div>
    );
}

export default Resources;
