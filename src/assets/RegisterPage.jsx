// src/assets/RegisterPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // NEW STATES for all profile details:
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('Male');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        setError('');

        const userData = {
            email: username, // Storing username as email
            password,
            name,
            age,
            gender,
            phone,
            address
        };

        if (AuthService.registerUser(userData)) {
            alert('Registration successful! Please log in.');
            navigate('/login');
        } else {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div style={{ padding: '50px', maxWidth: '600px', margin: '50px auto', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h2>User Registration</h2>
            <form onSubmit={handleRegister}>
                <div style={{ marginBottom: '15px' }}>
                    <label>Username (Email):</label>
                    <input type="email" value={username} onChange={(e) => setUsername(e.target.value)} required style={{ width: '100%', padding: '10px' }}/>
                </div>
                <div style={{ marginBottom: '25px' }}>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '10px' }}/>
                </div>
                
                {/* --- Profile Details Input --- */}
                <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '5px', marginBottom: '20px', fontSize: '1.2rem' }}>Personal Details</h3>
                
                <div style={{ display: 'flex', gap: '20px' }}>
                    <div style={{ flex: 1, marginBottom: '15px' }}>
                        <label>Full Name:</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: '100%', padding: '10px' }}/>
                    </div>
                    <div style={{ flex: 1, marginBottom: '15px' }}>
                        <label>Phone Number:</label>
                        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required style={{ width: '100%', padding: '10px' }}/>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
                    <div style={{ flex: 1 }}>
                        <label>Age:</label>
                        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required style={{ width: '100%', padding: '10px' }}/>
                    </div>
                    <div style={{ flex: 1 }}>
                        <label>Gender:</label>
                        <select value={gender} onChange={(e) => setGender(e.target.value)} required style={{ width: '100%', padding: '10px' }}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>
                
                <div style={{ marginBottom: '25px' }}>
                    <label>Address:</label>
                    <textarea value={address} onChange={(e) => setAddress(e.target.value)} required rows="3" style={{ width: '100%', padding: '10px' }}/>
                </div>
                
                {/* --- End Profile Details Input --- */}

                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" style={{ background: '#5849ff', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Register
                </button>
            </form>
            <p style={{ marginTop: '20px' }}>
                Already have an account? <a href="/login">Login here</a>
            </p>
        </div>
    );
}

export default RegisterPage;