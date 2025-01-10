import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext.tsx'; // Adjust path based on your structure
import apiClient from './../../axiosConfig.ts'; // Axios instance
import { AxiosError } from 'axios'; // For typing the error accurately

const SignUp: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const [showLogin, setShowLogin] = useState<boolean>(false); // Ensure correct typing
    const navigate = useNavigate();
    const { setIsLoggedIn } = useAuth();

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null); // Only used for sign-up
    const emailRef = useRef<HTMLInputElement>(null); // Only used for sign-up

    const handleSignUpSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);

        const username = usernameRef.current?.value || '';
        const password = passwordRef.current?.value || '';
        const name = nameRef.current?.value || '';
        const email = emailRef.current?.value || '';

        if (!username || !password || !name || !email) {
            setError('All fields are required for sign-up.');
            return;
        }

        try {
            // Axios POST request for sign-up
            await apiClient.post('/register', { username, password, name, email });
            setIsLoggedIn(true); // Set authentication state
            navigate('/'); // Redirect to App component (root path)
        } catch (err) {
            const error = err as AxiosError; // Type the error properly
            if (error.response?.status === 409) {
                setError('Username already exists. Try logging in.');
            } else {
                setError('An error occurred. Please try again.');
            }
        }
    };

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
            // Axios POST request for login
            await apiClient.post('/login', { username, password });
            setIsLoggedIn(true); // Set authentication state
            navigate('/'); // Redirect to App component (root path)
        } catch (err) {
            const axiosError = err as AxiosError; // Using the casted error directly
            if (axiosError.response?.status === 401) {
                setError('Invalid username or password. Please try again.');
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
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
                backgroundColor: '#f9f9f9',
            }}
        >
            <h2 style={{ textAlign: 'center' }}>{showLogin ? 'Log In' : 'Sign Up'}</h2>
            {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
            {showLogin ? (
                <form onSubmit={handleLoginSubmit}>
                    {/* Login Form */}
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
                            placeholder="Enter password"
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
                    <p style={{ marginTop: '16px', textAlign: 'center' }}>
                        Don’t have an account?{' '}
                        <span
                            style={{ color: '#6200ea', cursor: 'pointer' }}
                            onClick={() => setShowLogin(false)}
                        >
              Sign Up
            </span>
                    </p>
                </form>
            ) : (
                <form onSubmit={handleSignUpSubmit}>
                    {/* Sign Up Form */}
                    {/* Similar styling as before */}
                </form>
            )}
        </div>
    );
};

export default SignUp;