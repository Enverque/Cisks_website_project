import React from "react";
import "./Neelima.css";

function Neelima() {
    return(
        <>
                <div className="Card_Neelima">
                        <div className="Front_Card_Neelima">
                            <div className="Upper_Front_Card_Neelima">
                                <img src="/Faculty_img/Neelima_CE.png" className="Neelima_img" alt="Neelima iiti" />
                                <h5 className="Name">Dr. Neelima Satyam</h5>
                                <h6 className="position">Professor</h6>
                            </div>
                            <div className="Lower_Front_Card_Neelima">
                            <p className="Neelima_email"><strong>Email :</strong> neelima.satyam@iiti.ac.in </p>
                            <p className="Department_Neelima"> <strong>Department :</strong> Department of Civil Engineering</p>
                            <p className="Neelima_phone"><strong>Phone :</strong> +91-0731-6603290 (O)  </p>
                            <p className="Neelima_address"><strong>Office : </strong>Room No 418, Chromium Building, IIT Indore, Khandwa Road, Simrol, Indore (M.P)- 453552</p>
                            </div>
                        </div>

                        <div className="Back_Card_Neelima">
                                <p className="Heading_Back_Card_Neelima"><strong>Research Interests:</strong></p>
                                <p className="Neelima_research">&#8226; Landslide Research</p>
                                <p className="Neelima_research">&#8226; Environmental Geotechnics</p>
                                <p className="Neelima_research">&#8226; Geotechnical Earthquake Engineering</p>
                                <p className="Neelima_research">&#8226; Liquefaction Hazard and Mitigation</p>
                                <p className="Neelima_research">&#8226; Dynamic Soil Structure Interaction Analysis</p>
                                <p className="Neelima_research">&#8226; Rock Mechanics and Underground Structures</p>
                                <a href="http://people.iiti.ac.in/~neelima.satyam/index.php"> <button className="Read_Neelima">Read more....</button></a>
                        </div>
                </div>
        </>
    )
}


export default Neelima;