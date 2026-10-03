import React from 'react';
import { useProjects } from '../context/ProjectContext';
import { ExternalLink, Eye, Sparkles, AlertCircle } from 'lucide-react';
import { GithubIcon } from './GithubIcon';
import { Project } from '../types/project';

export const LaunchpadView: React.FC = () => {
  const { filteredProjects, setPreviewProject, setIsPreviewModalOpen } = useProjects();

  const handleOpenPreview = (project: Project) => {
    setPreviewProject(project);
    setIsPreviewModalOpen(true);
  };

  if (filteredProjects.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-muted)' }}>
        <AlertCircle size={40} style={{ margin: '0 auto 1rem auto', opacity: 0.5 }} />
        <h3>No matching projects found</h3>
        <p style={{ marginTop: '0.5rem' }}>Try clearing your search query or selecting a different category.</p>
      </div>
    );
  }

  return (
    <div className="launchpad-grid">
      {filteredProjects.map((project) => (
        <div
          key={project.id}
          className="launchpad-tile"
        >
          <div>
            <div className="tile-top">
              <span className="status-indicator">
                <span className="status-dot" />
                {project.status.toUpperCase()}
              </span>
              {project.featured && (
                <span style={{ fontSize: '0.72rem', color: 'var(--accent-amber)', display: 'flex', alignItems: 'center', gap: 3 }}>
                  <Sparkles size={12} /> Featured
                </span>
              )}
            </div>

            <h3 className="tile-title">{project.title}</h3>
            <p className="tile-tagline">{project.tagline}</p>

            <div className="tag-chips">
              {project.tags.map((tag) => (
                <span key={tag} className="tag-chip">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="tile-actions">
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              <button
                className="icon-btn"
                style={{ width: 32, height: 32 }}
                onClick={() => handleOpenPreview(project)}
                title="Quick Preview Sandbox"
                aria-label={`Preview ${project.title}`}
              >
                <Eye size={15} />
              </button>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-btn"
                  style={{ width: 32, height: 32 }}
                  title="View GitHub Source Code"
                  aria-label={`GitHub repo for ${project.title}`}
                >
                  <GithubIcon size={15} />
                </a>
              )}
            </div>

            <a
              href={project.vercelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-launch"
              title="Open live deployment on Vercel"
            >
              <span>Launch</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};
