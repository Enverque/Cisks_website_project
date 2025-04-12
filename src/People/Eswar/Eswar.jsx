import React from "react";
import "./Eswar.css";

function Eswar() {
    return(
        <>
                <div className=" Card_Eswar">
                        <div className="Front_Card_Eswar">
                            <div className="Upper_Front_Card_Eswar">
                                <img src="/Faculty_img/Eswar_mems.png" className="Eswar_img" alt=" Eswar iiti" />
                                <h5 className="Name">Dr. Eswar Prasad Kormilli</h5>
                                <h6 className="position">Associate Professor</h6>
                            </div>
                            <div className="Lower_Front_Card_Eswar">
                                <p className="Eswar_email"><strong>Email :</strong> eswar@iiti.ac.in</p>
                                <p className="Department_Eswar"> <strong>Department :</strong> Discipline of Metallurgical Engineering and Materials Science,</p>
                                <p className="Eswar_phone"><strong>Phone :</strong>  +91-7312438700</p>
                                <p className="Eswar_address"><strong>Office : </strong>Room No. 1D- 609, IIT Indore, Khandwa Road, Simrol, Indore (M.P)- 453552</p>
                            </div>
                        </div>

                        <div className="Back_Card_Eswar">
                                <p className="Heading_Back_Card_Eswar"><strong>Research Interests:</strong></p>
                                <p className="Eswar_research">&#8226; High strain rate deformation</p>
                                <p className="Eswar_research">&#8226; Mechanical behavior of materials</p>
                                <p className="Eswar_research">&#8226; Nanoindentation, Small scale mechanical testing</p>
                                <p className="Eswar_research">&#8226; High strain rate deformation behaviour of Materials</p>
                                <p className="Eswar_research">&#8226; Surface Engineering, and Failure analysis of materials</p>
                                <a href="https://mems.iiti.ac.in/faculty/EswarPrasadKormilli"> <button className="Read_Eswar">Read more....</button></a>
                        </div>
                </div>
        </>
    )
}


export default Eswar;