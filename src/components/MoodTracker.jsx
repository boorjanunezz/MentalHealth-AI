import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './MoodTracker.css';

const MOODS = [
    { emoji: '😢', label: 'Terrible', value: 1, color: '#EF4444' },
    { emoji: '😕', label: 'Mal', value: 2, color: '#F97316' },
    { emoji: '😐', label: 'Normal', value: 3, color: '#EAB308' },
    { emoji: '🙂', label: 'Bien', value: 4, color: '#22C55E' },
    { emoji: '😄', label: 'Genial', value: 5, color: '#6C63FF' },
];

function MoodTracker() {
    const [selectedMood, setSelectedMood] = useState(null);
    const [moodHistory, setMoodHistory] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('mindfulai_moods');
        if (saved) {
            setMoodHistory(JSON.parse(saved));
        }
    }, []);

    const handleMoodSelect = (mood) => {
        setSelectedMood(mood);
        const entry = {
            ...mood,
            timestamp: new Date().toISOString(),
        };
        const updated = [...moodHistory, entry].slice(-30);
        setMoodHistory(updated);
        localStorage.setItem('mindfulai_moods', JSON.stringify(updated));
        setShowConfirm(true);
        setTimeout(() => setShowConfirm(false), 2500);
    };

    const last7 = moodHistory.slice(-7);

    return (
        <div className="mood-tracker">
            <div className="mood-tracker__selector">
                {MOODS.map((mood) => (
                    <motion.button
                        key={mood.value}
                        className={`mood-tracker__mood ${selectedMood?.value === mood.value ? 'mood-tracker__mood--selected' : ''}`}
                        onClick={() => handleMoodSelect(mood)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        style={{ '--mood-color': mood.color }}
                    >
                        <span className="mood-tracker__emoji">{mood.emoji}</span>
                        <span className="mood-tracker__label">{mood.label}</span>
                    </motion.button>
                ))}
            </div>

            <AnimatePresence>
                {showConfirm && (
                    <motion.div
                        className="mood-tracker__confirm"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        ¡Estado de ánimo registrado! Gracias por cuidarte 💙
                    </motion.div>
                )}
            </AnimatePresence>

            {last7.length > 0 && (
                <div className="mood-tracker__history">
                    <h4>Últimos registros de ánimo</h4>
                    <div className="mood-tracker__chart">
                        {last7.map((entry, i) => (
                            <div key={i} className="mood-tracker__bar-wrap">
                                <motion.div
                                    className="mood-tracker__bar"
                                    style={{
                                        height: `${entry.value * 20}%`,
                                        background: entry.color,
                                    }}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${entry.value * 20}%` }}
                                    transition={{ duration: 0.5, delay: i * 0.05 }}
                                />
                                <span className="mood-tracker__bar-emoji">{entry.emoji}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default MoodTracker;
