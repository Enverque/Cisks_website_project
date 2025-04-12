import React from "react";
import "./Biswarup.css";

function Biswarup() {
    return(
        <>
                <div className=" Card_Biswarup">
                        <div className="Front_Card_Biswarup">
                            <div className="Upper_Front_Card_Biswarup">
                                <img src="/Faculty_img/Biswarup_che.png" className="Biswarup_img" alt=" Biswarup iiti" />
                                <h5 className="Name">Dr. Biswarup Pathak</h5>
                                <h6 className="position">Professor</h6>
                            </div>
                            <div className="Lower_Front_Card_Biswarup">
                                <p className="Biswarup_email"><strong>Email :</strong> biswarup@iiti.ac.in</p>
                                <p className="Department_Biswarup"> <strong>Department :</strong> Department of Chemistry,</p>
                                <p className="Biswarup_phone"><strong>Phone :</strong> +91 0731 660 3348</p>
                                <p className="Biswarup_address"><strong>Office : </strong>Room No.  724, 1A POD Building, IIT Indore, Khandwa Road, Simrol, Indore (M.P)- 453552</p>
                            </div>
                        </div>

                        <div className="Back_Card_Biswarup">
                                <p className="Heading_Back_Card_Biswarup"><strong>Research Interests:</strong></p>
                                <p className="Biswarup_research">&#8226; Nanomaterials</p>
                                <p className="Biswarup_research">&#8226; Nanocluster</p>
                                <p className="Biswarup_research">&#8226; Artificial Intelligence</p>
                                <p className="Biswarup_research">&#8226; Machine Learning</p>
                                <p className="Biswarup_research">&#8226; DFT</p>
                                <p className="Biswarup_research">&#8226; Computational Strategies to Address the Catalytic Activity of Nanoclusters</p>
                                <p className="Biswarup_research">&#8226; Machine Learning Assisted Exploration of High Entropy Alloy-Based Catalysts for Selective CO2 Reduction to Methanol</p>
                                <a href="https://chemistry.iiti.ac.in/people/faculty/dr-biswarup-pathak/"> <button className="Read_Biswarup">Read more....</button></a>
                        </div>
                </div>
        </>
    )
}


export default Biswarup;