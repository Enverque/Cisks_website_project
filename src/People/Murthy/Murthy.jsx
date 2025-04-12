import React from "react";
import "./Murthy.css";

function Murthy() {
    return(
        <>
                <div className=" Card_Murthy">
                        <div className="Front_Card_Murthy">
                            <div className="Upper_Front_Card_Murthy">
                                <img src="/Faculty_img/Murthy_sir.png" className="Murthy_img" alt="Ghanti Murthy iiti" />
                                <h5 className="Name">Dr. Ganti S. Murthy</h5>
                                <h6 className="position">Professor Incharge</h6>
                            </div>
                            <div className="Lower_Front_Card_Murthy">
                                <p className="Murthy_email"><strong>Email :</strong> ganti.Murthy@iiti.ac.in</p>
                                <p className="Department_Murthy"> <strong>Department :</strong> Discipline of Bioscience and Biomedical Engineering,</p>
                                <p className="Murthy_phone"><strong>Phone :</strong> +91-731-2438 700 </p>
                                <p className="Murthy_address"><strong>Office : </strong>Room No. 704, Silicon Building, IIT Indore, Khandwa Road, Simrol, Indore (M.P)- 453552</p>
                            </div>
                        </div>

                        <div className="Back_Card_Murthy">
                                <p className="Heading_Back_Card_Murthy"><strong>Research Interests:</strong></p>
                                <p className="Murthy_research">&#8226; Bioprocess development and scaleup for production of value added bioproducts and biofuels</p>
                                <p className="Murthy_research">&#8226; Biological and bioprocess modeling, control and multicriteria optimization</p>
                                <p className="Murthy_research">&#8226; Systems analysis using technoeconomic analysis, life cycle assessment and resource assessment</p>
                                <p className="Murthy_research">&#8226; Resilience and sustainability at the nexus of nutrient-energy-water-land</p>
                                <a href="https://gantimurthy.wixsite.com/stlab"> <button className="Read_Murthy">Read more....</button></a>
                        </div>
                </div>
        </>
    )
}


export default Murthy;