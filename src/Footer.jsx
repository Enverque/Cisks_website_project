import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <>
            <div className="footer container-fluid">
                <div className="Upper_bottom">
                    <div className="about-container">
                        <h2>CiSKS</h2>
                        <p>The centre will focus on understanding, preserving, teaching and adapting the science and technology heritage of India.</p>
                        <img className="CISKS_logo" src="/img/CISKS_logo.jpg" alt="cisks logo" />
                    </div>
                    <div className="Office">
                        <h3>Office</h3>
                        <p>Indian Institute of Technology Indore, Khandwa Road, Simrol, Indore 453552, Madhya Pradesh, India</p>
                        <p><strong>Email :</strong> cisks@iiti.ac.in </p>
                        <p><strong>Phone :</strong> +91-731-660 (Ext. 3212)</p>
                    </div>
                    <div className="Social_media">
                        <h3>Social Media</h3>
                        <Link to="/*">  <img src="/img/Insta.png" />  </Link>
                        <Link to="/*"> <img src="/img/Fb.png" /> </Link>
                        <Link to="/*"> <img src="/img/X.png" /></Link>
                    </div>
                    <div className="map-container">
                        <h3>Location</h3>
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14741.2387471303!2d75.91364945!3d22.53006905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1738912496171!5m2!1sen!2sin" 
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="map-iframe">     
                        </iframe>
                    </div>
                </div>

                <div className="Lower_bottom">
                    <p>&copy;2021 Center for Indian Scientific Knowledge Systems, IIT Indore</p>
                    <p>Designed and Developed By Himanshu Verma(15 April 2025 )</p>
                    <a href="#Navbar_brand" className="Top_btn"> <button>Top</button></a>
                </div>
            </div>
        </>
    )
}



export default Footer;