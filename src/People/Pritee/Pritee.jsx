import React from "react";
import "./Pritee.css";

function Pritee() {
    return(
        <>
                <div className=" Card_Pritee">
                        <div className="Front_Card_Pritee">
                            <div className="Upper_Front_Card_Pritee">
                                <img src="/Faculty_img/Pritee_hss.png" className="Pritee_img" alt=" Pritee iiti" />
                                <h5 className="Name">Dr. Pritee Sharma</h5>
                                <h6 className="position"> Professor</h6>
                            </div>
                            <div className="Lower_Front_Card_Pritee">
                                <p className="Pritee_email"><strong>Email :</strong> psharma@iiti.ac.in</p>
                                <p className="Department_Pritee"> <strong>Department :</strong> Discipline of Economics, School of Humanities and Social Sciences</p>
                                <p className="Pritee_phone"><strong>Phone :</strong> +91-731-660 (Ext. 3325)</p>
                                <p className="Pritee_address"><strong>Office : </strong>Room No. 520, Chromium POD , IIT Indore, Khandwa Road, Simrol, Indore (M.P)- 453552</p>
                            </div>
                        </div>

                        <div className="Back_Card_Pritee">
                                <p className="Heading_Back_Card_Pritee"><strong>Research Interests:</strong></p>
                                <p className="Pritee_research">&#8226; Agricultural Economics (Economics of Land, Water and Forests)</p>
                                <p className="Pritee_research">&#8226; Development Economics (Rural Poverty and Trade Concerns of Developing Countries)</p>
                                <a href="https://sites.google.com/iiti.ac.in/sslab/home"> <button className="Read_Pritee">Read more....</button></a>
                        </div>
                </div>
        </>
    )
}


export default Pritee;