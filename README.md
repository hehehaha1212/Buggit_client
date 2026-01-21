# BUGGIT 

A cyberpunk-themed bug bounty challenge platform built with React, TypeScript, and Tailwind CSS.

##  About

BUGGIT is an interactive bug bounty challenge platform featuring a hacker/terminal aesthetic. Users progress through 6 difficulty levels, solving security challenges and earning points.

##  Features

- **Difficulty Levels** - From Beginner to Expert
- **Progress Tracking** - Local storage persistence for solved challenges
- **Point System** - Earn points for each solved challenge
- **Hint System** - Optional hints with point penalties
- **Terminal UI** - Immersive hacker aesthetic with neon glow effects
- **Responsive Design** - Works on desktop and mobile

##  Getting Started

### Prerequisites

- Node.js 18+ 
- npm or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/buggit.git

# Navigate to project directory
cd buggit

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## 🛠️ Tech Stack

- **Framework:** React 18
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Routing:** React Router DOM
- **Font:** JetBrains Mono
- **Build Tool:** Vite

##  Project Structure

```
src/
├── components/
│   ├── ui/          # shadcn/ui components
│   ├── Layout.tsx   # Main layout wrapper
│   ├── Navbar.tsx   # Navigation bar
│   └── TerminalCard.tsx
├── data/
│   └── levels.ts    # Challenge data
├── hooks/
│   └── useProgress.ts
├── pages/
│   ├── Index.tsx    # Home page
│   ├── Levels.tsx   # All levels overview
│   ├── Level.tsx    # Single level view
│   └── Question.tsx # Challenge page
└── index.css        # Global styles & design tokens
```

##  Customization

### Adding New Challenges

Edit `src/data/levels.ts` to add or modify challenges:


### Theming

Modify design tokens in `src/index.css` to customize colors and effects.

##  License

MIT License - feel free to use this for your own events!

##  Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with 💚
