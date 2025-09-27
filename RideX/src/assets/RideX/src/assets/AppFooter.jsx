import React from 'react';

const AppFooter = () => {
    return (
        <footer>
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} RideX. All rights reserved.</p>
                <nav>
                    <ul>
                        <li><a href="/privacy-policy">Privacy Policy</a></li>
                        <li><a href="/terms-of-service">Terms of Service</a></li>
                    </ul>
                </nav>
            </div>
        </footer>
    );
};

export default AppFooter;