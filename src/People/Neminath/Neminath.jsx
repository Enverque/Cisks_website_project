import React from "react";
import "./Neminath.css";

function Neminath() {
    return(
        <>
                <div className=" Card_Neminath">
                        <div className="Front_Card_Neminath">
                            <div className="Upper_Front_Card_Neminath">
                                <img src="/Faculty_img/Neminath_cse.png" className="Neminath_img" alt=" Neminath iiti" />
                                <h5 className="Name">Dr. Neminath Hubballo</h5>
                                <h6 className="position">Professor, PhD, IIT Guwahati</h6>
                            </div>
                            <div className="Lower_Front_Card_Neminath">
                                <p className="Neminath_email"><strong>Email :</strong> neminath@iiti.ac.in</p>
                                <p className="Department_Neminath"> <strong>Department :</strong> Discipline of Computer Science Engineering,</p>
                                <p className="Neminath_phone"><strong>Phone :</strong> +91-731-6603246</p>
                                <p className="Neminath_address"><strong>Office : </strong>Room No. 418, Scandium Building, IIT Indore, Khandwa Road, Simrol, Indore (M.P)- 453552</p>
                            </div>
                        </div>

                        <div className="Back_Card_Neminath">
                                <p className="Heading_Back_Card_Neminath"><strong>Research Interests:</strong></p>
                                <p className="Neminath_research">&#8226; Design and Development of a Trusted and Accountable Cloud Computing Platform</p>
                                <p className="Neminath_research">&#8226; Big Data Aware High Capacity Wireless Network Architecture Using Caching and Machine Learning</p>
                                <p className="Neminath_research">&#8226; Digital Forensic Knowledge Integration And Intelligence (DIREKT-Intel)</p>
                                <p className="Neminath_research">&#8226; Cyber-Attack Detection and Impact Study in Energy Management System</p>
                                <a href="https://neminath.profiles.iiti.ac.in/"> <button className="Read_Neminath">Read more....</button></a>
                        </div>
                </div>
        </>
    )
}


export default Neminath;