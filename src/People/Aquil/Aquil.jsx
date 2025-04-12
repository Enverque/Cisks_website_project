import React from "react";
import "./Aquil.css";

function Aquil() {
    return(
        <>
                <div className=" Card_Aquil">
                        <div className="Front_Card_Aquil">
                            <div className="Upper_Front_Card_Aquil">
                                <img src="/Faculty_img/Aquil_math.png" className="Aquil_img" alt="Ghanti Aquil iiti" />
                                <h5 className="Name">Dr. Md. Aquil Khan</h5>
                                <h6 className="position">Associate Professor</h6>
                            </div>
                            <div className="Lower_Front_Card_Aquil">
                                <p className="Aquil_email"><strong>Email :</strong> aquilk@iiti.ac.in</p>
                                <p className="Department_Aquil"> <strong>Department :</strong> Department of Mathematics</p>
                                <p className="Aquil_phone"><strong>Phone :</strong> +91 0731-660 Extn 3230</p>
                                <p className="Aquil_address"><strong>Office : </strong>Room No. : 1A-503, IIT Indore, Khandwa Road, Simrol, Indore (M.P)- 453552</p>
                            </div>
                        </div>

                        <div className="Back_Card_Aquil">
                                <p className="Heading_Back_Card_Aquil"><strong>Research Interests:</strong></p>
                                <p className="Aquil_research">&#8226; Algebraic Aspects of Rough Set Theory</p>
                                <p className="Aquil_research">&#8226; Representation Theorems for Some Structures Inherited from Rough Set Theory</p>
                                <p className="Aquil_research">&#8226; Probabilistic And Co-Algebric Approches To Rough Set Theory</p>
                                <p className="Aquil_research">&#8226; A Semantics of the Basic Modal Language Based on a Generalized Rough Set Model, Information Sciences</p>
                                <a href="https://iiti.irins.org/profile/62130"> <button className="Read_Aquil">Read more....</button></a>
                        </div>
                </div>
        </>
    )
}


export default Aquil;