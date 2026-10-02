import React from 'react';
import { ProjectProvider, useProjects } from './context/ProjectContext';
import { Header } from './components/Header';
import { LaunchpadView } from './components/LaunchpadView';
import { ViewportView } from './components/ViewportView';
import { DeckView } from './components/DeckView';
import { AddProjectModal } from './components/AddProjectModal';
import { PreviewModal } from './components/PreviewModal';
import { ExportImportModal } from './components/ExportImportModal';
import { KeyboardShortcutsModal } from './components/KeyboardShortcutsModal';

const MainLayout: React.FC = () => {
  const { activeViewMode } = useProjects();

  return (
    <div className="app-layout">
      <Header />
      <main className="main-content">
        {activeViewMode === 'launchpad' && <LaunchpadView />}
        {activeViewMode === 'viewport' && <ViewportView />}
        {activeViewMode === 'deck' && <DeckView />}
      </main>

      {/* Interactive Modals */}
      <AddProjectModal />
      <PreviewModal />
      <ExportImportModal />
      <KeyboardShortcutsModal />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ProjectProvider>
      <MainLayout />
    </ProjectProvider>
  );
};

export default App;
