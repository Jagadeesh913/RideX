import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

function LoginPage({ onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            if (AuthService.loginUser(username, password)) {
                onLoginSuccess();
                navigate('/');
            } else {
                setError('Invalid username or password.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const styles = {
        container: {
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            padding: '20px'
        },
        
        loginCard: {
            backgroundColor: 'white',
            borderRadius: '16px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            padding: '48px',
            width: '100%',
            maxWidth: '400px',
            position: 'relative',
            overflow: 'hidden'
        },

        cardOverlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #5849ff 0%, #764ba2 100%)'
        },

        header: {
            textAlign: 'center',
            marginBottom: '32px'
        },

        title: {
            fontSize: '28px',
            fontWeight: '700',
            color: '#1f2937',
            marginBottom: '8px',
            letterSpacing: '-0.025em'
        },

        subtitle: {
            fontSize: '16px',
            color: '#6b7280',
            fontWeight: '400'
        },

        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
        },

        inputGroup: {
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
        },

        label: {
            fontSize: '14px',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '4px'
        },

        input: {
            width: '100%',
            padding: '12px 16px',
            fontSize: '16px',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            transition: 'all 0.2s ease-in-out',
            backgroundColor: '#ffffff',
            outline: 'none',
            boxSizing: 'border-box'
        },

        inputFocus: {
            borderColor: '#5849ff',
            boxShadow: '0 0 0 3px rgba(88, 73, 255, 0.1)'
        },

        inputError: {
            borderColor: '#ef4444',
            backgroundColor: '#fef2f2'
        },

        button: {
            width: '100%',
            padding: '14px 20px',
            fontSize: '16px',
            fontWeight: '600',
            color: 'white',
            background: isLoading 
                ? 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)'
                : 'linear-gradient(135deg, #5849ff 0%, #764ba2 100%)',
            border: 'none',
            borderRadius: '8px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease-in-out',
            position: 'relative',
            overflow: 'hidden'
        },

        buttonHover: {
            transform: 'translateY(-1px)',
            boxShadow: '0 10px 25px rgba(88, 73, 255, 0.3)'
        },

        buttonActive: {
            transform: 'translateY(0)'
        },

        errorMessage: {
            color: '#ef4444',
            fontSize: '14px',
            fontWeight: '500',
            textAlign: 'center',
            padding: '12px',
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '8px',
            marginTop: '-8px'
        },

        footer: {
            textAlign: 'center',
            marginTop: '32px',
            paddingTop: '24px',
            borderTop: '1px solid #f3f4f6'
        },

        footerText: {
            fontSize: '14px',
            color: '#6b7280'
        },

        link: {
            color: '#5849ff',
            textDecoration: 'none',
            fontWeight: '600',
            transition: 'color 0.2s ease-in-out'
        },

        linkHover: {
            color: '#4338ca',
            textDecoration: 'underline'
        },

        loader: {
            display: 'inline-block',
            width: '16px',
            height: '16px',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            borderTop: '2px solid white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginRight: '8px'
        },

        // Keyframe animation would need to be added via CSS-in-JS library or style tag
        '@keyframes spin': {
            '0%': { transform: 'rotate(0deg)' },
            '100%': { transform: 'rotate(360deg)' }
        }
    };

    // Add keyframes for spinner animation
    React.useEffect(() => {
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(styleSheet);
        return () => document.head.removeChild(styleSheet);
    }, []);

    return (
        <div style={styles.container}>
            <div style={styles.loginCard}>
                <div style={styles.cardOverlay}></div>
                
                <div style={styles.header}>
                    <h1 style={styles.title}>Welcome Back</h1>
                    <p style={styles.subtitle}>Sign in to your account</p>
                </div>

                <form style={styles.form} onSubmit={handleLogin}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Email Address</label>
                        <input
                            type="email"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="Enter your email"
                            style={{
                                ...styles.input,
                                ...(error && styles.inputError)
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#5849ff';
                                e.target.style.boxShadow = '0 0 0 3px rgba(88, 73, 255, 0.1)';
                            }}
                            onBlur={(e) => {
                                if (!error) {
                                    e.target.style.borderColor = '#e5e7eb';
                                    e.target.style.boxShadow = 'none';
                                }
                            }}
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                            style={{
                                ...styles.input,
                                ...(error && styles.inputError)
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#5849ff';
                                e.target.style.boxShadow = '0 0 0 3px rgba(88, 73, 255, 0.1)';
                            }}
                            onBlur={(e) => {
                                if (!error) {
                                    e.target.style.borderColor = '#e5e7eb';
                                    e.target.style.boxShadow = 'none';
                                }
                            }}
                        />
                    </div>

                    {error && (
                        <div style={styles.errorMessage}>
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        style={styles.button}
                        onMouseEnter={(e) => {
                            if (!isLoading) {
                                e.target.style.transform = 'translateY(-1px)';
                                e.target.style.boxShadow = '0 10px 25px rgba(88, 73, 255, 0.3)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = 'none';
                        }}
                        onMouseDown={(e) => {
                            e.target.style.transform = 'translateY(0)';
                        }}
                    >
                        {isLoading && (
                            <span style={styles.loader}></span>
                        )}
                        {isLoading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>

                <div style={styles.footer}>
                    <p style={styles.footerText}>
                        Don't have an account?{' '}
                        <a
                            href="/register"
                            style={styles.link}
                            onMouseEnter={(e) => {
                                e.target.style.color = '#4338ca';
                                e.target.style.textDecoration = 'underline';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.color = '#5849ff';
                                e.target.style.textDecoration = 'none';
                            }}
                        >
                            Create one here
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;