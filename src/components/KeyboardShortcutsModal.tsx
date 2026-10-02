import React from 'react';
import { useProjects } from '../context/ProjectContext';
import { X, Keyboard } from 'lucide-react';

export const KeyboardShortcutsModal: React.FC = () => {
  const { isShortcutsModalOpen, setIsShortcutsModalOpen } = useProjects();

  if (!isShortcutsModalOpen) return null;

  const SHORTCUTS = [
    { key: '1', desc: 'Switch to Launchpad Grid View' },
    { key: '2', desc: 'Switch to Split Viewport Sandbox' },
    { key: '3', desc: 'Switch to Showcase Deck View' },
    { key: 'Ctrl + K / ⌘K', desc: 'Focus global search input' },
    { key: 'N', desc: 'Open "Add Project" modal' },
    { key: '?', desc: 'Toggle keyboard shortcuts guide' },
    { key: 'Esc', desc: 'Close open modal dialogs' }
  ];

  return (
    <div className="modal-overlay" onClick={() => setIsShortcutsModalOpen(false)}>
      <div className="modal-dialog" style={{ maxWidth: '480px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Keyboard size={20} style={{ color: 'var(--accent-amber)' }} />
            <h2 className="modal-title">Keyboard Shortcuts</h2>
          </div>
          <button className="icon-btn" onClick={() => setIsShortcutsModalOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {SHORTCUTS.map((item) => (
            <div
              key={item.key}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.6rem 0.8rem',
                background: 'var(--bg-input)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>{item.desc}</span>
              <kbd style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', background: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px', color: 'var(--accent-amber)' }}>
                {item.key}
              </kbd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
