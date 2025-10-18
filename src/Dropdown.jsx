import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css"; // Import Bootstrap CSS
import "./Dropdown.css"; 

function Dropdown() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        // Bootstrap JavaScript ko dynamically load karte hain
        const loadBootstrapJS = () => {
            if (!document.querySelector('script[src*="bootstrap"]')) {
                const script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js';
                script.async = true;
                document.body.appendChild(script);
                
                // Wait for script to load then initialize
                script.onload = () => {
                    setTimeout(initializeDropdowns, 100);
                };
            } else {
                initializeDropdowns();
            }
        };

        const initializeDropdowns = () => {
            // Desktop hover functionality
            const handleMouseEnter = (e) => {
                const dropdown = e.currentTarget;
                const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                if (dropdownMenu && window.innerWidth >= 992) {
                    // Close all other dropdowns first
                    document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
                        if (menu !== dropdownMenu) {
                            menu.classList.remove('show');
                            const toggle = menu.closest('.dropdown').querySelector('.dropdown-toggle');
                            if (toggle) toggle.setAttribute('aria-expanded', 'false');
                        }
                    });
                    
                    dropdownMenu.classList.add('show');
                    const toggle = dropdown.querySelector('.dropdown-toggle');
                    if (toggle) toggle.setAttribute('aria-expanded', 'true');
                }
            };

            const handleMouseLeave = (e) => {
                const dropdown = e.currentTarget;
                const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                if (dropdownMenu && window.innerWidth >= 992) {
                    setTimeout(() => {
                        if (!dropdown.matches(':hover')) {
                            dropdownMenu.classList.remove('show');
                            const toggle = dropdown.querySelector('.dropdown-toggle');
                            if (toggle) toggle.setAttribute('aria-expanded', 'false');
                        }
                    }, 150);
                }
            };

            // Click functionality for dropdowns
            const handleDropdownClick = (e) => {
                const dropdownToggle = e.target.closest('.dropdown-toggle');
                if (dropdownToggle) {
                    e.preventDefault();
                    
                    // Only handle clicks on desktop, mobile will use hover
                    if (window.innerWidth >= 992) {
                        const dropdown = dropdownToggle.closest('.dropdown');
                        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                        const isOpen = dropdownMenu.classList.contains('show');
                        
                        // Close all other dropdowns
                        document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
                            if (menu !== dropdownMenu) {
                                menu.classList.remove('show');
                                const toggle = menu.closest('.dropdown').querySelector('.dropdown-toggle');
                                if (toggle) toggle.setAttribute('aria-expanded', 'false');
                            }
                        });
                        
                        // Toggle current dropdown
                        if (!isOpen) {
                            dropdownMenu.classList.add('show');
                            dropdownToggle.setAttribute('aria-expanded', 'true');
                        } else {
                            dropdownMenu.classList.remove('show');
                            dropdownToggle.setAttribute('aria-expanded', 'false');
                        }
                    }
                }
            };

            // Mobile dropdown hover functionality
            const handleMobileDropdownHover = (e) => {
                if (window.innerWidth < 992) {
                    const dropdown = e.currentTarget;
                    const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                    if (dropdownMenu) {
                        dropdownMenu.classList.add('show');
                        const toggle = dropdown.querySelector('.dropdown-toggle');
                        if (toggle) toggle.setAttribute('aria-expanded', 'true');
                    }
                }
            };

            const handleMobileDropdownLeave = (e) => {
                if (window.innerWidth < 992) {
                    const dropdown = e.currentTarget;
                    const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                    if (dropdownMenu) {
                        setTimeout(() => {
                            if (!dropdown.matches(':hover')) {
                                dropdownMenu.classList.remove('show');
                                const toggle = dropdown.querySelector('.dropdown-toggle');
                                if (toggle) toggle.setAttribute('aria-expanded', 'false');
                            }
                        }, 150);
                    }
                }
            };

            // Add event listeners to dropdown items
            const dropdowns = document.querySelectorAll('.nav-item.dropdown');
            dropdowns.forEach(dropdown => {
                dropdown.addEventListener('mouseenter', handleMouseEnter);
                dropdown.addEventListener('mouseleave', handleMouseLeave);
                dropdown.addEventListener('click', handleDropdownClick);
                
                // Add mobile-specific hover listeners
                dropdown.addEventListener('mouseenter', handleMobileDropdownHover);
                dropdown.addEventListener('mouseleave', handleMobileDropdownLeave);
            });

            // Close dropdowns when clicking outside
            const handleOutsideClick = (e) => {
                if (!e.target.closest('.dropdown')) {
                    document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
                        menu.classList.remove('show');
                        const toggle = menu.closest('.dropdown').querySelector('.dropdown-toggle');
                        if (toggle) toggle.setAttribute('aria-expanded', 'false');
                    });
                }
            };
            
            document.addEventListener('click', handleOutsideClick);

            return () => {
                dropdowns.forEach(dropdown => {
                    dropdown.removeEventListener('mouseenter', handleMouseEnter);
                    dropdown.removeEventListener('mouseleave', handleMouseLeave);
                    dropdown.removeEventListener('click', handleDropdownClick);
                    dropdown.removeEventListener('mouseenter', handleMobileDropdownHover);
                    dropdown.removeEventListener('mouseleave', handleMobileDropdownLeave);
                });
                document.removeEventListener('click', handleOutsideClick);
            };
        };

        const cleanup = loadBootstrapJS();
        
        return cleanup;
    }, []);

    // Handle mobile menu toggle
    const toggleMobileMenu = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest('.navbar') && isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }
        };

        if (isMobileMenuOpen) {
            document.addEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isMobileMenuOpen]);

    // Close mobile menu on window resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 992 && isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMobileMenuOpen]);

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light">
                {/* Mobile Toggle Button */}
                <button 
                    className={`navbar-toggler ${isMobileMenuOpen ? '' : 'collapsed'}`}
                    type="button"
                    onClick={toggleMobileMenu}
                    aria-controls="navbarSupportedContent" 
                    aria-expanded={isMobileMenuOpen}
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <button type="submit" className="login-btn2">Login</button>


                {/* Navbar Content */}
                <div className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`} id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        {/* Home Link */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/" onClick={() => setIsMobileMenuOpen(false)}>
                                HOME
                            </Link>
                        </li>

                        {/* About Us Dropdown */}
                        <li className="nav-item dropdown">
                            <a 
                                className="nav-link dropdown-toggle" 
                                href="#" 
                                id="navbarDropdownAbout" 
                                role="button"
                                aria-haspopup="true" 
                                aria-expanded="false"
                            > 
                                ABOUT US 
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownAbout">
                                <Link className="dropdown-item" to="/About_cisks" onClick={() => setIsMobileMenuOpen(false)}>
                                    ABOUT CISKS
                                </Link>
                                <Link className="dropdown-item" to="/Vision_mission" onClick={() => setIsMobileMenuOpen(false)}>
                                    VISION & MISSION
                                </Link>
                                <Link className="dropdown-item" to="/Objective" onClick={() => setIsMobileMenuOpen(false)}>
                                    OBJECTIVE
                                </Link>
                                <Link className="dropdown-item" to="/Focus_area" onClick={() => setIsMobileMenuOpen(false)}>
                                    FOCUS AREAS
                                </Link>
                            </div>
                        </li>

                        {/* Research Dropdown */}
                        <li className="nav-item dropdown">
                            <a 
                                className="nav-link dropdown-toggle" 
                                href="#" 
                                id="navbarDropdownResearch" 
                                role="button"
                                aria-haspopup="true" 
                                aria-expanded="false"
                            > 
                                RESEARCH 
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownResearch">
                                <Link className="dropdown-item" to="/Research_area" onClick={() => setIsMobileMenuOpen(false)}>
                                    RESEARCH AREAS
                                </Link>
                                <Link className="dropdown-item" to="/Facilities" onClick={() => setIsMobileMenuOpen(false)}>
                                    FACILITIES
                                </Link>
                            </div>
                        </li>

                        {/* Projects Link */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/Projects" onClick={() => setIsMobileMenuOpen(false)}>
                                PROJECTS
                            </Link>
                        </li>

                        {/* People Dropdown */}
                        <li className="nav-item dropdown">
                            <a 
                                className="nav-link dropdown-toggle" 
                                href="#" 
                                id="navbarDropdownPeople" 
                                role="button"
                                aria-haspopup="true" 
                                aria-expanded="false"
                            > 
                                PEOPLE 
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownPeople">
                                <Link className="dropdown-item" to="/People/Faculty" onClick={() => setIsMobileMenuOpen(false)}>
                                    FACULTY MEMBER
                                </Link>
                                <Link className="dropdown-item" to="/People/Staff" onClick={() => setIsMobileMenuOpen(false)}>
                                    STAFF MEMBER
                                </Link>
                            </div>
                        </li>

                        {/* Partners Link */}
                        <li className="nav-item">
                            <a className="nav-link" href="https://iksindia.org/" target="_blank" rel="noopener noreferrer">
                                PARTNERS
                            </a>
                        </li>

                        {/* Knowledge Repository Dropdown */}
                        <li className="nav-item dropdown">
                            <a 
                                className="nav-link dropdown-toggle" 
                                href="#" 
                                id="navbarDropdownKnowledge" 
                                role="button"
                                aria-haspopup="true" 
                                aria-expanded="false"
                            > 
                                KNOWLEDGE REPOSITORY 
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownKnowledge">
                                <Link className="dropdown-item" to="/BOOKS" onClick={() => setIsMobileMenuOpen(false)}>
                                    LIBRARY
                                </Link>
                            </div>
                        </li>

                        {/* Opportunities Dropdown */}
                        <li className="nav-item dropdown">
                            <a 
                                className="nav-link dropdown-toggle" 
                                href="#" 
                                id="navbarDropdownOpportunities" 
                                role="button"
                                aria-haspopup="true" 
                                aria-expanded="false"
                            > 
                                OPPORTUNITIES
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownOpportunities">
                                <Link className="dropdown-item" to="/Internship" onClick={() => setIsMobileMenuOpen(false)}>
                                    INTERNSHIP
                                </Link>
                            </div>
                        </li>

                        {/* Outreach Dropdown */}
                        <li className="nav-item dropdown">
                            <a 
                                className="nav-link dropdown-toggle" 
                                href="#" 
                                id="navbarDropdownOutreach" 
                                role="button"
                                aria-haspopup="true" 
                                aria-expanded="false"
                            >
                                OUTREACH
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownOutreach">
                                <Link className="dropdown-item" to="/Gallery" onClick={() => setIsMobileMenuOpen(false)}>
                                    GALLERY
                                </Link>
                                <Link className="dropdown-item" to="/Events" onClick={() => setIsMobileMenuOpen(false)}>
                                    EVENTS
                                </Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Dropdown;