// src/components/Navbar/Navbar.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import styles from './Navbar.module.css';
import { useAuth } from '../../context/AuthContext'; // Import useAuth

function Navbar() {
    const { currentUser, logout } = useAuth(); // Get currentUser and logout function
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Handle the logout action
    const handleLogout = async () => {
        try {
            await logout();
            console.log("Logout successful");
            navigate('/login'); // Redirect to login page after logout
        } catch (error) {
            console.error("Failed to log out:", error);
            // Optionally show an error message to the user
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.navContainer}>
                {/* Logo/Brand */}
                <Link to="/" className={styles.navBrand}>
                    <span className={styles.blackR}>R</span>ecycle App
                </Link>

                {/* Mobile Menu Button */}
                <button 
                    className={`${styles.menuButton} ${isMenuOpen ? styles.menuOpen : ''}`}
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                {/* Navigation links */}
                <ul className={`${styles.navList} ${isMenuOpen ? styles.navListOpen : ''}`}>
                    {/* Links visible to everyone */}
                    <li className={styles.navItem}>
                        <Link to="/" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
                            Home
                        </Link>
                    </li>
                     <li className={styles.navItem}>
                        <Link to="/guide" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
                            Disposal Guide
                        </Link>
                    </li>

                    {/* Conditional Links based on Auth State */}
                    {currentUser ? (
                        // User is Logged IN
                        <> {/* Use React Fragment to group elements */}
                            <li className={styles.navItem}>
                                <Link to="/scan" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
                                    Scan Waste
                                </Link>
                            </li>
                            <li className={styles.navItem}>
                                <Link to="/leaderboard" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
                                    Leaderboard
                                </Link>
                            </li>
                            <li className={styles.navItem}>
                                <Link to="/profile" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
                                    Profile
                                </Link>
                            </li>
                            <li className={styles.navItem}>
                                {/* Logout Button */}
                                <button onClick={handleLogout} className={styles.navButton}>
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        // User is Logged OUT
                        <> {/* Use React Fragment */}
                            <li className={styles.navItem}>
                                <Link to="/login" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
                                    Login
                                </Link>
                            </li>
                            <li className={styles.navItem}>
                                <Link to="/signup" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
                                    Sign Up
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;