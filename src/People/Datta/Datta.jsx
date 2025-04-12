import React from "react";
import "./Datta.css";

function Datta() {
    return(
        <>
                <div className=" Card_Datta">
                        <div className="Front_Card_Datta">
                            <div className="Upper_Front_Card_Datta">
                                <img src="/Faculty_img/Datta_space.png" className="Datta_img" alt=" Datta iiti" />
                                <h5 className="Name">Dr. Abhirup Datta</h5>
                                <h6 className="position">  Professor</h6>
                            </div>
                            <div className="Lower_Front_Card_Datta">
                            <p className="Datta_email"><strong>Email :</strong> abhirup.datta@iiti.ac.in</p>
                            <p className="Department_Datta"> <strong>Department :</strong> Department of Astronomy, Astrophysics and Space Engineering,</p>
                            <p className="Datta_phone"><strong>Phone :</strong> +91-731-6603545</p>
                            <p className="Datta_address"><strong>Office : </strong> Room No. 501, 1D POD, IIT Indore, Khandwa Road, Simrol, Indore (M.P)- 453552</p>
                            </div>
                        </div>

                        <div className="Back_Card_Datta">
                                <p className="Heading_Back_Card_Datta"><strong>Research Interests:</strong></p>
                                <p className="Datta_research">&#8226; Large Scale Structures: Radio and X-ray Observations of Clusters of Galaxies</p>
                                <p className="Datta_research">&#8226; AstroStatistics, Machine Learning and Big Data; Sustainability Research.</p>
                                <p className="Datta_research">&#8226; Multi-wavelength observations of the Radio Deep-fields, Multi-messenger Astronomy</p>
                                <p className="Datta_research">&#8226; Space Weather and Ionosphere: Using GNSS, NaVIC and low-frequency radio astronomy</p>
                                <a href="https://sites.google.com/iiti.ac.in/abhirupdatta/"> <button className="Read_Datta">Read more....</button></a>
                        </div>
                </div>
        </>
    )
}


export default Datta;