import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "./Navbar.css";


function Navbar() {
    return(
        <>
                <div className="header navbar-expand-lg">
                        <a class="navbar-brand" href="#" id="Navbar_brand">
                            <img src="/img/CISKS_logo.jpg" alt="Cisks logo"/>
                        </a>

                        <div className="middleheader">
                            <a style={{ color: '#a30000' }} href="#"> Center for Indian Scientific Knowledge Systems </a>
                            <p style={{ color: '#052555' }}>Indian Institute of Technology Indore</p>
                        </div>
    
                        <a href="https://www.iiti.ac.in/">
                            <img src="/img/IIT_Logo.png" alt="IITI logo" className="IIT_logo" />
                        </a>
                </div>

        </>
    )
}


export default Navbar;