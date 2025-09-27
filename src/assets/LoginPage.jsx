import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService'; // ADJUSTED PATH

function LoginPage({ onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');

        if (AuthService.loginUser(username, password)) {
            onLoginSuccess();
            navigate('/');
        } else {
            setError('Invalid username or password.');
        }
    };

    return (
        <div style={{ padding: '50px', maxWidth: '400px', margin: '50px auto', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h2>User Login</h2>
            <form onSubmit={handleLogin}>
                <div style={{ marginBottom: '15px' }}>
                    <label>Username (Email):</label>
                    <input 
                        type="email" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                        style={{ width: '100%', padding: '10px' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        style={{ width: '100%', padding: '10px' }}
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" style={{ background: '#5849ff', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Login
                </button>
            </form>
            <p style={{ marginTop: '20px' }}>
                Need an account? <a href="/register">Register here</a>
            </p>
        </div>
    );
}

export default LoginPage;