import React from 'react';
import { useProjects } from '../context/ProjectContext';
import { X, ExternalLink } from 'lucide-react';

export const PreviewModal: React.FC = () => {
  const { isPreviewModalOpen, setIsPreviewModalOpen, previewProject } = useProjects();

  if (!isPreviewModalOpen || !previewProject) return null;

  return (
    <div className="modal-overlay" onClick={() => setIsPreviewModalOpen(false)}>
      <div
        className="modal-dialog"
        style={{ maxWidth: '95vw', width: '1200px', height: '88vh', display: 'flex', flexDirection: 'column', padding: '1rem' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Topbar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{previewProject.title}</span>
            <span className="status-indicator">
              <span className="status-dot" />
              {previewProject.status.toUpperCase()}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <a
              href={previewProject.vercelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-launch"
              style={{ padding: '0.35rem 0.75rem' }}
            >
              <span>Open in New Tab</span>
              <ExternalLink size={13} />
            </a>
            <button
              className="icon-btn"
              style={{ width: 32, height: 32 }}
              onClick={() => setIsPreviewModalOpen(false)}
              aria-label="Close preview"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Live Iframe Canvas */}
        <div style={{ flex: 1, marginTop: '0.75rem', background: '#000', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
          <iframe
            src={previewProject.vercelUrl}
            title={`Preview of ${previewProject.title}`}
            style={{ width: '100%', height: '100%', border: 'none', background: '#fff' }}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        </div>
      </div>
    </div>
  );
};
