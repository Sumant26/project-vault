import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { ProjectProvider, useProjects } from '../context/ProjectContext';
import React from 'react';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ProjectProvider>{children}</ProjectProvider>
);

describe('ProjectContext State Management', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('provides default projects on initial mount', () => {
    const { result } = renderHook(() => useProjects(), { wrapper });
    expect(result.current.projects.length).toBeGreaterThan(0);
    expect(result.current.activeViewMode).toBe('launchpad');
  });

  it('switches view mode properly', () => {
    const { result } = renderHook(() => useProjects(), { wrapper });
    act(() => {
      result.current.setActiveViewMode('viewport');
    });
    expect(result.current.activeViewMode).toBe('viewport');

    act(() => {
      result.current.setActiveViewMode('deck');
    });
    expect(result.current.activeViewMode).toBe('deck');
  });

  it('filters projects by search query', () => {
    const { result } = renderHook(() => useProjects(), { wrapper });
    act(() => {
      result.current.setSearchQuery('Universe');
    });
    expect(result.current.filteredProjects.length).toBe(1);
    expect(result.current.filteredProjects[0].title).toBe('Universe Explorer 3D');
  });

  it('filters projects by category', () => {
    const { result } = renderHook(() => useProjects(), { wrapper });
    act(() => {
      result.current.setSelectedCategory('Full-Stack');
    });
    result.current.filteredProjects.forEach(p => {
      expect(p.category).toBe('Full-Stack');
    });
  });

  it('adds a new project and persists to localStorage', () => {
    const { result } = renderHook(() => useProjects(), { wrapper });
    const initialCount = result.current.projects.length;

    act(() => {
      result.current.addProject({
        title: 'New Test Webapp',
        tagline: 'Testing automated project addition',
        description: 'Description for testing',
        vercelUrl: 'https://test-webapp.vercel.app',
        category: 'Frontend',
        tags: ['React', 'Vite'],
        status: 'live'
      });
    });

    expect(result.current.projects.length).toBe(initialCount + 1);
    expect(result.current.projects[0].title).toBe('New Test Webapp');
  });

  it('deletes a project by id', () => {
    const { result } = renderHook(() => useProjects(), { wrapper });
    const targetId = result.current.projects[0].id;
    const initialCount = result.current.projects.length;

    act(() => {
      result.current.deleteProject(targetId);
    });

    expect(result.current.projects.length).toBe(initialCount - 1);
    expect(result.current.projects.some(p => p.id === targetId)).toBe(false);
  });
});
