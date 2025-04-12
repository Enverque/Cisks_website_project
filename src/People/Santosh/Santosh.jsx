import React from "react";
import "./Santosh.css";

function Santosh() {
    return(
        <>
                <div className=" Card_Santosh">
                        <div className="Front_Card_Santosh">
                            <div className="Upper_Front_Card_Santosh">
                                <img src="/Faculty_img/Santosh_ME.png" className="Santosh_img" alt="Ghanti Santosh iiti" />
                                <h5 className="Name">Dr. Santosh K. Sahu</h5>
                                <h6 className="position">Professor</h6>
                            </div>
                            <div className="Lower_Front_Card_Santosh">
                                <p className="Santosh_email"><strong>Email :</strong> sksahu@iiti.ac.in </p>
                                <p className="Department_Santosh"> <strong>Department :</strong> Discipline of Mechanical Engineering,</p>
                                <p className="Santosh_phone"><strong>Phone :</strong>  +91 731-6603238   </p>
                                <p className="Santosh_address"><strong>Office : </strong>Academic Pod, CSE-2 (101) IIT Indore, Khandwa Road, Simrol, Indore (M.P)- 453552</p>
                            </div>
                        </div>

                        <div className="Back_Card_Santosh">
                                <p className="Heading_Back_Card_Santosh"><strong>Research Interests:</strong></p>
                                <p className="Santosh_research">&#8226; Thermal Engineering</p>
                                <p className="Santosh_research">&#8226; Nanofluids</p>
                                <p className="Santosh_research">&#8226; Synthetic jets</p>
                                <p className="Santosh_research">&#8226; Gas flow through micro channels</p>
                                <p className="Santosh_research">&#8226; Thermal-hydraulics of nuclear reactors</p>
                                <p className="Santosh_research">&#8226; Impinging jets</p>
                                <p className="Santosh_research">&#8226; Pool boiling heat transfer</p>
                                <p className="Santosh_research">&#8226; Heat exchangers</p>
                                <a href="http://people.iiti.ac.in/~santosh/"> <button className="Read_Santosh">Read more....</button></a>
                        </div>
                </div>
        </>
    )
}


export default Santosh;