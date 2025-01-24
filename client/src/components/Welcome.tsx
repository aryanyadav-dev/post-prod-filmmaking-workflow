// src/components/Welcome.tsx

import React from 'react';
import { useAuth } from '../context/AuthProvider';

const Welcome = () => {
    const { isLoggedIn, user, logout } = useAuth();

    if (!isLoggedIn) {
        return <p>Please log in to access the welcome page.</p>;
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl mb-4">Welcome, {user ? user.name : 'User'}!</h2>
            <button
                onClick={logout}
                className="bg-red-500 text-white py-2 px-4"
            >
                Log Out
            </button>
        </div>
    );
};

export default Welcome;
