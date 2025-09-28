import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

function RegisterPage() {
    const [formData, setFormData] = useState({
        username: '', password: '', confirmPassword: '', name: '', 
        age: '', gender: 'Male', phone: '', address: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const navigate = useNavigate();

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const validateForm = () => {
        const errors = {};
        if (formData.password.length < 8) errors.password = 'Password must be at least 8 characters long';
        if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Passwords do not match';
        if (formData.phone.length < 10) errors.phone = 'Please enter a valid phone number';
        if (formData.age < 18 || formData.age > 120) errors.age = 'Age must be between 18 and 120';
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        if (!validateForm()) return;
        setIsLoading(true);

        const userData = {
            email: formData.username, password: formData.password, name: formData.name,
            age: formData.age, gender: formData.gender, phone: formData.phone, address: formData.address
        };

        try {
            if (AuthService.registerUser(userData)) {
                alert('Registration successful! Please log in.');
                navigate('/login');
            } else {
                setError('Registration failed. Please try again.');
            }
        } catch (err) {
            setError('An error occurred during registration. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const styles = {
        container: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', padding: '20px' },
        registerCard: { backgroundColor: 'white', borderRadius: '20px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', padding: '48px', width: '100%',
            maxWidth: '700px', position: 'relative', overflow: 'hidden', margin: '20px 0' },
        cardOverlay: { position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
            background: 'linear-gradient(90deg, #5849ff 0%, #764ba2 100%)' },
        header: { textAlign: 'center', marginBottom: '40px' },
        title: { fontSize: '32px', fontWeight: '700', color: '#1f2937', marginBottom: '8px', letterSpacing: '-0.025em' },
        subtitle: { fontSize: '16px', color: '#6b7280', fontWeight: '400' },
        form: { display: 'flex', flexDirection: 'column', gap: '32px' },
        section: { display: 'flex', flexDirection: 'column', gap: '24px' },
        sectionTitle: { fontSize: '20px', fontWeight: '600', color: '#374151',
            borderBottom: '2px solid #e5e7eb', paddingBottom: '12px', marginBottom: '8px' },
        row: { display: 'flex', gap: '20px', '@media (max-width: 640px)': { flexDirection: 'column', gap: '24px' } },
        inputGroup: { display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 },
        label: { fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '4px' },
        input: { width: '100%', padding: '12px 16px', fontSize: '16px', border: '2px solid #e5e7eb',
            borderRadius: '8px', transition: 'all 0.2s ease-in-out', backgroundColor: '#ffffff',
            outline: 'none', boxSizing: 'border-box' },
        textarea: { width: '100%', padding: '12px 16px', fontSize: '16px', border: '2px solid #e5e7eb',
            borderRadius: '8px', transition: 'all 0.2s ease-in-out', backgroundColor: '#ffffff',
            outline: 'none', boxSizing: 'border-box', resize: 'vertical', minHeight: '80px' },
        select: { width: '100%', padding: '12px 16px', fontSize: '16px', border: '2px solid #e5e7eb',
            borderRadius: '8px', transition: 'all 0.2s ease-in-out', backgroundColor: '#ffffff',
            outline: 'none', boxSizing: 'border-box', cursor: 'pointer' },
        inputError: { borderColor: '#ef4444', backgroundColor: '#fef2f2' },
        validationError: { color: '#ef4444', fontSize: '12px', marginTop: '4px', fontWeight: '500' },
        button: { width: '100%', padding: '16px 24px', fontSize: '18px', fontWeight: '600', color: 'white',
            background: isLoading ? 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)' 
                : 'linear-gradient(135deg, #5849ff 0%, #764ba2 100%)',
            border: 'none', borderRadius: '12px', cursor: isLoading ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease-in-out', position: 'relative', overflow: 'hidden', marginTop: '8px' },
        errorMessage: { color: '#ef4444', fontSize: '14px', fontWeight: '500', textAlign: 'center',
            padding: '12px', backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px' },
        successMessage: { color: '#059669', fontSize: '14px', fontWeight: '500', textAlign: 'center',
            padding: '12px', backgroundColor: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '8px' },
        footer: { textAlign: 'center', marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #f3f4f6' },
        footerText: { fontSize: '14px', color: '#6b7280' },
        link: { color: '#5849ff', textDecoration: 'none', fontWeight: '600', transition: 'color 0.2s ease-in-out' },
        loader: { display: 'inline-block', width: '18px', height: '18px',
            border: '2px solid rgba(255, 255, 255, 0.3)', borderTop: '2px solid white',
            borderRadius: '50%', animation: 'spin 1s linear infinite', marginRight: '8px' },
        passwordStrength: { height: '4px', borderRadius: '2px', marginTop: '8px', background: '#e5e7eb' },
        strengthBar: { height: '100%', borderRadius: '2px', transition: 'all 0.3s ease-in-out' }
    };

    React.useEffect(() => {
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            @media (max-width: 640px) { .register-row { flex-direction: column !important; gap: 24px !important; } }`;
        document.head.appendChild(styleSheet);
        return () => document.head.removeChild(styleSheet);
    }, []);

    const getPasswordStrength = () => {
        const length = formData.password.length;
        if (length === 0) return { width: '0%', color: '#e5e7eb' };
        if (length < 4) return { width: '25%', color: '#ef4444' };
        if (length < 8) return { width: '50%', color: '#f59e0b' };
        if (length < 12) return { width: '75%', color: '#3b82f6' };
        return { width: '100%', color: '#10b981' };
    };

    const handleInputFocus = (e) => {
        e.target.style.borderColor = '#5849ff';
        e.target.style.boxShadow = '0 0 0 3px rgba(88, 73, 255, 0.1)';
    };

    const handleInputBlur = (e, fieldName) => {
        if (!validationErrors[fieldName]) {
            e.target.style.borderColor = '#e5e7eb';
            e.target.style.boxShadow = 'none';
        }
    };

    const FormInput = ({ type, field, placeholder, required = true, min, max, rows }) => (
        <div style={styles.inputGroup}>
            <label style={styles.label}>{field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</label>
            {type === 'textarea' ? (
                <textarea value={formData[field]} onChange={(e) => handleInputChange(field, e.target.value)}
                    required={required} placeholder={placeholder} rows={rows} style={styles.textarea}
                    onFocus={handleInputFocus} onBlur={(e) => handleInputBlur(e, field)} />
            ) : type === 'select' ? (
                <select value={formData[field]} onChange={(e) => handleInputChange(field, e.target.value)}
                    required={required} style={styles.select} onFocus={handleInputFocus} onBlur={(e) => handleInputBlur(e, field)}>
                    <option value="Male">Male</option><option value="Female">Female</option>
                    <option value="Other">Other</option><option value="Prefer not to say">Prefer not to say</option>
                </select>
            ) : (
                <>
                    <input type={type} value={formData[field]} onChange={(e) => handleInputChange(field, e.target.value)}
                        required={required} placeholder={placeholder} min={min} max={max}
                        style={{ ...styles.input, ...(validationErrors[field] && styles.inputError) }}
                        onFocus={handleInputFocus} onBlur={(e) => handleInputBlur(e, field)} />
                    {field === 'password' && (
                        <div style={styles.passwordStrength}>
                            <div style={{ ...styles.strengthBar, width: getPasswordStrength().width,
                                backgroundColor: getPasswordStrength().color }}></div>
                        </div>
                    )}
                </>
            )}
            {validationErrors[field] && <span style={styles.validationError}>{validationErrors[field]}</span>}
        </div>
    );

    return (
        <div style={styles.container}>
            <div style={styles.registerCard}>
                <div style={styles.cardOverlay}></div>
                <div style={styles.header}>
                    <h1 style={styles.title}>Create Account</h1>
                    <p style={styles.subtitle}>Join us today and start your journey</p>
                </div>
                <form style={styles.form} onSubmit={handleRegister}>
                    <div style={styles.section}>
                        <h3 style={styles.sectionTitle}>Account Information</h3>
                        <FormInput type="email" field="username" placeholder="Enter your email address" />
                        <div className="register-row" style={styles.row}>
                            <FormInput type="password" field="password" placeholder="Create a strong password" />
                            <FormInput type="password" field="confirmPassword" placeholder="Confirm your password" />
                        </div>
                    </div>
                    <div style={styles.section}>
                        <h3 style={styles.sectionTitle}>Personal Details</h3>
                        <div className="register-row" style={styles.row}>
                            <FormInput type="text" field="name" placeholder="Enter your full name" />
                            <FormInput type="tel" field="phone" placeholder="Enter your phone number" />
                        </div>
                        <div className="register-row" style={styles.row}>
                            <FormInput type="number" field="age" placeholder="Enter your age" min="18" max="120" />
                            <FormInput type="select" field="gender" />
                        </div>
                        <FormInput type="textarea" field="address" placeholder="Enter your full address" rows="3" />
                    </div>
                    {error && <div style={styles.errorMessage}>{error}</div>}
                    <button type="submit" disabled={isLoading} style={styles.button}
                        onMouseEnter={(e) => !isLoading && (e.target.style.transform = 'translateY(-2px)', 
                            e.target.style.boxShadow = '0 12px 28px rgba(88, 73, 255, 0.3)')}
                        onMouseLeave={(e) => (e.target.style.transform = 'translateY(0)', e.target.style.boxShadow = 'none')}
                        onMouseDown={(e) => e.target.style.transform = 'translateY(0)'}>
                        {isLoading && <span style={styles.loader}></span>}
                        {isLoading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>
                <div style={styles.footer}>
                    <p style={styles.footerText}>Already have an account?{' '}
                        <a href="/login" style={styles.link}
                            onMouseEnter={(e) => (e.target.style.color = '#4338ca', e.target.style.textDecoration = 'underline')}
                            onMouseLeave={(e) => (e.target.style.color = '#5849ff', e.target.style.textDecoration = 'none')}>
                            Sign in here
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;