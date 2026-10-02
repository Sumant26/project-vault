import React from 'react';
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
  Sparkles
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

  const toggleTheme = () => {
    const themes: CozyTheme[] = ['warm-dusk', 'cozy-espresso', 'deep-forest'];
    const nextIndex = (themes.indexOf(theme) + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

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
                <Sparkles size={11} style={{ display: 'inline', marginRight: 3 }} />
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
          <button
            className="icon-btn"
            onClick={toggleTheme}
            title={`Current Theme: ${theme}. Click to switch theme.`}
            aria-label="Toggle cozy theme"
          >
            <Palette size={18} />
          </button>
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
