import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, User, Menu, X, Settings, LogOut, ShoppingCart, Heart, UserPlus, Shield, Zap, Home } from 'lucide-react';
import SearchSuggestions from './SearchSuggestions.jsx';
import ProfileModal from './ProfileModal.jsx';

function Navbar({ isAuthenticated = false, onLogout, onSearchChange, currentSearchTerm = '', onNavigate }) {
  const [state, setState] = useState({
    isSearchOpen: false, isMobileMenuOpen: false, isNotificationsOpen: false,
    isProfileModalOpen: false, searchTerm: currentSearchTerm || '', userType: 'customer', demoAuthState: false
  });
  
  const refs = { searchBar: useRef(null), notification: useRef(null), notificationButton: useRef(null), mobileMenu: useRef(null) };
  const actualAuthState = isAuthenticated || state.demoAuthState;
  const { isTablet, isDesktop, isMobile } = { 
    isTablet: window.innerWidth >= 768, isDesktop: window.innerWidth >= 1024, isMobile: window.innerWidth < 768 
  };

  const updateState = (updates) => setState(prev => ({ ...prev, ...updates }));

  const styles = {
    navbar: { position: 'fixed', top: 0, left: 0, right: 0, zIndex: 40, background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(229, 231, 235, 0.3)',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' },
    navbarContent: { maxWidth: '80rem', margin: '0 auto', padding: '0 1rem', display: 'flex',
      alignItems: 'center', justifyContent: 'space-between', height: '4rem' },
    navbarSection: { display: 'flex', alignItems: 'center', gap: '1rem' },
    logo: { display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none',
      cursor: 'pointer', transition: 'transform 0.2s ease' },
    logoIcon: { width: '2.5rem', height: '2.5rem', background: 'linear-gradient(135deg, #2563eb, #9333ea)',
      borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 4px 14px 0 rgba(37, 99, 235, 0.3)', color: 'white' },
    logoText: { fontSize: isMobile ? '1.25rem' : '2rem', fontWeight: 700, 
      background: 'linear-gradient(135deg, #2563eb, #9333ea)', WebkitBackgroundClip: 'text',
      backgroundClip: 'text', WebkitTextFillColor: 'transparent', color: 'transparent' },
    userBadge: { display: actualAuthState && !isMobile ? 'inline-flex' : 'none', alignItems: 'center',
      padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600,
      ...(state.userType === 'dealer' ? { backgroundColor: '#dcfce7', color: '#166534' } 
        : { backgroundColor: '#dbeafe', color: '#1e40af' }) },
    desktopNav: { display: isTablet ? 'flex' : 'none', alignItems: 'center', gap: '0.5rem' },
    navItem: { display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem',
      borderRadius: '0.75rem', fontWeight: 500, transition: 'all 0.2s ease', background: 'none',
      border: 'none', cursor: 'pointer', color: '#4b5563', textDecoration: 'none' },
    navItemHighlight: { background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white',
      boxShadow: '0 4px 14px 0 rgba(16, 185, 129, 0.3)' },
    iconButton: { display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.625rem',
      borderRadius: '0.75rem', background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280',
      transition: 'all 0.2s ease', position: 'relative' },
    mobileMenuButton: { display: 'block', border: 'none', background: 'none', cursor: 'pointer',
      padding: '0.5rem', borderRadius: '0.75rem', color: '#6b7280', transition: 'background-color 0.2s ease' },
    searchOverlay: { position: 'absolute', top: '100%', left: 0, right: 0, background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid #e5e7eb',
      padding: '1rem', zIndex: 30 },
    searchContainer: { maxWidth: '32rem', margin: '0 auto', position: 'relative' },
    searchInput: { width: '100%', paddingLeft: '3rem', paddingRight: '1rem', paddingTop: '1rem',
      paddingBottom: '1rem', fontSize: '1.125rem', border: '2px solid #e5e7eb', borderRadius: '1rem',
      outline: 'none', transition: 'border-color 0.2s ease' },
    searchIcon: { position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' },
    notificationDot: { position: 'absolute', top: '-0.25rem', right: '-0.25rem', width: '1.25rem',
      height: '1.25rem', backgroundColor: '#ef4444', color: 'white', fontSize: '0.75rem',
      borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 },
    notificationPanel: { position: 'absolute', top: 'calc(100% + 0.5rem)', right: 0, width: '20rem',
      background: 'white', borderRadius: '1rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      border: '1px solid #f3f4f6', overflow: 'hidden', zIndex: 50 },
    userPhoto: { width: '2rem', height: '2rem', background: 'linear-gradient(135deg, #3b82f6, #9333ea)',
      borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' },
    mobileMenuOverlay: { position: 'fixed', inset: 0, zIndex: 30 },
    mobileMenuBackdrop: { position: 'fixed', inset: 0, background: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' },
    mobileMenu: { position: 'fixed', top: 0, left: 0, width: '20rem', maxWidth: '85vw', height: '100%',
      background: 'white', boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)', transform: 'translateX(0)',
      transition: 'transform 0.3s ease', overflowY: 'auto' },
    mobileMenuHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '1.5rem', borderBottom: '1px solid #f3f4f6' },
    mobileUserInfo: { margin: '1rem', padding: '0.75rem', backgroundColor: '#f9fafb',
      borderRadius: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem' },
    mobileMenuItems: { padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' },
    mobileMenuItem: { display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem',
      borderRadius: '0.75rem', fontWeight: 500, transition: 'all 0.2s ease', background: 'none',
      border: 'none', cursor: 'pointer', color: '#4b5563', width: '100%', textAlign: 'left' },
    demoControls: { padding: '1.5rem', borderTop: '1px solid #f3f4f6', marginTop: 'auto' },
    demoButton: { display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem',
      borderRadius: '0.75rem', fontWeight: 500, transition: 'all 0.2s ease', background: 'none',
      border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', marginBottom: '0.5rem' },
    desktopDemoControls: { position: 'fixed', bottom: '1rem', right: '1rem', background: 'white',
      borderRadius: '1rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', padding: '1rem',
      border: '1px solid #e5e7eb', zIndex: 40, minWidth: '200px' },
    spacer: { height: '4rem' }
  };

  const navItems = {
    customer: [
      { name: 'Home', icon: Home, path: '/', type: 'link' },
      { name: 'Profile', icon: User, action: 'profile', type: 'button', showWhen: 'authenticated' },
      { name: 'Become a Dealer', icon: Shield, path: '/DRegistration', type: 'link', highlight: true, showWhen: 'unauthenticated' },
      { name: 'Dealer Login', icon: Shield, path: '/DealerLogin', type: 'link', showWhen: 'unauthenticated' },
      { name: 'Login', icon: UserPlus, path: '/login', type: 'link', showWhen: 'unauthenticated' },
      { name: 'Logout', icon: LogOut, action: 'logout', type: 'button', showWhen: 'authenticated' }
    ],
    dealer: [
      { name: 'Dashboard', icon: Home, path: '/DealerDashboard', type: 'link' },
      { name: 'Profile', icon: User, action: 'profile', type: 'button' },
      { name: 'Add Bike', icon: UserPlus, action: 'addBike', type: 'button', highlight: true },
      { name: 'Switch to Customer', icon: User, action: 'switchToCustomer', type: 'button' },
      { name: 'Logout', icon: LogOut, action: 'logout', type: 'button' }
    ]
  };

  const currentNavItems = navItems[state.userType];

  const handlers = {
    searchChange: (value) => { updateState({ searchTerm: value }); onSearchChange?.(value); },
    suggestionSelect: (term) => { updateState({ searchTerm: term, isSearchOpen: false }); onSearchChange?.(term); },
    menuAction: (action) => {
      const actions = {
        logout: () => { onLogout?.(); updateState({ demoAuthState: false, userType: 'customer' }); handlers.navigation('/'); },
        profile: () => updateState({ isProfileModalOpen: true }),
        switchToCustomer: () => updateState({ userType: 'customer' }),
        addBike: () => handlers.navigation('/AddBike')
      };
      actions[action]?.(); updateState({ isMobileMenuOpen: false });
    },
    navigation: (path) => { onNavigate ? onNavigate(path) : window.location.href = path; updateState({ isMobileMenuOpen: false }); },
    toggleSearch: () => {
      updateState({ 
        isSearchOpen: !state.isSearchOpen, isNotificationsOpen: false, 
        searchTerm: !state.isSearchOpen ? '' : state.searchTerm 
      });
      if (!state.isSearchOpen) onSearchChange?.('');
    },
    toggleMobileMenu: () => updateState({ isMobileMenuOpen: !state.isMobileMenuOpen, isNotificationsOpen: false, isSearchOpen: false }),
    toggleNotifications: () => updateState({ isNotificationsOpen: !state.isNotificationsOpen, isSearchOpen: false })
  };

  useEffect(() => updateState({ searchTerm: currentSearchTerm || '' }), [currentSearchTerm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const checkAndClose = (isOpen, ref, buttonClass, closeAction) => {
        if (isOpen && ref.current && !ref.current.contains(event.target) && 
            !event.target.closest(`.${buttonClass}`)) closeAction();
      };
      
      checkAndClose(state.isSearchOpen, refs.searchBar, 'search-icon-button', () => updateState({ isSearchOpen: false }));
      checkAndClose(state.isNotificationsOpen, refs.notification, '', () => {
        if (!refs.notificationButton.current?.contains(event.target)) updateState({ isNotificationsOpen: false });
      });
      checkAndClose(state.isMobileMenuOpen, refs.mobileMenu, 'mobile-menu-button', () => updateState({ isMobileMenuOpen: false }));
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [state.isSearchOpen, state.isNotificationsOpen, state.isMobileMenuOpen]);

  const ButtonComponent = ({ item, isMobile = false }) => (
    <button
      key={item.name}
      onClick={() => item.type === 'link' ? handlers.navigation(item.path) : handlers.menuAction(item.action)}
      style={{
        ...(isMobile ? styles.mobileMenuItem : styles.navItem),
        ...(item.highlight ? (isMobile ? { background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white' } : styles.navItemHighlight) : {})
      }}
      onMouseEnter={(e) => {
        if (!item.highlight) {
          e.target.style.color = '#111827';
          e.target.style.backgroundColor = '#f3f4f6';
        } else if (!isMobile) {
          e.target.style.transform = 'scale(1.05)';
          e.target.style.boxShadow = '0 8px 25px 0 rgba(16, 185, 129, 0.4)';
        }
      }}
      onMouseLeave={(e) => {
        if (!item.highlight) {
          e.target.style.color = '#4b5563';
          e.target.style.backgroundColor = 'transparent';
        } else if (!isMobile) {
          e.target.style.transform = 'scale(1)';
          e.target.style.boxShadow = '0 4px 14px 0 rgba(16, 185, 129, 0.3)';
        }
      }}
    >
      <item.icon size={isMobile ? 20 : 16} />
      <span>{item.name}</span>
    </button>
  );

  return (
    <>
      <nav style={styles.navbar}>
        <div style={styles.navbarContent}>
          <div style={styles.navbarSection}>
            {isMobile && (
              <button style={styles.mobileMenuButton} className="mobile-menu-button" onClick={handlers.toggleMobileMenu}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
                {state.isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            )}

            <button style={styles.logo} onClick={() => handlers.navigation('/')}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}>
              <div style={styles.logoIcon}><Zap size={24} /></div>
              <span style={styles.logoText}>RideX</span>
            </button>

            {actualAuthState && !isMobile && <span style={styles.userBadge}>
              {state.userType === 'dealer' ? 'Dealer Account' : 'Customer'}
            </span>}
          </div>

          {isTablet && (
            <div style={styles.desktopNav}>
              {currentNavItems.filter(item => {
                if (item.showWhen === 'authenticated' && !actualAuthState) return false;
                if (item.showWhen === 'unauthenticated' && actualAuthState) return false;
                return true;
              }).map(item => <ButtonComponent key={item.name} item={item} />)}
            </div>
          )}

          <div style={styles.navbarSection}>
            <button style={styles.iconButton} className="search-icon-button" onClick={handlers.toggleSearch}
              onMouseEnter={(e) => { e.target.style.backgroundColor = '#f3f4f6'; e.target.style.color = '#374151'; }}
              onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#6b7280'; }}>
              <Search size={20} />
            </button>

            <div style={{position: 'relative'}}>
              <button ref={refs.notificationButton} onClick={handlers.toggleNotifications} style={styles.iconButton}
                onMouseEnter={(e) => { e.target.style.backgroundColor = '#f3f4f6'; e.target.style.color = '#374151'; }}
                onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#6b7280'; }}>
                <Bell size={20} />
                <span style={styles.notificationDot}>3</span>
              </button>

              {state.isNotificationsOpen && (
                <div ref={refs.notification} style={styles.notificationPanel}>
                  <div style={{ padding: '1rem', borderBottom: '1px solid #f3f4f6', fontWeight: 600, color: '#111827' }}>
                    <h3 style={{margin: 0}}>Notifications</h3>
                  </div>
                  <div style={{maxHeight: '16rem', overflowY: 'auto'}}>
                    {[1, 2, 3].map((i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', 
                        padding: '1rem', borderBottom: '1px solid #f9fafb', transition: 'background-color 0.2s ease', cursor: 'pointer' }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
                        <div style={{ width: '2.5rem', height: '2.5rem', backgroundColor: '#dbeafe', borderRadius: '9999px',
                          display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Bell size={20} color="#3b82f6" />
                        </div>
                        <div style={{flex: 1}}>
                          <p style={{ fontSize: '0.875rem', fontWeight: 500, color: '#111827', margin: 0 }}>New bike available</p>
                          <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: '0.25rem 0 0 0' }}>2 hours ago</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {actualAuthState && (
              <button onClick={() => updateState({ isProfileModalOpen: true })} style={{...styles.iconButton, padding: '0.625rem'}}
                onMouseEnter={(e) => { e.target.style.backgroundColor = '#f3f4f6'; e.target.style.color = '#374151'; }}
                onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#6b7280'; }}>
                <div style={styles.userPhoto}><User size={16} /></div>
              </button>
            )}
          </div>
        </div>

        {state.isSearchOpen && (
          <div style={styles.searchOverlay}>
            <div style={styles.searchContainer} ref={refs.searchBar}>
              <div style={{position: 'relative'}}>
                <Search size={20} style={styles.searchIcon} />
                <input type="text" placeholder="Search bikes, brands, EVs..." value={state.searchTerm}
                  onChange={(e) => handlers.searchChange(e.target.value)} style={styles.searchInput}
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'} autoFocus />
              </div>
              <SearchSuggestions searchTerm={state.searchTerm} onSelect={handlers.suggestionSelect} />
            </div>
          </div>
        )}
      </nav>

      {state.isMobileMenuOpen && isMobile && (
        <div style={styles.mobileMenuOverlay}>
          <div style={styles.mobileMenuBackdrop} />
          <div ref={refs.mobileMenu} style={styles.mobileMenu}>
            <div style={styles.mobileMenuHeader}>
              <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
                <div style={styles.logoIcon}><Zap size={24} /></div>
                <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827' }}>RideX</span>
              </div>
              <button onClick={() => updateState({ isMobileMenuOpen: false })}
                style={{ padding: '0.5rem', borderRadius: '0.75rem', background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
                <X size={20} />
              </button>
            </div>
            
            {actualAuthState && (
              <div style={styles.mobileUserInfo}>
                <div style={{ width: '2.5rem', height: '2.5rem', background: 'linear-gradient(135deg, #3b82f6, #9333ea)',
                  borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                  <User size={20} />
                </div>
                <div>
                  <p style={{ fontWeight: 600, color: '#111827', margin: 0 }}>John Doe</p>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0, textTransform: 'capitalize' }}>
                    {state.userType} Account
                  </p>
                </div>
              </div>
            )}

            <div style={styles.mobileMenuItems}>
              {currentNavItems.filter(item => {
                if (item.showWhen === 'authenticated' && !actualAuthState) return false;
                if (item.showWhen === 'unauthenticated' && actualAuthState) return false;
                return true;
              }).map(item => <ButtonComponent key={item.name} item={item} isMobile />)}
            </div>

            <div style={styles.demoControls}>
              <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase',
                letterSpacing: '0.05em', margin: '0 0 0.5rem 0' }}>Demo Controls</p>
              <button onClick={() => updateState({ demoAuthState: !state.demoAuthState, userType: state.demoAuthState ? 'customer' : state.userType })}
                style={{ ...styles.demoButton, color: '#2563eb', backgroundColor: '#eff6ff' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#dbeafe'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#eff6ff'}>
                <UserPlus size={20} />
                <span>{state.demoAuthState ? 'Logout (Demo)' : 'Login (Demo)'}</span>
              </button>
              {state.demoAuthState && (
                <button onClick={() => updateState({ userType: state.userType === 'customer' ? 'dealer' : 'customer' })}
                  style={{ ...styles.demoButton, color: '#059669', backgroundColor: '#ecfdf5' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#d1fae5'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#ecfdf5'}>
                  <Shield size={20} />
                  <span>Switch to {state.userType === 'customer' ? 'Dealer' : 'Customer'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div style={styles.spacer}></div>

      <div style={styles.desktopDemoControls}>
        <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase',
          letterSpacing: '0.05em', margin: '0 0 0.5rem 0' }}>Demo Controls</p>
        <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
          <button onClick={() => updateState({ demoAuthState: !state.demoAuthState, userType: state.demoAuthState ? 'customer' : state.userType })}
            style={{ padding: '0.5rem 0.75rem', fontSize: '0.875rem', borderRadius: '0.5rem', fontWeight: 500,
              transition: 'all 0.2s ease', background: 'none', border: 'none', cursor: 'pointer',
              color: '#2563eb', backgroundColor: '#eff6ff' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#dbeafe'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#eff6ff'}>
            {state.demoAuthState ? 'Logout' : 'Login'} (Demo)
          </button>
          {state.demoAuthState && (
            <button onClick={() => updateState({ userType: state.userType === 'customer' ? 'dealer' : 'customer' })}
              style={{ padding: '0.5rem 0.75rem', fontSize: '0.875rem', borderRadius: '0.5rem', fontWeight: 500,
                transition: 'all 0.2s ease', background: 'none', border: 'none', cursor: 'pointer',
                color: '#059669', backgroundColor: '#ecfdf5' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#d1fae5'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#ecfdf5'}>
              Switch to {state.userType === 'customer' ? 'Dealer' : 'Customer'}
            </button>
          )}
        </div>
      </div>

      <ProfileModal open={state.isProfileModalOpen} onClose={() => updateState({ isProfileModalOpen: false })} />
    </>
  );
}

export default Navbar;