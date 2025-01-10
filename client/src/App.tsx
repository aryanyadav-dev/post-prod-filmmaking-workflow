import { useState } from 'react';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/sidebar/Sidebar';
import { WorkflowEditor } from './components/workflow/WorkflowEditor';
import { Dashboard } from './components/dashboard/Dashboard';
import { Team } from './components/team/team.tsx';
import { Workspace } from './components/workspace/Workspace';
import { Stage } from './types';

type Page = 'dashboard' | 'workflow' | 'team' | 'workspace';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  const stages: Stage[] = [
    {
      id: '1',
      name: 'Footage Import',
      status: 'active',
      tasks: [
        {
          id: '1',
          title: 'Import Raw Footage',
          status: 'in-progress',
          priority: 'high',
          description: 'Transfer 4K footage from RED camera cards',
        },
        {
          id: '2',
          title: 'Create Proxy Files',
          status: 'todo',
          priority: 'medium',
          description: 'Generate 1080p proxy files for editing',
        },
      ],
    },
    {
      id: '2',
      name: 'Editing',
      status: 'inactive',
      tasks: [
        {
          id: '3',
          title: 'Rough Cut Assembly',
          status: 'todo',
          priority: 'high',
          description: 'Create initial sequence from selected takes',
        },
        {
          id: '4',
          title: 'Sound Sync',
          status: 'todo',
          priority: 'medium',
          description: 'Synchronize external audio with video',
        },
      ],
    },
    {
      id: '3',
      name: 'Post-Production',
      status: 'inactive',
      tasks: [
        {
          id: '5',
          title: 'Color Correction',
          status: 'todo',
          priority: 'medium',
          description: 'Basic color correction and exposure adjustment',
        },
        {
          id: '6',
          title: 'VFX Integration',
          status: 'todo',
          priority: 'high',
          description: 'Composite CGI elements into final shots',
        },
      ],
    },
  ];

  const handlePageChange = (page: Page) => {
    setCurrentPage(page);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar onPageChange={handlePageChange} />
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'workflow' && <WorkflowEditor stages={stages} />}
        {currentPage === 'team' && <Team />}
        {currentPage === 'workspace' && <Workspace />}
      </div>
    </div>
  );
}

export default App;
