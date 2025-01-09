import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
    onLoginSuccess: () => void; // Callback to notify the parent component about successful login
}

const LoginForm: React.FC<LoginProps> = ({ onLoginSuccess }) => {
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    // Handle login form submission
    const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);

        const username = usernameRef.current?.value || '';
        const password = passwordRef.current?.value || '';

        if (!username || !password) {
            setError('Both fields are required for login.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            if (response.status === 200) {
                onLoginSuccess(); // Notify parent about successful login
                navigate('/dashboard'); // Redirect to the dashboard
            } else {
                setError('Invalid username or password. Please try again.');
            }
        } catch (err) {
            setError('An unexpected error occurred. Please check your connection.');
        }
    };

    return (
        <div
            style={{
                maxWidth: '400px',
                margin: '20px auto',
                padding: '20px',
                border: '1px solid #ddd',
                borderRadius: '8px',
            }}
        >
            <h2>Log In</h2>
            {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
            <form onSubmit={handleLoginSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        ref={usernameRef}
                        placeholder="Enter username"
                        style={{ width: '100%', padding: '8px', marginTop: '4px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        ref={passwordRef}
                        placeholder="Enter your password"
                        style={{ width: '100%', padding: '8px', marginTop: '4px' }}
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        backgroundColor: '#6200ea',
                        color: 'white',
                        padding: '10px 15px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        width: '100%',
                    }}
                >
                    Log In
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
