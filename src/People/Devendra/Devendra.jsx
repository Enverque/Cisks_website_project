import React from "react";
import "./Devendra.css";

function Devendra() {
    return(
        <>
                <div className=" Card_Devendra">
                        <div className="Front_Card_Devendra">
                            <div className="Upper_Front_Card_Devendra">
                                <img src="/Faculty_img/Devendra_ME.png" className="Devendra_img" alt="Ghanti Devendra iiti" />
                                <h5 className="Name">Dr. Devendra Deshmukh</h5>
                                <h6 className="position">Professor</h6>
                            </div>
                            <div className="Lower_Front_Card_Devendra">
                                <p className="Devendra_email"><strong>Email :</strong> dldeshmukh@iiti.ac.in</p>
                                <p className="Department_Devendra"> <strong>Department :</strong> Discipline of Mechanical Engineering,</p>
                                <p className="Devendra_phone"><strong>Phone :</strong>  +91 731-6603238   </p>
                                <p className="Devendra_address"><strong>Office : </strong>Academic Pod, CSE-2 (101) IIT Indore, Khandwa Road, Simrol, Indore (M.P)- 453552</p>
                            </div>
                        </div>

                        <div className="Back_Card_Devendra">
                                <p className="Heading_Back_Card_Devendra"><strong>Research Interests:</strong></p>
                                <p className="Devendra_research">&#8226; Internal combustion engines</p>
                                <p className="Devendra_research">&#8226; Spray and combustion diagnostics</p>
                                <p className="Devendra_research">&#8226; Modelling I.C. Engine processes.</p>
                                <p className="Devendra_research">&#8226; Computational Fluid Dynamics</p>
                                <p className="Devendra_research">&#8226; Biofuels</p>
                                <p className="Devendra_research">&#8226; Studies on Microscopic structure of diesel sprays under atmospheric and high gas pressures, Fuel</p>
                                <a href="https://www.iiti.ac.in/people/~dldeshmukh/index.html"> <button className="Read_Devendra">Read more....</button></a>
                        </div>
                </div>
        </>
    )
}


export default Devendra;