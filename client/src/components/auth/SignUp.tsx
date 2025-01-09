import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SignUpProps {
    onSignUpSuccess: () => void; // Callback to notify successful sign-up or login
}

const SignUp: React.FC<SignUpProps> = ({ onSignUpSuccess }) => {
    const [error, setError] = useState<string | null>(null);
    const [showLogin, setShowLogin] = useState<boolean>(false); // Toggle between login and sign-up forms
    const navigate = useNavigate();

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null); // Only for sign-up
    const emailRef = useRef<HTMLInputElement>(null); // Only for sign-up

    // Handle sign-up form submission
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
            const response = await fetch('http://localhost:8080/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                    name,
                    email,
                }),
            });

            if (response.ok) {
                onSignUpSuccess();
                navigate('/dashboard'); // Redirect to dashboard
            } else if (response.status === 409) {
                setError('Username already exists. Try logging in.');
            } else {
                setError('An error occurred. Please try again.');
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            setError('An unexpected error occurred. Please check your connection.');
        }
    };

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

            if (response.ok) {
                onSignUpSuccess();
                navigate('/dashboard'); // Redirect to dashboard
            } else {
                setError('Invalid username or password. Please try again.');
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
                backgroundColor: '#f9f9f9',
            }}
        >
            <h2 style={{ textAlign: 'center' }}>{showLogin ? 'Log In' : 'Sign Up'}</h2>
            {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
            {showLogin ? (
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
                        <label htmlFor="name">Full Name</label>
                        <input
                            id="name"
                            type="text"
                            ref={nameRef}
                            placeholder="Enter full name"
                            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            ref={emailRef}
                            placeholder="Enter your email"
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
                        Sign Up
                    </button>
                    <p style={{ marginTop: '16px', textAlign: 'center' }}>
                        Already have an account?{' '}
                        <span
                            style={{ color: '#6200ea', cursor: 'pointer' }}
                            onClick={() => setShowLogin(true)}
                        >
                            Log In
                        </span>
                    </p>
                </form>
            )}
        </div>
    );
};

export default SignUp;
