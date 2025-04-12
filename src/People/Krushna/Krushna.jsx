import React from "react";
import "./Krushna.css";

function Krushna() {
    return(
        <>
                <div className=" Card_Krushna">
                        <div className="Front_Card_Krushna">
                            <div className="Upper_Front_Card_Krushna">
                                <img src="/Faculty_img/Krushna_phy.png" className="Krushna_img" alt=" Krushna iiti" />
                                <h5 className="Name">Dr. Krushna R Mavani</h5>
                                <h6 className="position">Professor</h6>
                            </div>
                            <div className="Lower_Front_Card_Krushna">
                                <p className="Krushna_email"><strong>Email :</strong> krushna@iiti.ac.in</p>
                                <p className="Department_Krushna"> <strong>Department :</strong> Department of Physics,</p>
                                <p className="Krushna_phone"><strong>Phone :</strong> 0731-660-3417</p>
                                <p className="Krushna_address"><strong>Office : </strong> 1D-602 , POD Building, IIT Indore, Khandwa Road, Simrol, Indore (M.P)- 453552</p>
                            </div>
                        </div>

                        <div className="Back_Card_Krushna">
                                <p className="Heading_Back_Card_Krushna"><strong>Research Interests:</strong></p>
                                <p className="Krushna_research">&#8226; Nanomaterials</p>
                                <p className="Krushna_research">&#8226; Terahertz Spectroscopy</p>
                                <p className="Krushna_research">&#8226; Thin Films, Multilayers and nanostructures grown by Pulsed Laser Deposition technique</p>
                                <p className="Krushna_research">&#8226; Structural, Electronic, Magnetic and optical properties and their correlations</p>
                                <p className="Krushna_research">&#8226; Device making for optoelectronics and spintronics</p>
                                <a href="https://pldthzthinfilm.wixsite.com/krushnarmavani"> <button className="Read_Krushna">Read more....</button></a>
                        </div>
                </div>
        </>
    )
}


export default Krushna;