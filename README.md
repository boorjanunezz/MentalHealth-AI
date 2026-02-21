# MindfulAI — Compañero de Bienestar Mental con IA

<div align="center">

![MindfulAI](https://img.shields.io/badge/MindfulAI-Salud_Mental-6C63FF?style=for-the-badge&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![HuggingFace](https://img.shields.io/badge/HuggingFace-Qwen2.5-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black)

**Una aplicación web de apoyo emocional impulsada por IA.**

[🚀 Demo en vivo](https://boorjanunezz.github.io/MentalHealth-AI/) · [✨ Funcionalidades](#-funcionalidades) · [⚙️ Instalación](#️-instalación)

</div>

---

## 💡 Por qué hice esto

Quería construir algo con impacto real, no solo otro CRUD. La salud mental me parece un tema importante y poco representado en el mundo tech. Este proyecto une dos cosas que me interesan: las interfaces de usuario bien cuidadas y los modelos de lenguaje grandes.

Además, quería explorar cómo integrar la API de HuggingFace Inference con una SPA en React, gestionar el historial de conversación en el cliente y construir una experiencia que se sintiera cercana, no robótica.

---

## ✨ Funcionalidades

### 💬 Chat con IA
- Conversación empática con **Qwen 2.5 72B** a través de la HuggingFace Inference API
- Prompt de sistema orientado a técnicas de TCC y mindfulness
- Detección de crisis con recursos de emergencia (024, 112)
- Historial de conversación en memoria durante la sesión

### 🫁 Ejercicio de Respiración
- Técnica de respiración cuadrada (4-4-4-2) con animación guiada
- Contador de ciclos para hacer seguimiento de la práctica

### 😊 Registro de Estado de Ánimo
- Registro diario basado en emojis
- Persistencia en `localStorage` — los datos nunca salen de tu dispositivo
- Gráfico visual de la evolución del ánimo

### 🆘 Recursos de Crisis
- Líneas de atención a la conducta suicida (España y Europa)
- Enlaces a organizaciones de salud mental

---

## ⚙️ Instalación

### Requisitos
- [Node.js](https://nodejs.org/) v18+
- Un token de [HuggingFace](https://huggingface.co/settings/tokens) (gratuito)

### Pasos

```bash
git clone https://github.com/boorjanunezz/MentalHealth-AI.git
cd MentalHealth-AI
npm install
npm run dev
```

Abre `http://localhost:5173` e introduce tu token de HuggingFace cuando te lo pida la aplicación.

---

## 🏗️ Stack tecnológico

| Tecnología | Para qué la usé |
|---|---|
| [React 19](https://react.dev) | Framework de UI |
| [Vite 6](https://vite.dev) | Build tool y servidor de desarrollo |
| [HuggingFace Inference API](https://huggingface.co/docs/api-inference) | Modelo de lenguaje (Qwen 2.5 72B) |
| [Framer Motion](https://www.framer.com/motion/) | Animaciones y transiciones |
| [Lucide React](https://lucide.dev) | Iconos |
| [React Router v7](https://reactrouter.com) | Enrutado en el cliente |

---

## 📁 Estructura

```
src/
├── components/
│   ├── Navbar.jsx              # Barra de navegación responsive
│   ├── BreathingExercise.jsx   # Componente de respiración guiada
│   └── MoodTracker.jsx         # Widget de seguimiento de ánimo
├── pages/
│   ├── Landing.jsx             # Página principal
│   ├── Chat.jsx                # Interfaz del chat con IA
│   └── Resources.jsx           # Recursos y líneas de crisis
├── services/
│   └── gemini.js               # Integración con HuggingFace API
├── App.jsx                     # Componente raíz con enrutado
└── index.css                   # Sistema de diseño global
```

---

## ⚠️ Aviso

> MindfulAI **no sustituye** la atención profesional de salud mental. Es una herramienta de apoyo. Si estás en crisis, llama al **024** (España) o al **112**.

---

## 🔒 Privacidad

- El token de HuggingFace se guarda únicamente en el `localStorage` del navegador
- Las conversaciones se procesan a través de la API de HuggingFace — sin servidores propios
- Los datos de seguimiento de ánimo permanecen en tu dispositivo

---

## 📄 Licencia

[MIT License](LICENSE) — Copyright © 2026 Borja Nuñez
