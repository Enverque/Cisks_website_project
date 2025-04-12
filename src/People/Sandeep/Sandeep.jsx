import React from "react";
import "./Sandeep.css";

function Sandeep() {
    return(
        <>
                <div className=" Card_Sandeep">
                        <div className="Front_Card_Sandeep">
                            <div className="Upper_Front_Card_Sandeep">
                                <img src="/Faculty_img/Sandeep_CE.png" className="Sandeep_img" alt="Ghanti Sandeep iiti" />
                                <h5 className="Name">Dr. Sandeep Chaudhary</h5>
                                <h6 className="position">Dean, Administration</h6>
                            </div>
                           <div className="Lower_Front_Card_Sandeep">
                                <p className="Sandeep_email"><strong>Email :</strong> schaudhary@iiti.ac.in</p>
                                <p className="Department_Devendra"> <strong>Department :</strong> Department of Civil Engineering,</p>
                                <p className="Sandeep_phone"><strong>Phone :</strong>  +91-731-660-3256</p>
                                <p className="Sandeep_address"><strong>Office : </strong>Room No 403, Chromium Building,, IIT Indore, Khandwa Road, Simrol, Indore (M.P)- 453552</p>
                           </div>
                        </div>

                        <div className="Back_Card_Sandeep">
                                <p className="Heading_Back_Card_Sandeep"><strong>Research Interests:</strong></p>
                                <p className="Sandeep_research">&#8226; Structural Engineering</p>
                                <p className="Sandeep_research">&#8226; Composite Bridges</p>
                                <p className="Sandeep_research">&#8226; Novel Bricks and Blocks</p>
                                <p className="Sandeep_research">&#8226; Sustainable Construction Practices</p>
                                <p className="Sandeep_research">&#8226; Advanced Characterisation Techniques</p>
                                <p className="Sandeep_research">&#8226; Microstructure and Durability of Concrete</p>
                                <p className="Sandeep_research">&#8226; Waste management in building construction materials</p>
                                <a href="https://sandeepiiti.in/"> <button className="Read_Sandeep">Read more....</button></a>
                        </div>
                </div>
        </>
    )
}


export default Sandeep;