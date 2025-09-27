import React, { useState, useRef, useEffect } from 'react';
import '../Css/Navbar.css';

function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false); // NEW STATE
  const searchBarRef = useRef(null);
  const notificationRef = useRef(null); // NEW REF
  const notificationButtonRef = useRef(null); // NEW REF for the button

  const menuLinks = [
    { name: 'Profile', url: '/profile' },
    { name: 'Login / Register', url: '/auth' },
    { name: 'Register/Login  as Dealer', url: '/dealer-register' },
    { name: 'Logout', url: '/logout' }
  ];

  const toggleSearch = () => {
    setIsNotificationsOpen(false); // Close notifications if search opens
    setIsSearchOpen(prev => !prev);
  };
  
  const toggleNotifications = () => { // NEW TOGGLE FUNCTION
    setIsSearchOpen(false); // Close search if notifications opens
    setIsNotificationsOpen(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Logic for closing Search Bar
      if (isSearchOpen && searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        const searchIconButton = event.target.closest('.search-icon-button');
        if (!searchIconButton) {
          setIsSearchOpen(false);
        }
      }

      // NEW Logic for closing Notifications Panel
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
              {menuLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.url}>{link.name}</a>
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
              autoFocus 
            />
          </div>
        )}

        {/* Notification Indicator (modified) */}
        <div className="notification-indicator">
          <span className="notification-dot"></span>
          
          <button 
            className="nav-icon-button"
            onClick={toggleNotifications} // ADD CLICK HANDLER
            ref={notificationButtonRef} // ADD REF
            aria-expanded={isNotificationsOpen}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
          </button>

          {/* NEW Conditional Notification Panel */}
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
  );
}

export default Navbar;