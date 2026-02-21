import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';
import './BreathingExercise.css';

const PHASES = [
    { name: 'Inhala', duration: 4, instruction: 'Respira lentamente...', scale: 1.5 },
    { name: 'Mantén', duration: 4, instruction: 'Mantén el aire...', scale: 1.5 },
    { name: 'Exhala', duration: 4, instruction: 'Suelta el aire lentamente...', scale: 1 },
    { name: 'Descansa', duration: 2, instruction: 'Descansa...', scale: 1 },
];

function BreathingExercise() {
    const [isActive, setIsActive] = useState(false);
    const [phaseIndex, setPhaseIndex] = useState(0);
    const [countdown, setCountdown] = useState(PHASES[0].duration);
    const [cycles, setCycles] = useState(0);
    const intervalRef = useRef(null);

    const phase = PHASES[phaseIndex];

    useEffect(() => {
        if (!isActive) return;

        intervalRef.current = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    setPhaseIndex((prevPhase) => {
                        const nextPhase = (prevPhase + 1) % PHASES.length;
                        if (nextPhase === 0) setCycles((c) => c + 1);
                        return nextPhase;
                    });
                    return PHASES[(phaseIndex + 1) % PHASES.length].duration;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(intervalRef.current);
    }, [isActive, phaseIndex]);

    const handleReset = () => {
        setIsActive(false);
        setPhaseIndex(0);
        setCountdown(PHASES[0].duration);
        setCycles(0);
        clearInterval(intervalRef.current);
    };

    return (
        <div className="breathing">
            <div className="breathing__visual">
                <motion.div
                    className="breathing__circle breathing__circle--outer"
                    animate={{
                        scale: isActive ? phase.scale : 1,
                        opacity: isActive ? [0.3, 0.6, 0.3] : 0.3,
                    }}
                    transition={{
                        scale: { duration: phase.duration, ease: 'easeInOut' },
                        opacity: { duration: phase.duration, ease: 'easeInOut' },
                    }}
                />
                <motion.div
                    className="breathing__circle breathing__circle--middle"
                    animate={{
                        scale: isActive ? phase.scale * 0.95 : 1,
                    }}
                    transition={{ duration: phase.duration, ease: 'easeInOut' }}
                />
                <motion.div
                    className="breathing__circle breathing__circle--inner"
                    animate={{
                        scale: isActive ? phase.scale * 0.9 : 1,
                    }}
                    transition={{ duration: phase.duration, ease: 'easeInOut' }}
                />
                <div className="breathing__center">
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={phase.name}
                            className="breathing__phase-name"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2 }}
                        >
                            {isActive ? phase.name : 'Listo'}
                        </motion.span>
                    </AnimatePresence>
                    <span className="breathing__countdown">
                        {isActive ? countdown : '—'}
                    </span>
                </div>
            </div>

            <p className="breathing__instruction">
                {isActive ? phase.instruction : 'Pulsa play para comenzar un ciclo de respiración 4-4-4-2'}
            </p>

            <div className="breathing__controls">
                <button
                    className="btn-primary breathing__play-btn"
                    onClick={() => setIsActive(!isActive)}
                >
                    {isActive ? <Pause size={20} /> : <Play size={20} />}
                    {isActive ? 'Pausar' : 'Empezar'}
                </button>
                {(isActive || cycles > 0) && (
                    <button className="btn-secondary breathing__reset-btn" onClick={handleReset}>
                        <RotateCcw size={18} />
                    </button>
                )}
            </div>

            {cycles > 0 && (
                <p className="breathing__cycles">
                    {cycles} ciclo{cycles !== 1 ? 's' : ''} completado{cycles !== 1 ? 's' : ''} ✨
                </p>
            )}
        </div>
    );
}

export default BreathingExercise;
