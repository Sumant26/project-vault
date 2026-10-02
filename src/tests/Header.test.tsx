import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProjectProvider } from '../context/ProjectContext';
import { Header } from '../components/Header';

describe('Header Component', () => {
  it('renders brand title and search input', () => {
    render(
      <ProjectProvider>
        <Header />
      </ProjectProvider>
    );

    expect(screen.getByText('Project Vault')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/search webapps or tags/i)).toBeInTheDocument();
  });

  it('updates search query on typing', () => {
    render(
      <ProjectProvider>
        <Header />
      </ProjectProvider>
    );

    const input = screen.getByPlaceholderText(/search webapps/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Fire' } });
    expect(input.value).toBe('Fire');
  });

  it('renders all view switcher buttons', () => {
    render(
      <ProjectProvider>
        <Header />
      </ProjectProvider>
    );

    expect(screen.getByText('Launchpad')).toBeInTheDocument();
    expect(screen.getByText('Viewport')).toBeInTheDocument();
    expect(screen.getByText('Deck')).toBeInTheDocument();
  });
});
