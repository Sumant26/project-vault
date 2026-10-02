import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProjectProvider } from '../context/ProjectContext';
import { LaunchpadView } from '../components/LaunchpadView';

describe('LaunchpadView Component', () => {
  it('renders project tiles with launch buttons', () => {
    render(
      <ProjectProvider>
        <LaunchpadView />
      </ProjectProvider>
    );

    expect(screen.getByText('Universe Explorer 3D')).toBeInTheDocument();
    expect(screen.getByText('Forest Fire Watch')).toBeInTheDocument();

    const launchButtons = screen.getAllByText('Launch');
    expect(launchButtons.length).toBeGreaterThan(0);
  });
});
