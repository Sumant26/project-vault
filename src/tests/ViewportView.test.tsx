import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProjectProvider } from '../context/ProjectContext';
import { ViewportView } from '../components/ViewportView';

describe('ViewportView Component', () => {
  it('renders device switcher buttons and sandbox iframe', () => {
    render(
      <ProjectProvider>
        <ViewportView />
      </ProjectProvider>
    );

    expect(screen.getByText('Desktop')).toBeInTheDocument();
    expect(screen.getByText('Tablet')).toBeInTheDocument();
    expect(screen.getByText('Mobile')).toBeInTheDocument();

    const desktopBtn = screen.getByText('Desktop');
    const mobileBtn = screen.getByText('Mobile');

    fireEvent.click(mobileBtn);
    expect(mobileBtn.closest('button')).toHaveClass('active');
    expect(desktopBtn.closest('button')).not.toHaveClass('active');
  });
});
