import { Project } from '../types/project';

export const DEFAULT_PROJECTS: Project[] = [
  {
    id: 'universe-explorer-3d',
    title: 'Universe Explorer 3D',
    tagline: 'Interactive 3D celestial simulator with procedural orbits.',
    description: 'An immersive WebGL and Three.js solar system explorer with realistic gravitational trajectories, celestial body inspector, and spatial audio.',
    vercelUrl: 'https://universe-explorer-3d.vercel.app',
    githubUrl: 'https://github.com/example/universe-explorer-3d',
    category: '3D / Creative',
    tags: ['Three.js', 'React', 'WebGL', 'GLSL', 'Vite'],
    status: 'live',
    featured: true,
    themeGradient: 'linear-gradient(135deg, rgba(99, 102, 241, 0.25), rgba(168, 85, 247, 0.25))',
    metrics: [
      { label: 'FPS Rate', value: '60 FPS' },
      { label: 'Render Engine', value: 'Three.js v0.160' }
    ],
    createdAt: '2026-09-30'
  },
  {
    id: 'forest-fire-watch',
    title: 'Forest Fire Watch',
    tagline: 'Real-time wildfire tracker & environmental monitoring.',
    description: 'Geospatial intelligence webapp aggregating NASA FIRMS satellite data, wind vectors, and humidity heatmaps to model wildfire propagation in real-time.',
    vercelUrl: 'https://forest-fire-watch.vercel.app',
    githubUrl: 'https://github.com/example/forest-fire-watch',
    category: 'Full-Stack',
    tags: ['Next.js', 'Mapbox GL', 'Tailwind', 'NASA API', 'Leaflet'],
    status: 'live',
    featured: true,
    themeGradient: 'linear-gradient(135deg, rgba(239, 68, 68, 0.25), rgba(249, 115, 22, 0.25))',
    metrics: [
      { label: 'Latency', value: '180ms' },
      { label: 'Data Source', value: 'NASA FIRMS' }
    ],
    createdAt: '2026-09-24'
  },
  {
    id: 'job-tracker-enterprise',
    title: 'Job Tracker Enterprise',
    tagline: 'Kanban-based career pipeline & interview intelligence CRM.',
    description: 'Full-featured enterprise job application management board featuring automated follow-up reminders, salary negotiation calculator, and interview notes generator.',
    vercelUrl: 'https://job-tracker-enterprise.vercel.app',
    githubUrl: 'https://github.com/example/job-tracker-enterprise',
    category: 'Full-Stack',
    tags: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind'],
    status: 'live',
    featured: false,
    themeGradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.25), rgba(6, 182, 212, 0.25))',
    metrics: [
      { label: 'Lighthouse Score', value: '98/100' },
      { label: 'State Sync', value: 'Instant' }
    ],
    createdAt: '2026-08-17'
  },
  {
    id: 'gramophone-player-v2',
    title: 'Gramophone Player v2',
    tagline: 'Lo-Fi vinyl audio workstation with analog warmth DSP.',
    description: 'A nostalgic, cozy web audio workstation replicating analog vinyl crackle, pitch wobble, customizable warm DSP filters, and curated ambient study tracks.',
    vercelUrl: 'https://gramophone-player-v2.vercel.app',
    githubUrl: 'https://github.com/example/gramophone-player-v2',
    category: '3D / Creative',
    tags: ['Web Audio API', 'React', 'Canvas 2D', 'CSS 3D'],
    status: 'live',
    featured: true,
    themeGradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.25), rgba(180, 83, 9, 0.25))',
    metrics: [
      { label: 'Audio Latency', value: '12ms' },
      { label: 'Sound Engine', value: 'WebAudio API' }
    ],
    createdAt: '2026-09-29'
  },
  {
    id: 'drift-ai-assistant',
    title: 'Drift AI Assistant',
    tagline: 'Autonomous developer assistant with local streaming LLM.',
    description: 'A sleek desktop-style AI productivity copilot capable of synthesizing documentation, generating code scaffolds, and summarizing Git diffs with streaming response UI.',
    vercelUrl: 'https://drift-ai-assistant.vercel.app',
    githubUrl: 'https://github.com/example/drift-ai-assistant',
    category: 'AI / ML',
    tags: ['Next.js 14', 'Groq SDK', 'Llama 3', 'Radix UI', 'Vercel AI'],
    status: 'live',
    featured: false,
    themeGradient: 'linear-gradient(135deg, rgba(139, 92, 246, 0.25), rgba(217, 70, 239, 0.25))',
    metrics: [
      { label: 'Tokens/sec', value: '140 tok/s' },
      { label: 'Model', value: 'Llama 3 70B' }
    ],
    createdAt: '2026-09-15'
  },
  {
    id: 'tiny-isle',
    title: 'Tiny Isle',
    tagline: 'Cozy isometric island builder & procedural garden.',
    description: 'Relaxing procedural sandbox where users place cozy cabins, plant trees, and design peaceful minimalist floating islands with dynamic time-of-day lighting.',
    vercelUrl: 'https://tiny-isle.vercel.app',
    githubUrl: 'https://github.com/example/tiny-isle',
    category: '3D / Creative',
    tags: ['Vanilla JS', 'Canvas 2D', 'Isometric', 'Web Audio'],
    status: 'live',
    featured: false,
    themeGradient: 'linear-gradient(135deg, rgba(34, 197, 94, 0.25), rgba(20, 184, 166, 0.25))',
    metrics: [
      { label: 'Bundle Size', value: '38 KB' },
      { label: 'Load Time', value: '0.2s' }
    ],
    createdAt: '2026-09-29'
  }
];
