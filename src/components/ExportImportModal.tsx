import React, { useState } from 'react';
import { useProjects } from '../context/ProjectContext';
import { X, Copy, RotateCcw, Check, Download } from 'lucide-react';

export const ExportImportModal: React.FC = () => {
  const { isExportModalOpen, setIsExportModalOpen, projects, resetToDefaults } = useProjects();
  const [copied, setCopied] = useState(false);

  if (!isExportModalOpen) return null;

  const jsonContent = JSON.stringify(projects, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'projects.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="modal-overlay" onClick={() => setIsExportModalOpen(false)}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Project Configuration</h2>
          <button className="icon-btn" onClick={() => setIsExportModalOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          Download or copy this JSON configuration to commit it directly into <code>src/data/defaultProjects.ts</code> or back up your added projects.
        </p>

        <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
          <textarea
            readOnly
            value={jsonContent}
            className="form-textarea"
            style={{ height: '220px', fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <button
            className="pill-btn"
            style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}
            onClick={() => {
              if (window.confirm('Reset all projects to system defaults? Custom added projects will be removed.')) {
                resetToDefaults();
                setIsExportModalOpen(false);
              }
            }}
          >
            <RotateCcw size={14} style={{ display: 'inline', marginRight: 4 }} />
            Reset to Defaults
          </button>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="pill-btn" onClick={handleCopy}>
              {copied ? <Check size={14} style={{ display: 'inline', marginRight: 4 }} /> : <Copy size={14} style={{ display: 'inline', marginRight: 4 }} />}
              {copied ? 'Copied!' : 'Copy JSON'}
            </button>
            <button className="btn-primary" onClick={handleDownload}>
              <Download size={14} />
              <span>Download JSON</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
