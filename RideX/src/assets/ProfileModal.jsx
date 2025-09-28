import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import AuthService from '../services/AuthService'; // Import Auth Service

function ProfileModal ({ open, Closed }) {
    const currentUser = AuthService.getCurrentUser() || {}; // Load current user data

    // Initialize state with user data or empty strings
    const [name, setName] = useState(currentUser.name || "");
    const [email, setEmail] = useState(currentUser.email || "");
    const [age, setAge] = useState(currentUser.age || "");
    const [gender, setGender] = useState(currentUser.gender || "Male");
    const [phone, setPhone] = useState(currentUser.phone || "");
    const [address, setAddress] = useState(currentUser.address || "");
    const [isEditing, setIsEditing] = useState(false);
    
    // Crucial: Update state when modal opens to ensure fresh data is shown
    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAge(user.age);
            setGender(user.gender);
            setPhone(user.phone);
            setAddress(user.address);
        }
    }, [open]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Data to save back to local storage (mimicking a database update)
        const updatedUserData = {
            ...currentUser, // Keep password and other existing fields
            name, email, age, gender, phone, address
        };
        
        AuthService.registerUser(updatedUserData); // Use register to overwrite saved data
        
        console.log("Profile updated and saved locally.");
        setIsEditing(false);
        Closed();
    };

    // --- Modal Styles (Unchanged for brevity, assumed from previous step) ---
    const PopUP = {
        position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        backgroundColor: '#FFF', padding: '30px 40px', borderRadius: '10px',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)', 
        zIndex: 1001, minWidth: '400px', maxWidth: '600px',
        maxHeight: '90vh', overflowY: 'auto'
    }
    const OVERLAY_STYLES = {
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, .7)', zIndex: 1000
    }
    const inputStyle = { width: '100%', padding: '10px 12px', borderRadius: '4px', boxSizing: 'border-box', marginBottom: '15px' };
    const labelStyle = { display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#333', fontSize: '0.9rem' };
    // ------------------------------------------------------------------------

    if (!open) return null;

    const modalContent = (
        <> 
            <div style={OVERLAY_STYLES} onClick={Closed}/>
            <div style={PopUP}>
                <h2 style={{ borderBottom: '2px solid #5849ff', paddingBottom: '10px', marginBottom: '25px', color: '#5849ff', fontSize: '1.8rem' }}>
                    Edit Profile
                </h2>

                <form onSubmit={handleSubmit}>
                    
                    {/* Name */}
                    <div style={{ marginBottom: '15px' }}>
                        <label style={labelStyle}>Full Name:</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} readOnly={!isEditing} style={{ ...inputStyle, border: isEditing ? '1px solid #5849ff' : '1px solid #ccc' }}/>
                    </div>
                    
                    {/* Email */}
                    <div style={{ marginBottom: '15px' }}>
                        <label style={labelStyle}>Email Address:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} readOnly={!isEditing} style={{ ...inputStyle, border: isEditing ? '1px solid #5849ff' : '1px solid #ccc' }}/>
                    </div>
                    
                    {/* Phone Number */}
                    <div style={{ marginBottom: '15px' }}>
                        <label style={labelStyle}>Phone Number:</label>
                        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} readOnly={!isEditing} style={{ ...inputStyle, border: isEditing ? '1px solid #5849ff' : '1px solid #ccc' }}/>
                    </div>

                    <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
                        {/* Age */}
                        <div style={{ flex: 1 }}>
                            <label style={labelStyle}>Age:</label>
                            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} readOnly={!isEditing} style={{ ...inputStyle, border: isEditing ? '1px solid #5849ff' : '1px solid #ccc', marginBottom: '0' }}/>
                        </div>

                        {/* Gender */}
                        <div style={{ flex: 1 }}>
                            <label style={labelStyle}>Gender:</label>
                            <select value={gender} onChange={(e) => setGender(e.target.value)} disabled={!isEditing} style={{ ...inputStyle, border: isEditing ? '1px solid #5849ff' : '1px solid #ccc', height: '40px', background: 'white', appearance: 'none', marginBottom: '0' }}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                    
                    {/* Address */}
                    <div style={{ marginBottom: '25px' }}>
                        <label style={labelStyle}>Address:</label>
                        <textarea value={address} onChange={(e) => setAddress(e.target.value)} readOnly={!isEditing} rows="3" style={{ ...inputStyle, border: isEditing ? '1px solid #5849ff' : '1px solid #ccc', resize: 'vertical' }}/>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
                        <button 
                            type="button"
                            onClick={() => setIsEditing(prev => !prev)}
                            style={{ background: '#ddd', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}
                        >
                            {isEditing ? 'Cancel Edit' : 'Edit Details'}
                        </button>
                        
                        <button 
                            type="submit"
                            disabled={!isEditing}
                            style={{ 
                                background: isEditing ? '#5849ff' : '#ccc', 
                                color: 'white', 
                                border: 'none', 
                                padding: '10px 20px', 
                                borderRadius: '5px', 
                                cursor: isEditing ? 'pointer' : 'default' 
                            }}
                        >
                            Save Changes
                        </button>
                    </div>
                    
                    <button 
                        onClick={Closed}
                        style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', fontSize: '1.8rem', cursor: 'pointer', color: '#aaa' }}
                    >&times;</button>
                </form>
            </div>
        </>
    );

    const portalRoot = document.getElementById('root-profile');
    if (!portalRoot) return null;
    
    return ReactDom.createPortal(modalContent, portalRoot);
}

export default ProfileModal;