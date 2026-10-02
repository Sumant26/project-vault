import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProjectProvider, useProjects } from '../context/ProjectContext';
import { AddProjectModal } from '../components/AddProjectModal';

const TestOpener = () => {
  const { setIsAddModalOpen } = useProjects();
  return <button onClick={() => setIsAddModalOpen(true)}>Open Modal</button>;
};

describe('AddProjectModal Component', () => {
  it('opens and adds a new project on form submission', () => {
    render(
      <ProjectProvider>
        <TestOpener />
        <AddProjectModal />
      </ProjectProvider>
    );

    fireEvent.click(screen.getByText('Open Modal'));

    expect(screen.getByText('Add Project to Vault')).toBeInTheDocument();

    const titleInput = screen.getByPlaceholderText(/AI Code Assistant/i);
    const urlInput = screen.getByPlaceholderText(/my-project.vercel.app/i);

    fireEvent.change(titleInput, { target: { value: 'My Awesome AI' } });
    fireEvent.change(urlInput, { target: { value: 'https://awesome-ai.vercel.app' } });

    fireEvent.click(screen.getByText('Add to Vault'));

    expect(screen.queryByText('Add Project to Vault')).not.toBeInTheDocument();
  });
});
