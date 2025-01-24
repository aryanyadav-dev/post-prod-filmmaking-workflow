// import { useState } from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider, useAuth } from './context/AuthContext';
// import { Header } from './components/layout/Header';
// import { Sidebar } from './components/sidebar/Sidebar';
// import { WorkflowEditor } from './components/workflow/WorkflowEditor';
// import { Dashboard } from './components/dashboard/Dashboard';
// import { Team } from './components/team/team';
// import { Workspace } from './components/workspace/Workspace';
// import { Login } from './components/auth_pages/Login.tsx';
// import { Register } from './components/auth_pages/Register.tsx';
// import { Stage } from './types';
//
// type Page = 'dashboard' | 'workflow' | 'team' | 'workspace' | 'kanban-board';
//
// // Protected Layout Component
// const ProtectedLayout = () => {
//     const { isAuthenticated } = useAuth();
//     const [currentPage, setCurrentPage] = useState<Page>('dashboard');
//
//     const stages: Stage[] = [
//         {
//             id: '1',
//             name: 'Footage Import',
//             status: 'active',
//             tasks: [
//                 {
//                     id: '1',
//                     title: 'Import Raw Footage',
//                     status: 'in-progress',
//                     priority: 'high',
//                     description: 'Transfer 4K footage from RED camera cards',
//                 },
//                 {
//                     id: '2',
//                     title: 'Create Proxy Files',
//                     status: 'todo',
//                     priority: 'medium',
//                     description: 'Generate 1080p proxy files for editing',
//                 },
//             ],
//         },
//         // ... (rest of your stages remain the same)
//     ];
//
//     const handlePageChange = (page: Page) => {
//         if (page === 'kanban-board') {
//             setCurrentPage('team');
//         } else {
//             setCurrentPage(page);
//         }
//     };
//
//     // If not authenticated, redirect to login
//     if (!isAuthenticated) {
//         return <Navigate to="/login" replace />;
//     }
//
//     return (
//         <div className="h-screen flex flex-col bg-gray-900 text-white">
//             <Header />
//             <div className="flex-1 flex overflow-hidden">
//                 <Sidebar onPageChange={handlePageChange} />
//                 <main className="flex-1 overflow-auto">
//                     {currentPage === 'dashboard' && <Dashboard />}
//                     {currentPage === 'workflow' && <WorkflowEditor stages={stages} />}
//                     {currentPage === 'team' && <Team />}
//                     {currentPage === 'workspace' && <Workspace />}
//                 </main>
//             </div>
//         </div>
//     );
// };
//
// // Main App Component
// function App() {
//     return (
//         <AuthProvider>
//             <BrowserRouter>
//                 <Routes>
//                     {/* Public Routes */}
//                     <Route path="/login" element={<Login />} />
//                     <Route path="/register" element={<Register />} />
//
//                     {/* Protected Routes */}
//                     <Route path="/" element={<ProtectedLayout />} />
//                     <Route path="/dashboard" element={<ProtectedLayout />} />
//                     <Route path="/workflow" element={<ProtectedLayout />} />
//                     <Route path="/team" element={<ProtectedLayout />} />
//                     <Route path="/workspace" element={<ProtectedLayout />} />
//
//                     {/* Catch-all redirect */}
//                     <Route path="*" element={<Navigate to="/login" replace />} />
//                 </Routes>
//             </BrowserRouter>
//         </AuthProvider>
//     );
// }
//
// export default App;

import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Router } from '../src/components/Router';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Router />
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
