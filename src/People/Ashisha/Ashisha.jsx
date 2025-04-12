import React from "react";
import "./Ashisha.css";

function Ashisha() {
    return(
        <>
                <div className=" Card_Ashisha">
                        <div className="Front_Card_Ashisha">
                            <div className="Upper_Front_Card_Ashisha">
                                <img src="/Faculty_img/Ashisha_math.png" className="Ashisha_img" alt=" Ashisha iiti" />
                                <h5 className="Name">Dr. Ashisha Kumar</h5>
                                <h6 className="position">Associate Professor</h6>
                            </div>
                            <div className="Lower_Front_Card_Ashisha">
                                <p className="Ashisha_email"><strong>Email :</strong> akumar@iiti.ac.in</p>
                                <p className="Department_Ashisha"> <strong>Department :</strong> Department of Mathematics</p>
                                <p className="Ashisha_phone"><strong>Phone :</strong>  +91 0731-660 Extn 3326</p>
                                <p className="Ashisha_address"><strong>Office : </strong>Room No. : 1A-602, IIT Indore, Khandwa Road, Simrol, Indore (M.P)- 453552</p>
                            </div>
                        </div>

                        <div className="Back_Card_Ashisha">
                                <p className="Heading_Back_Card_Ashisha"><strong>Research Interests:</strong></p>
                                <p className="Ashisha_research">&#8226; d-plane transform (a generalization of X-ray and Radon transform)</p>
                                <p className="Ashisha_research">&#8226; Roe–Strichartz theorem on two-step nilpotent Lie groups</p>
                                <p className="Ashisha_research">&#8226; End point estimates for Radon transform of radial functions on non-Euclidean spaces</p>
                                <p className="Ashisha_research">&#8226; A Unified Framework for Problems on Guessing, Source Coding, and Tasks Partitioning</p>
                                <a href="https://iiti.irins.org/profile/93809#other_information_panel"> <button className="Read_Ashisha">Read more....</button></a>
                        </div>
                </div>
        </>
    )
}


export default Ashisha;