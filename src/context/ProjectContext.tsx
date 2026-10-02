import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Project, ProjectCategory, ViewMode, DeviceFrame, CozyTheme, FilterState } from '../types/project';
import { DEFAULT_PROJECTS } from '../data/defaultProjects';
import confetti from 'canvas-confetti';

interface ProjectContextType {
  projects: Project[];
  filteredProjects: Project[];
  activeViewMode: ViewMode;
  setActiveViewMode: (mode: ViewMode) => void;
  activeProjectId: string;
  setActiveProjectId: (id: string) => void;
  selectedProject: Project | undefined;
  activeDevice: DeviceFrame;
  setActiveDevice: (device: DeviceFrame) => void;
  theme: CozyTheme;
  setTheme: (theme: CozyTheme) => void;
  filter: FilterState;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: ProjectCategory) => void;
  setSelectedTag: (tag: string | null) => void;
  isAddModalOpen: boolean;
  setIsAddModalOpen: (open: boolean) => void;
  isPreviewModalOpen: boolean;
  setIsPreviewModalOpen: (open: boolean) => void;
  isExportModalOpen: boolean;
  setIsExportModalOpen: (open: boolean) => void;
  isShortcutsModalOpen: boolean;
  setIsShortcutsModalOpen: (open: boolean) => void;
  previewProject: Project | null;
  setPreviewProject: (project: Project | null) => void;
  addProject: (newProject: Omit<Project, 'id' | 'createdAt'>) => void;
  deleteProject: (id: string) => void;
  resetToDefaults: () => void;
  allTags: string[];
}

const STORAGE_KEY = 'project_vault_user_data_v1';
const THEME_STORAGE_KEY = 'project_vault_theme_v1';

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      console.warn('Failed to parse saved projects, falling back to defaults.');
    }
    return DEFAULT_PROJECTS;
  });

  const [activeViewMode, setActiveViewMode] = useState<ViewMode>('launchpad');
  const [activeProjectId, setActiveProjectId] = useState<string>(DEFAULT_PROJECTS[0]?.id || '');
  const [activeDevice, setActiveDevice] = useState<DeviceFrame>('desktop');
  const [theme, setThemeState] = useState<CozyTheme>(() => {
    return (localStorage.getItem(THEME_STORAGE_KEY) as CozyTheme) || 'warm-dusk';
  });

  const [filter, setFilter] = useState<FilterState>({
    searchQuery: '',
    selectedCategory: 'All',
    selectedTag: null
  });

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isShortcutsModalOpen, setIsShortcutsModalOpen] = useState(false);
  const [previewProject, setPreviewProject] = useState<Project | null>(null);

  // Sync projects to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch (e) {
      console.error('Failed to save projects to localStorage:', e);
    }
  }, [projects]);

  // Sync theme to DOM and localStorage
  const setTheme = (newTheme: CozyTheme) => {
    setThemeState(newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Search and Filter logic
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = 
        filter.searchQuery.trim() === '' ||
        project.title.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
        project.tagline.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
        project.tags.some(t => t.toLowerCase().includes(filter.searchQuery.toLowerCase()));

      const matchesCategory = 
        filter.selectedCategory === 'All' || project.category === filter.selectedCategory;

      const matchesTag = 
        !filter.selectedTag || project.tags.includes(filter.selectedTag);

      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [projects, filter]);

  // Selected project object for Viewport view
  const selectedProject = useMemo(() => {
    return projects.find(p => p.id === activeProjectId) || projects[0];
  }, [projects, activeProjectId]);

  // Extract unique tag list
  const allTags = useMemo(() => {
    const set = new Set<string>();
    projects.forEach(p => p.tags.forEach(t => set.add(t)));
    return Array.from(set);
  }, [projects]);

  const setSearchQuery = (query: string) => {
    setFilter(prev => ({ ...prev, searchQuery: query }));
  };

  const setSelectedCategory = (category: ProjectCategory) => {
    setFilter(prev => ({ ...prev, selectedCategory: category }));
  };

  const setSelectedTag = (tag: string | null) => {
    setFilter(prev => ({ ...prev, selectedTag: tag }));
  };

  // Add project with ID generation and optional celebration
  const addProject = (newProjectData: Omit<Project, 'id' | 'createdAt'>) => {
    const id = newProjectData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString(36);
    const fullProject: Project = {
      ...newProjectData,
      id,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setProjects(prev => [fullProject, ...prev]);
    setActiveProjectId(id);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // Confetti fallback
    }
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    if (activeProjectId === id) {
      const remaining = projects.filter(p => p.id !== id);
      if (remaining.length > 0) {
        setActiveProjectId(remaining[0].id);
      }
    }
  };

  const resetToDefaults = () => {
    setProjects(DEFAULT_PROJECTS);
    localStorage.removeItem(STORAGE_KEY);
    setActiveProjectId(DEFAULT_PROJECTS[0]?.id || '');
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) {
        if (e.key === 'Escape') {
          (e.target as HTMLElement).blur();
        }
        return;
      }

      if (e.key === '1') setActiveViewMode('launchpad');
      if (e.key === '2') setActiveViewMode('viewport');
      if (e.key === '3') setActiveViewMode('deck');
      if (e.key === 'n' || e.key === 'N') {
        e.preventDefault();
        setIsAddModalOpen(true);
      }
      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        setIsShortcutsModalOpen(prev => !prev);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('vault-search-input');
        searchInput?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        filteredProjects,
        activeViewMode,
        setActiveViewMode,
        activeProjectId,
        setActiveProjectId,
        selectedProject,
        activeDevice,
        setActiveDevice,
        theme,
        setTheme,
        filter,
        setSearchQuery,
        setSelectedCategory,
        setSelectedTag,
        isAddModalOpen,
        setIsAddModalOpen,
        isPreviewModalOpen,
        setIsPreviewModalOpen,
        isExportModalOpen,
        setIsExportModalOpen,
        isShortcutsModalOpen,
        setIsShortcutsModalOpen,
        previewProject,
        setPreviewProject,
        addProject,
        deleteProject,
        resetToDefaults,
        allTags
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};
