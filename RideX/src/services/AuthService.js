const USER_DATA_KEY = 'userData';
const TOKEN_KEY = 'authToken';

const registerUser = (userData) => { 
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
    return true;
};

const loginUser = (username, password) => {
    const storedData = JSON.parse(localStorage.getItem(USER_DATA_KEY));
    
    if (storedData && storedData.email === username && storedData.password === password) {
        localStorage.setItem(TOKEN_KEY, 'user_session_token_123');
        return true;
    }
    return false;
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem(USER_DATA_KEY));
};

const logoutUser = () => {
    localStorage.removeItem(TOKEN_KEY);
};

const isAuthenticated = () => {
    return localStorage.getItem(TOKEN_KEY) !== null;
};

export default {
    registerUser,
    loginUser,
    logoutUser,
    isAuthenticated,
    getCurrentUser,
};