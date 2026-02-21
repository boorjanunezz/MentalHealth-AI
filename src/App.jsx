import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Chat from './pages/Chat';
import Resources from './pages/Resources';

function App() {
    const location = useLocation();
    const isChatPage = location.pathname === '/chat';

    return (
        <>
            {!isChatPage && <Navbar />}
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<Landing />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/resources" element={<Resources />} />
                </Routes>
            </AnimatePresence>
        </>
    );
}

export default App;
