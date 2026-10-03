export type ProjectCategory = 
  | 'All'
  | 'Full-Stack'
  | 'AI / ML'
  | 'Frontend'
  | '3D / Creative'
  | 'Utility';

export type ProjectStatus = 'live' | 'beta' | 'maintenance';

export type ViewMode = 'launchpad' | 'viewport' | 'deck';

export type DeviceFrame = 'desktop' | 'tablet' | 'mobile';

export type CozyTheme = 
  | 'obsidian-indigo'
  | 'midnight-emerald'
  | 'nordic-cyan'
  | 'tokyo-night'
  | 'clean-minimal'
  | 'warm-dusk'
  | 'cozy-espresso'
  | 'deep-forest';

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  vercelUrl: string;
  githubUrl?: string;
  category: Exclude<ProjectCategory, 'All'>;
  tags: string[];
  status: ProjectStatus;
  featured?: boolean;
  themeGradient?: string;
  thumbnailUrl?: string;
  metrics?: {
    label: string;
    value: string;
  }[];
  createdAt?: string;
}

export interface FilterState {
  searchQuery: string;
  selectedCategory: ProjectCategory;
  selectedTag: string | null;
}
