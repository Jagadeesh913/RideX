import React, { useState } from 'react';
import '../Css/DealerRegistration.css';
import { Eye, EyeOff, Zap, Shield, AlertCircle, ArrowRight, Phone, Building, MapPin } from 'lucide-react';

const DealerRegistration = ({ onRegistrationSuccess, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    dealershipName: '', ownerName: '', email: '', phone: '', address: '', city: '', state: '', zipCode: '', password: '', confirmPassword: '', agreeToTerms: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const updateField = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateFields = () => {
    const newErrors = {};
    const validations = [
      ['dealershipName', 'Dealership name is required'],
      ['ownerName', 'Owner name is required'],
      ['email', !formData.email.trim() ? 'Email is required' : !formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ? 'Invalid email format' : ''],
      ['phone', 'Phone number is required'],
      ['address', 'Address is required'],
      ['city', 'City is required'],
      ['state', 'State is required'],
      ['zipCode', 'ZIP code is required'],
      ['password', !formData.password ? 'Password is required' : formData.password.length < 8 ? 'Password must be at least 8 characters' : ''],
      ['confirmPassword', formData.password !== formData.confirmPassword ? 'Passwords do not match' : ''],
      ['agreeToTerms', !formData.agreeToTerms ? 'You must agree to the terms' : '']
    ];

    validations.forEach(([field, error]) => {
      if (field === 'email' && formData.email.trim()) {
        if (error) newErrors[field] = error;
      } else if (field === 'password' && formData.password) {
        if (error) newErrors[field] = error;
      } else if (field === 'confirmPassword') {
        if (error) newErrors[field] = error;
      } else if (field === 'agreeToTerms') {
        if (error) newErrors[field] = error;
      } else if (!formData[field].trim() && error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;
    
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Registration completed successfully! You can now login to your dealer account.');
      if (onRegistrationSuccess) {
        onRegistrationSuccess({ dealerId: Math.floor(Math.random() * 10000), ...formData });
      }
    } catch (error) {
      console.error('Registration failed:', error);
      setErrors({ general: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const createInput = (name, type, placeholder, showToggle = false, toggleState = false, toggleFn = null) => (
    <div>
      <label>{name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).replace('Dealership Name', 'Dealership Name').replace('Owner Name', 'Owner Name').replace('Email', 'Email Address').replace('Phone', 'Phone Number').replace('Address', 'Address').replace('City', 'City').replace('State', 'State').replace('Zip Code', 'ZIP Code').replace('Password', type === 'password' && name === 'password' ? 'Password' : 'Confirm Password')}</label>
      <div className={showToggle ? "input-wrapper" : ""}>
        <input
          type={showToggle ? (toggleState ? 'text' : 'password') : type}
          name={name}
          value={formData[name]}
          onChange={updateField}
          placeholder={placeholder}
          className={`registration-input ${errors[name] ? 'input-error' : ''}`}
        />
        {showToggle && (
          <button type="button" onClick={() => toggleFn(!toggleState)} className="password-toggle">
            {toggleState ? <EyeOff /> : <Eye />}
          </button>
        )}
      </div>
      {errors[name] && <p className="error-text">{errors[name]}</p>}
    </div>
  );

  const sectionData = [
    {
      title: "Business Information",
      icon: <Building className="section-icon" />,
      fields: [
        { name: 'dealershipName', type: 'text', placeholder: 'Enter dealership name' },
        { name: 'ownerName', type: 'text', placeholder: "Enter owner's full name" }
      ]
    },
    {
      title: "Contact Information", 
      icon: <Phone className="section-icon" />,
      fields: [
        { name: 'email', type: 'email', placeholder: 'Enter email address' },
        { name: 'phone', type: 'tel', placeholder: 'Enter phone number' }
      ]
    },
    {
      title: "Location Information",
      icon: <MapPin className="section-icon" />,
      fields: [
        { name: 'address', type: 'text', placeholder: 'Enter full address', fullWidth: true },
        { name: 'city', type: 'text', placeholder: 'Enter city', group: 'location' },
        { name: 'state', type: 'text', placeholder: 'Enter state', group: 'location' },
        { name: 'zipCode', type: 'text', placeholder: 'Enter ZIP code', group: 'location' }
      ]
    },
    {
      title: "Security Information",
      icon: <Shield className="section-icon" />,
      fields: [
        { name: 'password', type: 'password', placeholder: 'Create a strong password', showToggle: true },
        { name: 'confirmPassword', type: 'password', placeholder: 'Confirm your password', showToggle: true }
      ]
    }
  ];

  return (
    <div className="registration-container">
      <div className="registration-bg">
        {[1, 2, 3].map(i => <div key={i} className={`registration-bg-blob blob${i}`}></div>)}
      </div>

      <div className="registration-wrapper">
        <div className="registration-header">
          <div className="registration-logo-container">
            <div className="registration-logo"><Zap className="logo-icon" /></div>
            <div>
              <h1 className="logo-title">RideX</h1>
              <p className="logo-subtitle">Dealer Registration</p>
            </div>
          </div>
        </div>

        <div className="registration-card">
          <div className="card-header form-section">
            <div className="card-icon"><Building className="icon" /></div>
            <div>
              <h2 className="card-title">Create Dealer Account</h2>
              <p className="card-subtitle">Join the RideX dealer network</p>
            </div>
          </div>

          {errors.general && (
            <div className="error-box">
              <AlertCircle className="error-icon" />
              <p>{errors.general}</p>
            </div>
          )}

          <form onSubmit={submitForm} className="form">
            {sectionData.map((section, idx) => (
              <div key={idx} className="form-section">
                <h3 className="section-title">{section.icon}{section.title}</h3>
                {section.title === "Location Information" ? (
                  <div className="form-grid-single">
                    {createInput('address', 'text', 'Enter full address')}
                    <div className="form-grid-3">
                      {section.fields.slice(1).map(field => createInput(field.name, field.type, field.placeholder))}
                    </div>
                  </div>
                ) : (
                  <div className="form-grid">
                    {section.fields.map(field => 
                      field.showToggle 
                        ? createInput(field.name, field.type, field.placeholder, true, 
                          field.name === 'password' ? showPassword : showConfirmPassword,
                          field.name === 'password' ? setShowPassword : setShowConfirmPassword)
                        : createInput(field.name, field.type, field.placeholder)
                    )}
                  </div>
                )}
              </div>
            ))}

            <div className="form-section">
              <label className="terms">
                <input type="checkbox" name="agreeToTerms" checked={formData.agreeToTerms} onChange={updateField} />
                <span>I agree to the <button type="button" className="link">Terms of Service</button> and <button type="button" className="link">Privacy Policy</button></span>
              </label>
              {errors.agreeToTerms && <p className="error-text">{errors.agreeToTerms}</p>}
            </div>

            <button type="submit" disabled={isLoading} className="registration-btn">
              {isLoading ? (
                <div className="loading"><div className="spinner"></div>Creating Account...</div>
              ) : (
                <div className="btn-content">Create Dealer Account <ArrowRight /></div>
              )}
            </button>
          </form>

          <div className="form-footer">
            <span>Already have an account? </span>
            <button onClick={onSwitchToLogin} className="link">Sign In Here</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealerRegistration;