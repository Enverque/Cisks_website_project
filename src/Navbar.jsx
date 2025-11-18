import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "./Navbar.css";


function Navbar() {
    return(
        <>
                <div className="header navbar-expand-lg">
                        <Link className="navbar-brand" to="/" id="Navbar_brand">
                            <img src="/img/CISKS_logo.jpg" alt="Cisks logo"/>
                        </Link>

                        <div className="middleheader">
                            <a style={{ color: '#8000ffff' }} href="https://www.iiti.ac.in/"> Center for Indian Scientific Knowledge Systems </a>
                            <p style={{ color: '#ea08e6ff' }}>Indian Institute of Technology Indore</p>
                        </div>
    
                        <a href="https://www.iiti.ac.in/">
                            <img src="/img/IIT_Logo.png" alt="IITI logo" className="IIT_logo" />
                        </a>
                </div>

        </>
    )
}


export default Navbar;