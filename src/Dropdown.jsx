import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import {Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css"; // Import Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle"; // Import Bootstrap JS
import "./Dropdown.css"; 

function Dropdown() {
    
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light ">
                {/* Navbar Toggler for Mobile View */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar Content */}
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        {/* Home Link */}
                        <li className="nav-item active">
                            <Link className=" nav-link" to="/"> HOME </Link>
                        </li>

                        {/* About Us Dropdown */}
                        <li className="nav-item dropdown">
                            <Link className=" nav-link dropdown-toggle " to="About" id="navbarDropdownAbout" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> ABOUT US </Link>
                            <div className="dropdown-menu"  aria-labelledby="navbarDropdownAbout">
                                <Link className="dropdown-item" to="About_cisks"> ABOUT CISKS </Link>
                                <Link className="dropdown-item" to="Vision_mission"> VISION & MISSION </Link>
                                <Link className="dropdown-item" to="Objective"> OBJECTIVE </Link>
                                <Link className="dropdown-item" to="Focus_area"> FOCUS AREAS </Link>
                            </div>
                        </li>

                        {/* Research Dropdown */}
                        <li className="nav-item dropdown">
                            <Link className=" nav-link dropdown-toggle" to="#" id="navbarDropdownResearch" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> RESEARCH </Link>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownResearch">
                                <Link className="dropdown-item" to="Research_area"> RESEARCH AREAS </Link>
                                <Link className="dropdown-item" to="#"> FACILITIES </Link>
                            </div>
                        </li>

                        {/* Projects Dropdown */}
                        <li className="nav-item active">
                            <Link className=" nav-link" to="/Projects"> PROJECTS </Link>
                        </li>
                        

                        {/* People Dropdown */}
                        <li className="nav-item dropdown">
                            <Link className=" nav-link dropdown-toggle" to="#" id="navbarDropdownPeople" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> PEOPLE </Link>
                            <div className="dropdown-menu " style={{backgroundColor: "#0c153b"}} aria-labelledby="navbarDropdownPeople">
                                <Link className="dropdown-item" to="People/Faculty"> FACULTY MEMBER </Link>
                                <Link className="dropdown-item" to="People/Staff"> STAFF MEMBER </Link>
                            </div>
                        </li>

                        {/* Partners Dropdown */}
                        <li className="nav-item active">
                            <Link className=" nav-link" to="https://iksindia.org/" target="blank"> PARTNERS </Link>
                        </li>

                        {/* Publications Dropdown */}
                        <li className="nav-item dropdown">
                            <Link className=" nav-link dropdown-toggle" to="#" id="navbarDropdownOpportunities" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> KNOWLEDGE REPOSITORY </Link>
                            <div className="dropdown-menu " style={{backgroundColor: "#0c153b"}} aria-labelledby="navbarDropdownOpportunities">
                                <Link className="dropdown-item" to="/BOOKS">LIBRARY</Link>
                            </div>
                        </li>

                        {/* Opportunities Dropdown */}
                        <li className="nav-item dropdown">
                            <Link className=" nav-link dropdown-toggle" to="#" id="navbarDropdownOpportunities" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> OPPORTUNITIES</Link>
                            <div className="dropdown-menu " style={{backgroundColor: "#0c153b"}} aria-labelledby="navbarDropdownOpportunities">
                                <Link className="dropdown-item" to="/Internship">INTERNSHIP</Link>
                            </div>
                        </li>

                        {/* Outreach Dropdown */}
                        <li className="nav-item dropdown">
                            <Link className=" nav-link dropdown-toggle" to="#" id="navbarDropdownOutreach" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">OUTREACH</Link>
                            <div className="dropdown-menu" style={{backgroundColor: "#0c153b"}} aria-labelledby="navbarDropdownOutreach">
                                <Link className="dropdown-item" to="/Gallery">GALLERY</Link>
                                <Link className="dropdown-item" to="/Events">EVENTS</Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Dropdown;