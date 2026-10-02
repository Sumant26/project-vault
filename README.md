# ⚡ Project Vault

> **A cozy, comforting, multi-mode project showcase hub and launcher for all your Vercel-deployed web applications.**

![Project Vault Banner](https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80)

---

## 🌟 Highlights

- **3 Dynamic View Modes in One UI:**
  - ▦ **Launchpad View:** High-density, fast-scanning grid of tiles with single-click Vercel launcher actions and live status lights.
  - ◫ **Interactive Viewport View:** Split-screen mode with an embedded live sandbox that runs your deployed Vercel webapps directly in-page across **Desktop (1440px)**, **Tablet (768px)**, and **Mobile (375px)** simulated device frames.
  - 🎴 **Showcase Deck View:** Rich visual cards featuring gradients, tech badges, architectural highlights, and quick preview modals.
- **Cozy & Warm Aesthetic:**
  - Soft ambient radial glows, warm espresso/slate tones, frosted glassmorphism, fluid micro-interactions, and a theme switcher (*Warm Dusk*, *Cozy Espresso*, *Deep Forest*).
- **Dynamic Project Addition & Management:**
  - Add new projects directly in the UI with instant live card preview, category selection, tag chip builder, and gradient picker.
  - State is persisted in `localStorage` and can be exported as a fresh `projects.json` for Git commits.
- **Keyboard-First Controls:**
  - Press `1`, `2`, `3` to switch view modes.
  - Press `Cmd + K` or `/` for spotlight search.
  - Press `N` to open the "Add Project" modal.
  - Press `?` for keyboard shortcuts cheat sheet.
- **Enterprise-Grade QA & CI/CD:**
  - **Vitest + Testing Library:** Full unit & integration test coverage for all features.
  - **Playwright Visual Snapshot Testing:** Pixel-by-pixel regression tests.
  - **Husky & Pre-commit Hooks:** Enforces test passing and linting before git commits.
  - **GitHub Actions:** Automated test suite, coverage reports, and visual diff artifact uploads.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

### 3. Run Test Suite
```bash
# Run unit & component tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run pixel-by-pixel visual snapshot comparison
npm run test:visual
```

### 4. Build for Production
```bash
npm run build
```

---

## 📂 Project Structure

```text
project-vault/
├── .github/
│   └── workflows/
│       ├── ci.yml                 # Automated lint, unit tests, coverage, and build
│       └── visual-diff.yml        # Pixel-by-pixel Playwright regression testing
├── .husky/
│   └── pre-commit                 # Git pre-commit hook (runs tests before commit)
├── e2e/
│   └── visual-comparison.spec.ts  # Playwright visual snapshot suite
├── src/
│   ├── components/
│   │   ├── Header.tsx             # Navbar, search, category pills, view switcher & actions
│   │   ├── LaunchpadView.tsx      # High-density tile launcher
│   │   ├── ViewportView.tsx       # Split-screen responsive sandbox & device frames
│   │   ├── DeckView.tsx           # Rich showcase deck with cards & previews
│   │   ├── AddProjectModal.tsx    # Interactive project creation modal
│   │   ├── PreviewModal.tsx       # Quick fullscreen live preview modal
│   │   ├── ExportImportModal.tsx  # JSON config export & import manager
│   │   └── KeyboardShortcutsModal.tsx # Keyboard helper dialog
│   ├── context/
│   │   └── ProjectContext.tsx     # Central reactive state & localStorage sync
│   ├── data/
│   │   └── defaultProjects.ts     # Default seeded Vercel projects config
│   ├── styles/
│   │   ├── variables.css          # Cozy color tokens & theme definitions
│   │   ├── global.css             # Global typography, resets, scrollbars
│   │   └── components.css         # Component-specific glassmorphic styles
│   ├── tests/                     # Comprehensive Vitest test suite
│   ├── types/
│   │   └── project.ts             # TypeScript definitions & schemas
│   ├── App.tsx                    # Root layout & view controller
│   └── main.tsx                   # Application entry point
├── ARCHITECTURE.md                # System design & state management deep dive
├── CHANGELOG.md                   # Version release notes
├── CONTRIBUTING.md                # Contribution guidelines
├── playwright.config.ts           # Visual regression test settings
├── vite.config.ts                 # Vite + Vitest configuration
└── package.json
```

---

## ➕ Adding Your Own Projects

### Method 1: In-App UI (Instant)
1. Click the **"➕ Add Project"** button in the header (or press `N`).
2. Enter your project Title, Tagline, Vercel URL, GitHub URL, Category, and Tech Tags.
3. Choose a cozy gradient theme or custom thumbnail image.
4. Click **"Add to Vault"**. It will immediately appear in Launchpad, Viewport, and Deck views!
5. Click **"Export JSON"** to download the updated config.

### Method 2: Permanent Code Config
Edit `src/data/defaultProjects.ts`:
```typescript
{
  id: 'my-app',
  title: 'My Awesome Webapp',
  tagline: 'Instant AI-powered code generator.',
  description: 'Full-stack application deployed on Vercel with real-time streaming.',
  vercelUrl: 'https://my-app.vercel.app',
  githubUrl: 'https://github.com/username/my-app',
  category: 'AI / ML',
  tags: ['Next.js', 'Tailwind', 'Groq'],
  status: 'live',
  featured: true,
  themeGradient: 'from-amber-500/20 to-orange-600/20'
}
```

---

## 🌐 Deploying to Vercel

1. Push your repository to GitHub.
2. Go to [Vercel Dashboard](https://vercel.com/new).
3. Import your `project-vault` repository.
4. Framework Preset: **Vite**.
5. Click **Deploy**. Your showcase hub is live in under 30 seconds!

---

## 📄 License
MIT License. Built with ❤️ for showcasing creative developer projects.
# project-vault
