import React, { useState } from 'react';
import { useProjects } from '../context/ProjectContext';
import { X, Plus, Sparkles, Check } from 'lucide-react';
import { ProjectCategory, ProjectStatus } from '../types/project';

const GRADIENT_PRESETS = [
  { name: 'Amber Sunset', value: 'linear-gradient(135deg, rgba(245, 158, 11, 0.25), rgba(234, 88, 12, 0.25))' },
  { name: 'Emerald Forest', value: 'linear-gradient(135deg, rgba(16, 185, 129, 0.25), rgba(6, 182, 212, 0.25))' },
  { name: 'Velvet Violet', value: 'linear-gradient(135deg, rgba(99, 102, 241, 0.25), rgba(168, 85, 247, 0.25))' },
  { name: 'Crimson Rose', value: 'linear-gradient(135deg, rgba(244, 63, 94, 0.25), rgba(249, 115, 22, 0.25))' }
];

export const AddProjectModal: React.FC = () => {
  const { isAddModalOpen, setIsAddModalOpen, addProject } = useProjects();

  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [vercelUrl, setVercelUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [category, setCategory] = useState<Exclude<ProjectCategory, 'All'>>('Full-Stack');
  const [tagsInput, setTagsInput] = useState('React, Next.js, Vercel');
  const [status, setStatus] = useState<ProjectStatus>('live');
  const [featured, setFeatured] = useState(false);
  const [selectedGradient, setSelectedGradient] = useState(GRADIENT_PRESETS[0].value);
  const [error, setError] = useState('');

  if (!isAddModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !vercelUrl.trim()) {
      setError('Title and Vercel URL are required.');
      return;
    }

    let formattedUrl = vercelUrl.trim();
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = `https://${formattedUrl}`;
    }

    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    addProject({
      title: title.trim(),
      tagline: tagline.trim() || 'A modern web application deployed on Vercel.',
      description: description.trim() || tagline.trim(),
      vercelUrl: formattedUrl,
      githubUrl: githubUrl.trim() || undefined,
      category,
      tags: tags.length > 0 ? tags : ['React', 'Vercel'],
      status,
      featured,
      themeGradient: selectedGradient
    });

    setIsAddModalOpen(false);
    setTitle('');
    setTagline('');
    setDescription('');
    setVercelUrl('');
    setGithubUrl('');
    setFeatured(false);
    setError('');
  };

  return (
    <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Sparkles size={20} style={{ color: 'var(--accent-amber)' }} />
            <h2 className="modal-title">Add Project to Vault</h2>
          </div>
          <button
            className="icon-btn"
            onClick={() => setIsAddModalOpen(false)}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {error && (
          <div style={{ padding: '0.75rem', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: 'var(--radius-sm)', color: '#fca5a5', marginBottom: '1rem', fontSize: '0.85rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Project Title *</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. AI Code Assistant"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Vercel Live URL *</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. https://my-project.vercel.app"
              value={vercelUrl}
              onChange={(e) => setVercelUrl(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
              >
                <option value="Full-Stack">Full-Stack</option>
                <option value="AI / ML">AI / ML</option>
                <option value="Frontend">Frontend</option>
                <option value="3D / Creative">3D / Creative</option>
                <option value="Utility">Utility</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Deployment Status</label>
              <select
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
              >
                <option value="live">Live 🟢</option>
                <option value="beta">Beta 🟡</option>
                <option value="maintenance">Maintenance 🔴</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Tagline (Quick summary)</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Instant real-time collaborative code editor."
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Tech Stack Tags (Comma separated)</label>
            <input
              type="text"
              className="form-input"
              placeholder="React, Next.js, Supabase, Tailwind"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">GitHub Repository (Optional)</label>
            <input
              type="text"
              className="form-input"
              placeholder="https://github.com/username/project"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
            />
          </div>

          {/* Featured checkbox */}
          <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input
              id="featured-checkbox"
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              style={{ accentColor: 'var(--accent-amber)', width: 16, height: 16, cursor: 'pointer' }}
            />
            <label htmlFor="featured-checkbox" style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
              Mark as Featured Flagship Project ⭐
            </label>
          </div>

          {/* Color Gradient Theme Picker */}
          <div className="form-group">
            <label className="form-label">Card Atmosphere / Gradient</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
              {GRADIENT_PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  style={{
                    height: 40,
                    borderRadius: 'var(--radius-sm)',
                    background: preset.value,
                    border: selectedGradient === preset.value ? '2px solid var(--accent-amber)' : '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: '0.75rem'
                  }}
                  onClick={() => setSelectedGradient(preset.value)}
                >
                  {selectedGradient === preset.value && <Check size={14} />}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button
              type="button"
              className="pill-btn"
              onClick={() => setIsAddModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              <Plus size={16} />
              <span>Add to Vault</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
