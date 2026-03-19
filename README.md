<div align="center">

# 🚀 Satyam Singh — 3D Developer Portfolio

A premium, interactive 3D portfolio featuring a WebGL Command Center, AI-powered chatbot, dual-mode viewing, and production-grade architecture.

[![Live Demo](https://img.shields.io/badge/Live-Demo-818cf8?style=for-the-badge&logo=vercel&logoColor=white)](https://portfolio-of-satyam-singh.vercel.app)
[![GitHub Stars](https://img.shields.io/github/stars/Satyamsinghh76/Portfolio?style=for-the-badge&logo=github&color=818cf8)](https://github.com/Satyamsinghh76/Portfolio/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/Satyamsinghh76/Portfolio?style=for-the-badge&logo=github&color=a78bfa)](https://github.com/Satyamsinghh76/Portfolio/network/members)
[![License](https://img.shields.io/badge/License-MIT-34d399?style=for-the-badge)](LICENSE)

![Next.js](https://img.shields.io/badge/Next.js_14-000?style=flat-square&logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-000?style=flat-square&logo=threedotjs)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white)

</div>

---

## 🌐 Live Demo

**👉 [portfolio-of-satyam-singh.vercel.app](https://portfolio-of-satyam-singh.vercel.app)**

---

## 📝 Description

A full-stack, performance-optimized developer portfolio built with **Next.js 14**, **React Three Fiber**, and **Framer Motion**. It features an immersive 3D "Developer Command Center" hero section with interactive project objects, a Groq-powered AI chatbot that answers recruiter questions, and a dual-mode toggle that switches between a creative 3D experience and a clean recruiter-optimized view.

Built for developers who want their portfolio to demonstrate the same engineering quality as the projects it showcases.

---

## ✨ Key Features

- **🎮 3D Command Center** — Interactive WebGL scene with 5 clickable project objects, parallax mouse camera, holographic text, and ambient particle field
- **🤖 AI Chatbot** — Groq-powered assistant (Llama 3.3 70B) that answers questions about skills, projects, and experience like a professional recruiter assistant
- **🔄 Dual-Mode Toggle** — Switch between immersive Creative mode (3D) and clean Recruiter mode (digital resume) with smooth crossfade transitions
- **📋 Project Modals** — Click any 3D object or project card to open detailed modals with problem/solution narrative, tech stack, features, and live links
- **📬 Contact Form** — Web3Forms-powered email delivery with validation, loading states, and success feedback
- **📱 Adaptive Performance** — GPU tier detection auto-adjusts scene complexity; low-end devices get a CSS-only fallback with zero WebGL overhead
- **♿ Accessible** — ARIA attributes, keyboard navigation, focus management, escape-to-close, scroll lock on modals

---

## 🧠 Engineering Highlights

### Adaptive Rendering Pipeline
A custom `useDevicePerformance` hook probes GPU capabilities (via `WEBGL_debug_renderer_info`), CPU cores, device memory, and motion preferences at runtime. The 3D scene automatically degrades across three tiers — reducing geometry segments, light count, particle density, and disabling non-essential objects. Drei's `<PerformanceMonitor>` further drops quality if FPS falls below threshold mid-session.

### 3D ↔ React State Bridge
R3F's Canvas runs in a separate React reconciler, so standard Context doesn't bridge. A module-level pub/sub store (`scene-store.ts`) lets 3D objects trigger React state changes (opening modals) without Context threading. The `ModalProvider` subscribes to this store, unifying clicks from both 3D objects and HTML project cards into a single modal system.

### Code Splitting Architecture
The homepage ships **822 bytes** of page-specific JS. Both Creative and Recruiter views are `dynamic()` imports — Three.js, Framer Motion animations, and the chat widget only load when actually rendered. In Recruiter mode, the entire WebGL stack is never downloaded.

### Zero-Config Email Delivery
The contact form posts directly to Web3Forms' API — no SMTP server, no backend email route, no credentials to manage. Works on Vercel's serverless environment without any infrastructure.

---

## 🏗️ Tech Stack

| Layer | Technologies |
|---|---|
| **Framework** | Next.js 14 (App Router), React 18, TypeScript |
| **3D Engine** | Three.js, React Three Fiber, Drei |
| **Styling** | Tailwind CSS, CSS Variables, Framer Motion |
| **AI** | Groq SDK (Llama 3.3 70B), Next.js API Routes |
| **Email** | Web3Forms API |
| **Fonts** | Geist Sans & Geist Mono (local, zero network requests) |
| **Deployment** | Vercel (Edge Network, auto-deploy from GitHub) |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── api/chat/          # AI chatbot API route (Groq)
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Entry point → PageContent
│   └── globals.css         # Design tokens & utility classes
├── components/
│   ├── layout/             # Navbar, Footer
│   ├── sections/           # Hero, Projects, Skills, Contact, RecruiterView
│   ├── three/              # 3D scene system
│   │   ├── objects/        # Individual 3D objects (Laptop, Globe, Shield...)
│   │   ├── HeroScene.tsx   # Canvas compositor
│   │   ├── SceneLoader.tsx # Dynamic import + fallback + visibility gate
│   │   └── MouseCamera.tsx # Cursor-driven parallax
│   └── ui/                 # Modal, ChatWidget, ModeToggle, ContactForm...
├── constants/              # Projects data, recruiter data, system prompt
├── hooks/                  # useDevicePerformance
├── lib/                    # scene-store (3D↔React bridge), utils
└── types/                  # TypeScript interfaces
```

---

## ⚙️ Getting Started

### 📋 Prerequisites

- **Node.js** 18+
- **npm** 9+

### 🔧 Installation

```bash
# Clone the repository
git clone https://github.com/Satyamsinghh76/Portfolio.git
cd Portfolio

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys (see below)

# Start development server
npm run dev
```

Open **http://localhost:3000**

---

## 🔒 Environment Variables

Create a `.env.local` file in the project root:

```env
# AI Chatbot — get free key at https://console.groq.com/keys
GROQ_API_KEY=your_groq_api_key

# Contact Form — get free key at https://web3forms.com
NEXT_PUBLIC_WEB3FORMS_KEY=your_web3forms_access_key
```

| Variable | Required | Purpose |
|---|---|---|
| `GROQ_API_KEY` | For AI chat | Powers the chatbot (server-side only, never exposed) |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | For contact form | Sends emails via Web3Forms (public, safe to expose) |

> The portfolio works fully without these keys — only the AI chat and contact form require them.

---

## 📜 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |

---

## 🚀 Deployment

Deployed on **Vercel** with automatic deploys from the `main` branch.

```bash
# Manual deploy (if needed)
npm run build    # Verify build passes
git push         # Auto-deploys to Vercel
```

**To deploy your own:**
1. Fork this repo
2. Import to [vercel.com](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy — done

---

## 🔐 Architecture Decisions

| Decision | Rationale |
|---|---|
| **Module-level store over Context** | R3F Canvas uses a separate reconciler — Context doesn't bridge. A pub/sub store crosses the boundary cleanly |
| **Lazy everything** | Creative/Recruiter views, ChatWidget, and HeroScene are all `dynamic()` imports — only active code enters the runtime bundle |
| **CSS-only low-end fallback** | Devices without capable GPUs get ambient gradient glows instead of WebGL — zero JS, zero GPU, still looks intentional |
| **Web3Forms over Nodemailer** | No SMTP credentials needed, works on serverless, zero infrastructure — ideal for a portfolio |
| **Groq over OpenAI** | Free tier, faster inference, Llama 3.3 70B is more than capable for a portfolio assistant |

---

## 🧪 Future Improvements

- [ ] Blog section with MDX support
- [ ] Dark/light theme toggle
- [ ] Project detail pages (`/projects/[slug]`) with case study layouts
- [ ] Scroll-triggered animations with viewport-aware loading
- [ ] Analytics dashboard (Vercel Analytics / Plausible)

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

---

## 📩 Contact

| Channel | Link |
|---|---|
| **GitHub** | [github.com/Satyamsinghh76](https://github.com/Satyamsinghh76) |
| **LinkedIn** | [linkedin.com/in/satyam-singh-88988a279](https://www.linkedin.com/in/satyam-singh-88988a279) |
| **Email** | [satyamsinghlko48@gmail.com](mailto:satyamsinghlko48@gmail.com) |
| **Portfolio** | [portfolio-of-satyam-singh.vercel.app](https://portfolio-of-satyam-singh.vercel.app) |

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with 💜 by [Satyam Singh](https://github.com/Satyamsinghh76)**

If this project helped or inspired you, consider giving it a ⭐

</div>
