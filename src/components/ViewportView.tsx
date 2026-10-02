import React, { useState } from 'react';
import { useProjects } from '../context/ProjectContext';
import { 
  Monitor, 
  Tablet, 
  Smartphone, 
  ExternalLink, 
  RotateCw, 
  Maximize2, 
  AlertCircle,
  Globe
} from 'lucide-react';
import { GithubIcon } from './GithubIcon';

export const ViewportView: React.FC = () => {
  const { 
    filteredProjects, 
    selectedProject, 
    activeProjectId, 
    setActiveProjectId,
    activeDevice,
    setActiveDevice,
    setIsPreviewModalOpen,
    setPreviewProject
  } = useProjects();

  const [iframeKey, setIframeKey] = useState(0);
  const [, setIframeLoading] = useState(true);

  const handleRefreshIframe = () => {
    setIframeLoading(true);
    setIframeKey(prev => prev + 1);
  };

  const handleFullscreenPreview = () => {
    if (selectedProject) {
      setPreviewProject(selectedProject);
      setIsPreviewModalOpen(true);
    }
  };

  if (filteredProjects.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-muted)' }}>
        <AlertCircle size={40} style={{ margin: '0 auto 1rem auto', opacity: 0.5 }} />
        <h3>No matching projects for viewport testing</h3>
      </div>
    );
  }

  const currentProject = selectedProject || filteredProjects[0];

  return (
    <div className="viewport-layout">
      {/* Left Sidebar: Project List */}
      <aside className="viewport-sidebar">
        <div style={{ paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-subtle)', marginBottom: '0.5rem' }}>
          <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Select Webapp ({filteredProjects.length})
          </h4>
        </div>

        {filteredProjects.map((project) => {
          const isSelected = project.id === (currentProject?.id || activeProjectId);
          return (
            <div
              key={project.id}
              className={`project-item-card ${isSelected ? 'selected' : ''}`}
              onClick={() => {
                setActiveProjectId(project.id);
                setIframeLoading(true);
              }}
              role="button"
              tabIndex={0}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <span style={{ fontWeight: 700, fontSize: '0.92rem', color: isSelected ? 'var(--accent-amber)' : 'var(--text-primary)' }}>
                  {project.title}
                </span>
                <span className="status-dot" style={{ width: 6, height: 6 }} />
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {project.tagline}
              </p>
            </div>
          );
        })}
      </aside>

      {/* Right Area: Interactive Device Frame & Iframe Sandbox */}
      <main className="viewport-sandbox-container">
        {/* Viewport Control Toolbar */}
        <div className="viewport-toolbar">
          {/* Device Switcher */}
          <div className="device-switcher">
            <button
              className={`device-btn ${activeDevice === 'desktop' ? 'active' : ''}`}
              onClick={() => setActiveDevice('desktop')}
              title="Desktop Viewport (100% fluid)"
            >
              <Monitor size={14} />
              <span>Desktop</span>
            </button>
            <button
              className={`device-btn ${activeDevice === 'tablet' ? 'active' : ''}`}
              onClick={() => setActiveDevice('tablet')}
              title="Tablet Viewport (768px)"
            >
              <Tablet size={14} />
              <span>Tablet</span>
            </button>
            <button
              className={`device-btn ${activeDevice === 'mobile' ? 'active' : ''}`}
              onClick={() => setActiveDevice('mobile')}
              title="Mobile Viewport (375px)"
            >
              <Smartphone size={14} />
              <span>Mobile</span>
            </button>
          </div>

          {/* Simulated Browser URL Bar */}
          <div className="mock-url-bar">
            <Globe size={13} style={{ color: 'var(--accent-amber)' }} />
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {currentProject?.vercelUrl}
            </span>
          </div>

          {/* Action Tools */}
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <button
              className="icon-btn"
              style={{ width: 32, height: 32 }}
              onClick={handleRefreshIframe}
              title="Reload Sandbox Preview"
              aria-label="Reload preview"
            >
              <RotateCw size={14} />
            </button>
            <button
              className="icon-btn"
              style={{ width: 32, height: 32 }}
              onClick={handleFullscreenPreview}
              title="Fullscreen Preview"
              aria-label="Fullscreen preview"
            >
              <Maximize2 size={14} />
            </button>
            {currentProject?.githubUrl && (
              <a
                href={currentProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-btn"
                style={{ width: 32, height: 32 }}
                title="View GitHub Repo"
              >
                <GithubIcon size={14} />
              </a>
            )}
            <a
              href={currentProject?.vercelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-launch"
              style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
              title="Open in new tab"
            >
              <span>Live App</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* Device Sandbox Frame */}
        <div className="sandbox-frame-wrapper">
          <div className={`device-frame ${activeDevice}`}>
            {currentProject ? (
              <iframe
                key={`${currentProject.id}-${iframeKey}`}
                src={currentProject.vercelUrl}
                title={`Live sandbox for ${currentProject.title}`}
                className="sandbox-iframe"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                onLoad={() => setIframeLoading(false)}
              />
            ) : null}
          </div>
        </div>

        {/* Project Meta Bar at the bottom */}
        {currentProject && (
          <div style={{ padding: '1rem 1.5rem', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <span style={{ fontWeight: 700, marginRight: '0.5rem', color: 'var(--text-primary)' }}>{currentProject.title}</span>
              <span style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>{currentProject.description}</span>
            </div>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              {currentProject.tags.map(t => (
                <span key={t} className="tag-chip">{t}</span>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
