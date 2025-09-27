import React from 'react';
import '../Css/AppFooter.css'; 

function AppFooter() {
  return (
    <footer className="app-footer-container">
      <div className="footer-content-wrapper">
        
        {/* Column 1: Marketplace Links */}
        <div className="footer-section footer-links">
          <h3>Marketplace</h3>
          <ul>
            <li><a href="/listings?type=petrol">New Petrol Vehicles</a></li>
            <li><a href="/listings?type=ev">Electric Vehicles (EV)</a></li>
            <li><a href="/used">Pre-Owned Market</a></li>
            <li><a href="/showrooms">Dealer Showrooms</a></li>
            <li><a href="/launches">Upcoming Launches</a></li>
          </ul>
        </div>
        
        {/* Column 2: Tools & Resources */}
        <div className="footer-section footer-links">
          <h3>Resources</h3>
          <ul>
            <li><a href="/finance">EMI & Fuel Calculators</a></li>
            <li><a href="/alerts">Price Alert Setup</a></li>
            <li><a href="/reviews">Reviews & Ratings</a></li>
            <li><a href="/favorites">Your Favorites</a></li>
            <li><a href="/recommendations">Smart Recommendations</a></li>
          </ul>
        </div>
        
        {/* Column 3: Corporate & Support */}
        <div className="footer-section contact-info">
          <h3>Corporate</h3>
          <p>
            **Address:** Global HQ, Tech Avenue, India
          </p>
          <p>
            **Support:** support@ridex.com
          </p>
          <p>
            **Careers:** careers@ridex.com
          </p>
          <p>
            **Dealer Portal:** <a href="/dealer-login">Login / Register</a>
          </p>
        </div>

        {/* Column 4: Legal & Policy */}
        <div className="footer-section footer-links">
          <h3>Legal</h3>
          <ul>
            <li><a href="/privacy">Privacy Statement</a></li>
            <li><a href="/terms">Terms of Use</a></li>
            <li><a href="/cookies">Cookie Policy</a></li>
            <li><a href="/sitemap">Site Map</a></li>
          </ul>
        </div>

      </div>
      
      {/* Footer Bottom Bar */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-wrapper">
            <p>&copy; {new Date().getFullYear()} RideX. All rights reserved.</p>
            <p className="developed-by">Developed with passion by **Team Debuggers**</p>
        </div>
      </div>
    </footer>
  );
}

export default AppFooter;