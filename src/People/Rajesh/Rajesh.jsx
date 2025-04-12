import React from "react";
import "./Rajesh.css";

function Rajesh() {
    return(
        <>
                <div className=" Card_Rajesh">
                        <div className="Front_Card_Rajesh">
                            <div className="Upper_Front_Card_Rajesh">
                                <img src="/Faculty_img/Rajesh_phy.png" className="Rajesh_img" alt=" Rajesh iiti" />
                                <h5 className="Name">Dr. Rajesh Kumar</h5>
                                <h6 className="position">Associate  Professor</h6>
                            </div>
                            <div className="Lower_Front_Card_Rajesh">
                                <p className="Rajesh_email"><strong>Email :</strong> rajeshkumar@iiti.ac.in</p>
                                <p className="Department_Rajesh"> <strong>Department :</strong> Department of Physics,</p>
                                <p className="Rajesh_phone"><strong>Phone :</strong> +91 731 2438901</p>
                                <p className="Rajesh_address"><strong>Office : </strong>POD 1A building, IIT Indore, Khandwa Road, Simrol, Indore (M.P)- 453552</p>
                            </div>
                        </div>

                        <div className="Back_Card_Rajesh">
                                <p className="Heading_Back_Card_Rajesh"><strong>Research Interests:</strong></p>
                                <p className="Rajesh_research">&#8226;  Nanostructures</p>
                                <p className="Rajesh_research">&#8226; Experimental Solid State Physics</p>
                                <p className="Rajesh_research">&#8226;  Organic and Inorganic Semiconductors</p>
                                <p className="Rajesh_research">&#8226; Lasers</p>
                                <p className="Rajesh_research">&#8226; Device Physics</p>
                                <p className="Rajesh_research">&#8226; Raman and PL spectroscopy</p>
                                <a href="https://www.iiti.ac.in/people/~rajeshkumar/"> <button className="Read_Rajesh">Read more....</button></a>
                        </div>
                </div>
        </>
    )
}


export default Rajesh;