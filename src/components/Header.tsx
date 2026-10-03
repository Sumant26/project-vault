import React, { useState, useRef, useEffect } from 'react';
import { useProjects } from '../context/ProjectContext';
import { 
  Compass, 
  LayoutGrid, 
  MonitorSmartphone, 
  Layers, 
  Search, 
  Plus, 
  Download, 
  Palette, 
  Keyboard,
  Check
} from 'lucide-react';
import { ProjectCategory, CozyTheme } from '../types/project';

const CATEGORIES: ProjectCategory[] = [
  'All',
  'Full-Stack',
  'AI / ML',
  'Frontend',
  '3D / Creative',
  'Utility'
];

interface ThemeOption {
  id: CozyTheme;
  name: string;
  tag: string;
  bg: string;
  accent: string;
}

const THEME_OPTIONS: ThemeOption[] = [
  { id: 'obsidian-indigo', name: 'Obsidian & Indigo', tag: 'Linear Dark', bg: '#0b0f17', accent: '#6366f1' },
  { id: 'midnight-emerald', name: 'Midnight Navy', tag: 'Bio Emerald', bg: '#060d17', accent: '#10b981' },
  { id: 'nordic-cyan', name: 'Nordic Charcoal', tag: 'Ice Cyan', bg: '#111113', accent: '#0ea5e9' },
  { id: 'tokyo-night', name: 'Tokyo Night', tag: 'Neon Violet', bg: '#120f1d', accent: '#a855f7' },
  { id: 'clean-minimal', name: 'Clean Minimal', tag: 'Apple Light', bg: '#f8fafc', accent: '#2563eb' },
  { id: 'warm-dusk', name: 'Warm Linen', tag: 'Paper Classic', bg: '#faf7f2', accent: '#c85a46' },
  { id: 'cozy-espresso', name: 'Cozy Espresso', tag: 'Dark Cocoa', bg: '#171310', accent: '#d97706' },
  { id: 'deep-forest', name: 'Deep Forest', tag: 'Botanical Sage', bg: '#0d1712', accent: '#10b981' },
];

export const Header: React.FC = () => {
  const {
    filteredProjects,
    projects,
    activeViewMode,
    setActiveViewMode,
    filter,
    setSearchQuery,
    setSelectedCategory,
    theme,
    setTheme,
    setIsAddModalOpen,
    setIsExportModalOpen,
    setIsShortcutsModalOpen
  } = useProjects();

  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const themeMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(e.target as Node)) {
        setIsThemeMenuOpen(false);
      }
    };
    if (isThemeMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isThemeMenuOpen]);

  const currentThemeObj = THEME_OPTIONS.find(t => t.id === theme) || THEME_OPTIONS[0];

  return (
    <header className="header-wrapper">
      <div className="header-inner">
        {/* Brand Logo & Name */}
        <div className="brand-section">
          <div className="brand-logo-icon" title="Project Vault Hub">
            <Compass size={22} />
          </div>
          <div>
            <div className="brand-title">
              <span>Project Vault</span>
              <span className="brand-badge">
                {projects.length} Apps
              </span>
            </div>
          </div>
        </div>

        {/* Global Search */}
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input
            id="vault-search-input"
            type="text"
            className="search-input"
            placeholder="Search webapps or tags..."
            value={filter.searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="search-shortcut">Ctrl+K</span>
        </div>

        {/* View Switcher Controls */}
        <div className="view-switcher">
          <button
            className={`mode-btn ${activeViewMode === 'launchpad' ? 'active' : ''}`}
            onClick={() => setActiveViewMode('launchpad')}
            title="Launchpad View (Press 1)"
          >
            <LayoutGrid size={15} />
            <span>Launchpad</span>
          </button>
          <button
            className={`mode-btn ${activeViewMode === 'viewport' ? 'active' : ''}`}
            onClick={() => setActiveViewMode('viewport')}
            title="Split Viewport View (Press 2)"
          >
            <MonitorSmartphone size={15} />
            <span>Viewport</span>
          </button>
          <button
            className={`mode-btn ${activeViewMode === 'deck' ? 'active' : ''}`}
            onClick={() => setActiveViewMode('deck')}
            title="Showcase Deck View (Press 3)"
          >
            <Layers size={15} />
            <span>Deck</span>
          </button>
        </div>

        {/* Action Controls */}
        <div className="header-actions">
          {/* Theme Selector Popover */}
          <div className="theme-selector-container" ref={themeMenuRef}>
            <button
              className={`icon-btn theme-btn-trigger ${isThemeMenuOpen ? 'active' : ''}`}
              onClick={() => setIsThemeMenuOpen(prev => !prev)}
              title={`Active Theme: ${currentThemeObj.name} (${currentThemeObj.tag}). Click to change palette.`}
              aria-label="Select Theme Palette"
            >
              <Palette size={18} />
              <span 
                className="theme-active-dot" 
                style={{ background: currentThemeObj.accent }}
              />
            </button>

            {isThemeMenuOpen && (
              <div className="theme-dropdown-menu">
                <div className="theme-dropdown-header">
                  <span>Color Theme</span>
                  <span className="theme-count-tag">{THEME_OPTIONS.length} palettes</span>
                </div>
                <div className="theme-list">
                  {THEME_OPTIONS.map((t) => {
                    const isSelected = theme === t.id;
                    return (
                      <button
                        key={t.id}
                        className={`theme-option-item ${isSelected ? 'selected' : ''}`}
                        onClick={() => {
                          setTheme(t.id);
                          setIsThemeMenuOpen(false);
                        }}
                      >
                        <div className="theme-swatch">
                          <span className="swatch-bg" style={{ background: t.bg }} />
                          <span className="swatch-accent" style={{ background: t.accent }} />
                        </div>
                        <div className="theme-meta">
                          <span className="theme-name">{t.name}</span>
                          <span className="theme-tag">{t.tag}</span>
                        </div>
                        {isSelected && <Check size={14} className="theme-check-icon" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          <button
            className="icon-btn"
            onClick={() => setIsShortcutsModalOpen(true)}
            title="Keyboard Shortcuts (Press ?)"
            aria-label="Keyboard shortcuts"
          >
            <Keyboard size={18} />
          </button>
          <button
            className="icon-btn"
            onClick={() => setIsExportModalOpen(true)}
            title="Export / Import Projects Config"
            aria-label="Export config"
          >
            <Download size={18} />
          </button>
          <button
            className="btn-primary"
            onClick={() => setIsAddModalOpen(true)}
            title="Add New Project (Press N)"
          >
            <Plus size={16} />
            <span>Add Project</span>
          </button>
        </div>
      </div>

      {/* Category Filter Bar */}
      <div style={{ maxWidth: 1500, margin: '0 auto', padding: '0.5rem 2rem 0.75rem 2rem' }}>
        <div className="filter-bar">
          <div className="category-pills">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`pill-btn ${filter.selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="stats-badge">
            Showing <strong>{filteredProjects.length}</strong> of <strong>{projects.length}</strong> projects
          </div>
        </div>
      </div>
    </header>
  );
};
