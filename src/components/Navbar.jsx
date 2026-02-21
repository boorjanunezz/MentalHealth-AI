import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Brain, MessageCircle, Heart, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileOpen(false);
    }, [location]);

    return (
        <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
            <div className="navbar__inner container">
                <NavLink to="/" className="navbar__logo">
                    <div className="navbar__logo-icon">
                        <Brain size={24} />
                    </div>
                    <span className="navbar__logo-text">
                        Mindful<span className="gradient-text">AI</span>
                    </span>
                </NavLink>

                <div className="navbar__links">
                    <NavLink to="/" className="navbar__link" end>
                        Inicio
                    </NavLink>
                    <NavLink to="/chat" className="navbar__link">
                        <MessageCircle size={16} />
                        Chat
                    </NavLink>
                    <NavLink to="/resources" className="navbar__link">
                        <Heart size={16} />
                        Recursos
                    </NavLink>
                </div>

                <button
                    className="navbar__mobile-toggle"
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                    aria-label="Toggle menu"
                >
                    {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        className="navbar__mobile-menu"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        <NavLink to="/" className="navbar__mobile-link" end>
                            Inicio
                        </NavLink>
                        <NavLink to="/chat" className="navbar__mobile-link">
                            <MessageCircle size={16} />
                            Chat
                        </NavLink>
                        <NavLink to="/resources" className="navbar__mobile-link">
                            <Heart size={16} />
                            Recursos
                        </NavLink>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

export default Navbar;
