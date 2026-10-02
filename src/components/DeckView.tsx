import React from 'react';
import { useProjects } from '../context/ProjectContext';
import { ExternalLink, Eye, Layers, AlertCircle } from 'lucide-react';
import { GithubIcon } from './GithubIcon';
import { Project } from '../types/project';

export const DeckView: React.FC = () => {
  const { filteredProjects, setPreviewProject, setIsPreviewModalOpen } = useProjects();

  const handleOpenPreview = (project: Project) => {
    setPreviewProject(project);
    setIsPreviewModalOpen(true);
  };

  if (filteredProjects.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-muted)' }}>
        <AlertCircle size={40} style={{ margin: '0 auto 1rem auto', opacity: 0.5 }} />
        <h3>No projects match your filter</h3>
      </div>
    );
  }

  return (
    <div className="deck-grid">
      {filteredProjects.map((project) => (
        <div key={project.id} className="deck-card">
          {/* Card Visual Header */}
          <div
            className="deck-visual-header"
            style={{
              background: project.themeGradient || 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(99, 102, 241, 0.2))'
            }}
          >
            <div style={{ textAlign: 'center', zIndex: 2, padding: '1rem' }}>
              <Layers size={36} style={{ color: 'var(--accent-amber)', opacity: 0.85, margin: '0 auto 0.5rem auto' }} />
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                {project.category}
              </div>
            </div>
          </div>

          {/* Card Body */}
          <div className="deck-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{project.title}</h3>
              <span className="status-indicator">
                <span className="status-dot" />
                {project.status.toUpperCase()}
              </span>
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1rem', flex: 1 }}>
              {project.description}
            </p>

            {/* Metrics Breakdown if available */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="metrics-row">
                {project.metrics.map((m) => (
                  <div key={m.label} className="metric-item">
                    <div className="metric-label">{m.label}</div>
                    <div className="metric-value">{m.value}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Tag Chips */}
            <div className="tag-chips" style={{ margin: '0.5rem 0 1.25rem 0' }}>
              {project.tags.map((tag) => (
                <span key={tag} className="tag-chip">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="tile-actions">
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <button
                  className="icon-btn"
                  style={{ width: 34, height: 34 }}
                  onClick={() => handleOpenPreview(project)}
                  title="Interactive Sandbox Preview"
                  aria-label={`Preview ${project.title}`}
                >
                  <Eye size={16} />
                </button>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="icon-btn"
                    style={{ width: 34, height: 34 }}
                    title="GitHub Repository"
                  >
                    <GithubIcon size={16} />
                  </a>
                )}
              </div>

              <a
                href={project.vercelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-launch"
              >
                <span>Launch App</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
