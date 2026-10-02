import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProjectProvider } from '../context/ProjectContext';
import { DeckView } from '../components/DeckView';

describe('DeckView Component', () => {
  it('renders rich cards with descriptions and metrics', () => {
    render(
      <ProjectProvider>
        <DeckView />
      </ProjectProvider>
    );

    expect(screen.getByText('Universe Explorer 3D')).toBeInTheDocument();
    expect(screen.getByText('Gramophone Player v2')).toBeInTheDocument();
  });
});
