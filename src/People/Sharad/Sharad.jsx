import React from "react";
import "./Sharad.css";

function Sharad() {
    return(
        <>
                <div className=" Card_Sharad">
                        <div className="Front_Card_Sharad">
                            <div className="Upper_Front_Card_Sharad">
                                <img src="/Faculty_img/Sharad_BSBE.png" className="Sharad_img" alt=" Sharad iiti" />
                                <h5 className="Name">Dr. Sharad Gupta</h5>
                                <h6 className="position"> Professor</h6>
                            </div>
                            <div className="Lower_Front_Card_Sharad">
                                <p className="Sharad_email"><strong>Email :</strong> shgupta@iiti.ac.in</p>
                                <p className="Department_Sharad"> <strong>Department :</strong> Department of Biosciences & Biomedical Engineering,</p>
                                <p className="Sharad_phone"><strong>Phone :</strong>  +91-731-660 (Ext. 3332)</p>
                                <p className="Sharad_address"><strong>Office : </strong>Room No. 716, Silicon, IIT Indore, Khandwa Road, Simrol, Indore (M.P)- 453552</p>
                            </div>
                        </div>

                        <div className="Back_Card_Sharad">
                                <p className="Heading_Back_Card_Sharad"><strong>Research Interests:</strong></p>
                                <p className="Sharad_research">&#8226; Near infrared (NIR) imaging capable biocompatible nanoparticle fabrication.</p>
                                <p className="Sharad_research">&#8226; Cell tissue culture and small animal handling experience.</p>
                                <p className="Sharad_research">&#8226; Fabrication of various types of nanoparticles and their biocompatibility assays.</p>
                                <p className="Sharad_research">&#8226; Expert in optical technique development for non-invasive characterization. </p>
                                <p className="Sharad_research">&#8226; Expert in plant virus purification and in-vitro reassembly for biomedical applications.</p>
                                <a href="https://sguptaucr.wixsite.com/iitindore"> <button className="Read_Sharad">Read more....</button></a>
                        </div>
                </div>
        </>
    )
}


export default Sharad;