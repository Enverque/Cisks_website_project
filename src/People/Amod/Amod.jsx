import React from "react";
import "./Amod.css";

function Amod() {
    return(
        <>
                <div className=" Card_Amod">
                        <div className="Front_Card_Amod">
                            <div className="Upper_Front_Card_Amod">
                                <img src="/Faculty_img/Amod_EE.png" className="Amod_img" alt="Ghanti Amod iiti" />
                                <h5 className="Name">Dr. Amod C. Umarikar</h5>
                                <h6 className="position">Associate Professor</h6>
                            </div>
                            <div className="Lower_Front_Card_Amod">
                                <p className="Amod_email"><strong>Email :</strong> umarikar@iiti.ac.in</p>
                                <p className="Department_Amod"> <strong>Department :</strong> Discipline of Electrical Engineering,</p>
                                <p className="Amod_phone"><strong>Phone :</strong> 	0731-6603268</p>
                                <p className="Amod_address"><strong>Office : </strong>Pod - E ,IIT Indore, Khandwa Road, Simrol, Indore (M.P)- 453552</p>
                            </div>
                        </div>

                        <div className="Back_Card_Amod">
                                <p className="Heading_Back_Card_Amod"><strong>Research Interests:</strong></p>
                                <p className="Amod_research">&#8226; Power Electronics in Renewable Energy Systems</p>
                                <p className="Amod_research">&#8226; Modelling and Simulation of Engineering Systems with Bond Graphs</p>
                                <p className="Amod_research">&#8226; Power Quality monitoring</p>
                                <p className="Amod_research">&#8226; Micro Grid</p>
                                <a href="http://people.iiti.ac.in/~umarikar/index.html"> <button className="Read_Amod">Read more....</button></a>
                        </div>
                </div>
        </>
    )
}


export default Amod;