import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignUp from './components/auth/SignUp';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/sidebar/Sidebar';
import { WorkflowEditor } from './components/workflow/WorkflowEditor';
import { Dashboard } from './components/dashboard/Dashboard';
import { Team } from './components/team/team';
import { Workspace } from './components/workspace/Workspace';
import Button from '@mui/material/Button';

type Page = 'dashboard' | 'workflow' | 'team' | 'workspace';

function App() {
    const [currentPage, setCurrentPage] = useState<Page>('dashboard');
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const handleLogout = () => {
        setIsLoggedIn(false); // Log out the user
    };

    const handlePageChange = (page: Page) => {
        setCurrentPage(page); // Update the current page
    };

    return (
        <Router>
            <Routes>
                {!isLoggedIn ? (
                    <Route
                        path="*"
                        element={<SignUp onSignUpSuccess={() => setIsLoggedIn(true)} />}
                    />
                ) : (
                    <Route
                        path="*"
                        element={
                            <div className="h-screen flex flex-col bg-gray-900 text-white">
                                <Header />
                                <Button
                                    onClick={handleLogout}
                                    style={{
                                        position: 'absolute',
                                        top: '10px',
                                        right: '10px',
                                        backgroundColor: 'white',
                                        color: 'black',
                                    }}
                                >
                                    Logout
                                </Button>
                                <div className="flex-1 flex overflow-hidden">
                                    <Sidebar onPageChange={handlePageChange} />
                                    {currentPage === 'dashboard' && <Dashboard />}
                                    {currentPage === 'workflow' && <WorkflowEditor stages={[]} />}
                                    {currentPage === 'team' && <Team />}
                                    {currentPage === 'workspace' && <Workspace />}
                                </div>
                            </div>
                        }
                    />
                )}
                {isLoggedIn && <Route path="/" element={<Navigate to="/dashboard" />} />}
            </Routes>
        </Router>
    );
}

export default App;