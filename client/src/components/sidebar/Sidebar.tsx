import React, { useState } from 'react';
import { ChevronDown, Video, Film, Scissors, Clock, Calendar, Users, HardDrive, Settings, FileVideo, Home, LayoutDashboard } from 'lucide-react';

interface SidebarProps {
  onPageChange: (page: 'dashboard' | 'workflow' | 'team' | 'workspace') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onPageChange }) => {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [sectionsOpen, setSectionsOpen] = useState({
    home: true,
    production: true,
    management: true
  });

  const handleItemClick = (text: string) => {
    setActiveItem(text);
    if (text === 'Dashboard') {
      onPageChange('dashboard');
    } else if (text === 'Workflow') {
      onPageChange('workflow');
    } else if (text === 'Team') {
      onPageChange('team');
    } else if (text === 'Workspace') {
      onPageChange('workspace');
    }
  };

  const toggleSection = (section) => {
    setSectionsOpen(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const homeSection = [
    { icon: LayoutDashboard, text: 'Dashboard', count: 1 },
    { icon: Video, text: 'Workflow', count: 1 }
  ];

  const productionTasks = [
    { icon: Video, text: 'Raw Footage', count: 12 },
    { icon: Scissors, text: 'Edit Sessions', count: 5 },
    { icon: Film, text: 'Color Grading', count: 3 },
    { icon: FileVideo, text: 'VFX Shots', count: 8 }
  ];

  const projectManagement = [
    { icon: Calendar, text: 'Schedule', count: 1 },
    { icon: Clock, text: 'Timelines', count: 3 },
    { icon: Users, text: 'Team', count: 8 },
    { icon: HardDrive, text: 'Workspace', count: 5 },
    { icon: Settings, text: 'Settings', count: 1 }
  ];

  return (
    <div className="w-64 bg-gray-900 border-r border-gray-700 p-4">
      <div className="space-y-4">
        <div>
          <button 
            onClick={() => toggleSection('home')}
            className="w-full flex items-center justify-between text-gray-300 mb-2 hover:text-white"
          >
            <div className="flex items-center gap-2">
              <Home size={16} />
              <span className="text-sm font-medium">Home</span>
            </div>
            <ChevronDown size={16} className={`transform transition-transform ${!sectionsOpen.home ? '-rotate-90' : ''}`} />
          </button>
          {sectionsOpen.home && (
            <div className="space-y-1">
              {homeSection.map((item) => (
                <button
                  key={item.text}
                  onClick={() => handleItemClick(item.text)}
                  className={`w-full flex items-center justify-between p-2 rounded text-gray-400 hover:bg-gray-800 
                    ${activeItem === item.text ? 'bg-gray-800 text-white' : ''}`}
                >
                  <div className="flex items-center gap-2">
                    <item.icon size={16} />
                    <span className="text-sm">{item.text}</span>
                  </div>
                  <span className="text-xs bg-gray-800 px-1.5 py-0.5 rounded">{item.count}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <button 
            onClick={() => toggleSection('production')}
            className="w-full flex items-center justify-between text-gray-300 mb-2 hover:text-white"
          >
            <span className="text-sm font-medium">Production Tasks</span>
            <ChevronDown size={16} className={`transform transition-transform ${!sectionsOpen.production ? '-rotate-90' : ''}`} />
          </button>
          {sectionsOpen.production && (
            <div className="space-y-1">
              {productionTasks.map((item) => (
                <button
                  key={item.text}
                  onClick={() => handleItemClick(item.text)}
                  className={`w-full flex items-center justify-between p-2 rounded text-gray-400 hover:bg-gray-800 
                    ${activeItem === item.text ? 'bg-gray-800 text-white' : ''}`}
                >
                  <div className="flex items-center gap-2">
                    <item.icon size={16} />
                    <span className="text-sm">{item.text}</span>
                  </div>
                  <span className="text-xs bg-gray-800 px-1.5 py-0.5 rounded">{item.count}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <button 
            onClick={() => toggleSection('management')}
            className="w-full flex items-center justify-between text-gray-300 mb-2 hover:text-white"
          >
            <span className="text-sm font-medium">Project Management</span>
            <ChevronDown size={16} className={`transform transition-transform ${!sectionsOpen.management ? '-rotate-90' : ''}`} />
          </button>
          {sectionsOpen.management && (
            <div className="space-y-1">
              {projectManagement.map((item) => (
                <button
                  key={item.text}
                  onClick={() => handleItemClick(item.text)}
                  className={`w-full flex items-center justify-between p-2 rounded text-gray-400 hover:bg-gray-800
                    ${activeItem === item.text ? 'bg-gray-800 text-white' : ''}`}
                >
                  <div className="flex items-center gap-2">
                    <item.icon size={16} />
                    <span className="text-sm">{item.text}</span>
                  </div>
                  <span className="text-xs bg-gray-800 px-1.5 py-0.5 rounded">{item.count}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
