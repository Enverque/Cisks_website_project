import React from "react";
import "./Selvakumar.css";

function Selvakumar() {
    return(
        <>
                <div className=" Card_Selvakumar">
                        <div className="Front_Card_Selvakumar">
                            <div className="Upper_Front_Card_Selvakumar">
                                <img src="/Faculty_img/Selvakumar_che.png" className="Selvakumar_img" alt=" Selvakumar iiti" />
                                <h5 className="Name">Dr. Selvakumar Sermadurai</h5>
                                <h6 className="position">Assistant Professor</h6>
                            </div>
                            <div className="Lower_Front_Card_Selvakumar">
                                <p className="Selvakumar_email"><strong>Email :</strong> selva@iiti.ac.in</p>
                                <p className="Department_Selvakumar"> <strong>Department :</strong> Department of Chemistry,</p>
                                <p className="Selvakumar_phone"><strong>Phone :</strong> +91 0731 660 3219</p>
                                <p className="Selvakumar_address"><strong>Office : </strong> Room No. 604, 1D POD Building, IIT Indore, Khandwa Road, Simrol, Indore (M.P)- 453552</p>
                            </div>
                        </div>

                        <div className="Back_Card_Selvakumar">
                                <p className="Heading_Back_Card_Selvakumar"><strong>Research Interests:</strong></p>
                                <p className="Selvakumar_research">&#8226; Green Chemistry</p>
                                <p className="Selvakumar_research">&#8226; Asymmetric Catalysis</p>
                                <p className="Selvakumar_research">&#8226; Continuous-Flow Chemistry</p>
                                <p className="Selvakumar_research">&#8226; Synthesis of Biologically active natural products</p>
                                <p className="Selvakumar_research">&#8226; Development of new methodologies using Hypervalent Iodine Reagents</p>
                                <p className="Selvakumar_research">&#8226; Visible-Light Photoredox Catalysis (Metallophotoredox and Dual Catalysis)</p>
                                <a href="https://chemistry.iiti.ac.in/people/faculty/dr-selvakumar-sermadurai/"> <button className="Read_Selvakumar">Read more....</button></a>
                        </div>
                </div>
        </>
    )
}


export default Selvakumar;