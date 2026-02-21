import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle, Shield, Clock, Sparkles, ArrowRight, Heart } from 'lucide-react';
import './Landing.css';

const features = [
    {
        icon: <Clock size={28} />,
        title: 'Disponible 24/7',
        description: 'Habla cuando lo necesites. Sin citas, sin esperas. Apoyo abierto siempre.',
    },
    {
        icon: <Heart size={28} />,
        title: 'IA Empática',
        description: 'Entrenada con técnicas terapéuticas basadas en evidencia, incluyendo TCC y mindfulness.',
    },
    {
        icon: <Shield size={28} />,
        title: 'Privacidad Primero',
        description: 'Tus conversaciones se quedan en tu dispositivo. No almacenamos datos en servidores.',
    },
    {
        icon: <Sparkles size={28} />,
        title: 'Técnicas Inteligentes',
        description: 'Ejercicios de respiración guiados, escritura reflexiva y herramientas de reestructuración cognitiva.',
    },
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.12 },
    },
};

const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

function Landing() {
    const navigate = useNavigate();

    return (
        <motion.div
            className="page-wrapper landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            {/* Animated background */}
            <div className="landing__bg">
                <div className="landing__orb landing__orb--1" />
                <div className="landing__orb landing__orb--2" />
                <div className="landing__orb landing__orb--3" />
                <div className="landing__grid" />
            </div>

            {/* Hero */}
            <section className="landing__hero container">
                <motion.div
                    className="landing__hero-content"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                >
                    <div className="landing__badge">
                        <Sparkles size={14} />
                        Bienestar Mental con IA
                    </div>

                    <h1 className="landing__title">
                        Tu compañero de IA para el{' '}
                        <span className="gradient-text">bienestar mental</span>
                    </h1>

                    <p className="landing__subtitle">
                        Un espacio seguro y libre de juicios para explorar tus pensamientos y emociones.
                        Impulsado por IA avanzada con técnicas terapéuticas basadas en evidencia.
                    </p>

                    <div className="landing__cta-group">
                        <button
                            className="btn-primary"
                            onClick={() => navigate('/chat')}
                        >
                            Empezar a Hablar
                            <ArrowRight size={18} />
                        </button>
                        <button
                            className="btn-secondary"
                            onClick={() => navigate('/resources')}
                        >
                            <Heart size={18} />
                            Ver Recursos
                        </button>
                    </div>
                </motion.div>

                <motion.div
                    className="landing__hero-visual"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                >
                    <div className="landing__brain-visual">
                        <div className="landing__brain-ring landing__brain-ring--1" />
                        <div className="landing__brain-ring landing__brain-ring--2" />
                        <div className="landing__brain-ring landing__brain-ring--3" />
                        <div className="landing__brain-core">
                            <Heart size={40} className="landing__brain-icon" />
                        </div>
                        <div className="landing__particles">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="landing__particle" style={{
                                    '--angle': `${i * 45}deg`,
                                    '--delay': `${i * 0.4}s`,
                                }} />
                            ))}
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Features */}
            <section className="landing__features container">
                <motion.div
                    className="landing__features-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2>Cómo MindfulAI <span className="gradient-text">te ayuda</span></h2>
                    <p>Creado con cuidado, respaldado por la ciencia</p>
                </motion.div>

                <motion.div
                    className="landing__features-grid"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="glass-card landing__feature-card"
                            variants={item}
                        >
                            <div className="landing__feature-icon">
                                {feature.icon}
                            </div>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Disclaimer */}
            <section className="landing__disclaimer container">
                <motion.div
                    className="landing__disclaimer-card glass-card"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <Shield size={24} />
                    <div>
                        <strong>Aviso Importante</strong>
                        <p>
                            MindfulAI no sustituye la atención profesional de salud mental.
                            Si estás en crisis, contacta con los servicios de emergencia o una línea de crisis.
                        </p>
                    </div>
                </motion.div>
            </section>

            {/* Footer */}
            <footer className="landing__footer">
                <div className="container">
                    <p>Hecho con 💜 por el bienestar mental · MindfulAI &copy; {new Date().getFullYear()}</p>
                </div>
            </footer>
        </motion.div>
    );
}

export default Landing;
