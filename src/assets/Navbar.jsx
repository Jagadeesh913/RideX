import React, { useState, useRef, useEffect } from 'react';
import '../Css/Navbar.css';
import ProfileModal from './ProfileModal';
import SearchSuggestions from './SearchSuggestions'; // IMPORT THE SUGGESTIONS COMPONENT

function Navbar({ isAuthenticated, onLogout, onSearchChange, currentSearchTerm }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false); 
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false); 
  
  const searchBarRef = useRef(null);
  const notificationRef = useRef(null); 
  const notificationButtonRef = useRef(null); 
  
  const loggedInLinks = [
    { name: 'Profile', actionType: 'Profile' },
    { name: 'Register/Login as Dealer', actionType: 'DealerLogin' },
    { name: 'Logout', actionType: 'Logout' } 
  ];
  
  const loggedOutLinks = [
      { name: 'Login / Register', actionType: 'RedirectLogin' },
      { name: 'Register/Login as Dealer', actionType: 'DealerLogin' },
  ];
  
  const menuOptions = isAuthenticated ? loggedInLinks : loggedOutLinks;

  const handleInputChange = (e) => {
      const value = e.target.value;
      onSearchChange(value);
  };

  // NEW: Function to handle search being triggered by clicking a suggestion
  const handleSuggestionSelect = (term) => {
      onSearchChange(term);
      // Optional: Close the search bar immediately after selecting a suggestion
      // setIsSearchOpen(false); 
  };

  const toggleSearch = () => {
    setIsNotificationsOpen(false);
    setIsProfileModalOpen(false);
    
    if (isSearchOpen) {
        onSearchChange(''); 
    }
    setIsSearchOpen(prev => !prev);
  };
  
  const toggleNotifications = () => {
    setIsSearchOpen(false);
    setIsProfileModalOpen(false);
    setIsNotificationsOpen(prev => !prev);
  };
  
  const openProfileModal = () => {
      setIsNotificationsOpen(false); 
      setIsSearchOpen(false);
      if (isAuthenticated) {
        setIsProfileModalOpen(true);
      } else {
        alert("Please log in to view your profile.");
      }
  };
  
  const handleMenuAction = (type) => {
      if (type === 'Logout') {
          onLogout();
          return;
      }
      if (type === 'DealerLogin') {
          alert("Dealer Login functionality triggered!");
          return;
      }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Logic for closing Search Bar and Suggestions when clicking outside
      if (isSearchOpen && searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        const searchIconButton = event.target.closest('.search-icon-button');
        if (!searchIconButton) {
          setIsSearchOpen(false);
        }
      }

      // Logic for closing Notifications Panel
      if (isNotificationsOpen && notificationRef.current && 
          !notificationRef.current.contains(event.target) && 
          notificationButtonRef.current && !notificationButtonRef.current.contains(event.target)) 
      {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchOpen, isNotificationsOpen]);

  return (
    <React.Fragment>
      <nav className="pure-navbar-container">
        
        <div className="navbar-left">
          <div className="dropdown-container"> 
            <button className="nav-icon-button">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>

            <div className="dropdown-menu">
              <ul>
                {menuOptions.map((link) => (
                  <li key={link.name}>
                    {link.actionType === 'RedirectLogin' ? (
                        <a href="/login" className="profile-menu-button">
                            {link.name}
                        </a>
                    ) : (
                        <button 
                            onClick={link.actionType === 'Profile' ? openProfileModal : () => handleMenuAction(link.actionType)} 
                            className="profile-menu-button"
                        >
                            {link.name}
                        </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="navbar-center">
          <a href="/" className="nav-title">RideX</a>
        </div>

        <div className="navbar-right">
          
          <button 
            className="nav-icon-button search-icon-button" 
            onClick={toggleSearch} 
            aria-expanded={isSearchOpen}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
          
          {isSearchOpen && (
            <div className="dynamic-search-container" ref={searchBarRef}>
              <input 
                type="search" 
                placeholder="Search bikes, brands, EVs..." 
                className="dynamic-search-input" 
                value={currentSearchTerm}
                onChange={handleInputChange}
                autoFocus 
              />
              {/* RENDER SEARCH SUGGESTIONS BELOW THE INPUT */}
              <SearchSuggestions 
                  searchTerm={currentSearchTerm} 
                  onSelect={handleSuggestionSelect}
              />
            </div>
          )}

          <div className="notification-indicator">
            <span className="notification-dot"></span>
            
            <button 
              className="nav-icon-button"
              onClick={toggleNotifications}
              ref={notificationButtonRef}
              aria-expanded={isNotificationsOpen}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </button>

            {isNotificationsOpen && (
              <div className="notification-panel" ref={notificationRef}>
                <div className="notification-header">Notifications</div>
                <div className="notification-empty">
                  No notifications yet.
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      <ProfileModal 
          open={isProfileModalOpen} 
          Closed={() => setIsProfileModalOpen(false)} 
      />
    </React.Fragment>
  );
}

export default Navbar;