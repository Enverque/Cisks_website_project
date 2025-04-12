import React from "react";
import "./Nirmala.css";

function Nirmala() {
    return(
        <>
                <div className=" Card_Nirmala">
                        <div className="Front_Card_Nirmala">
                            <div className="Upper_Front_Card_Nirmala">
                                <img src="/Faculty_img/Nirmala_hss.png" className="Nirmala_img" alt=" Nirmala iiti" />
                                <h5 className="Name">Dr. Nirmala Menon</h5>
                                <h6 className="position"> Professor</h6>
                            </div>
                            <div className="Lower_Front_Card_Nirmala">
                                <p className="Nirmala_email"><strong>Email :</strong> nmenon@iiti.ac.in</p>
                                <p className="Department_Nirmala"> <strong>Department :</strong> Discipline of Economics, School of Humanities and Social Sciences</p>
                                <p className="Nirmala_phone"><strong>Phone :</strong>+91-731-660 (Ext. 3322)</p>
                                <p className="Nirmala_address"><strong>Office : </strong>Room No. 521, Chromium POD , IIT Indore, Khandwa Road, Simrol, Indore (M.P)- 453552</p>
                            </div>
                        </div>

                        <div className="Back_Card_Nirmala">
                                <p className="Heading_Back_Card_Nirmala"><strong>Research Interests:</strong></p>
                                <p className="Nirmala_research">&#8226; Digital Humanities</p>
                                <p className="Nirmala_research">&#8226; Globalization Studies</p>
                                <p className="Nirmala_research">&#8226; Postcolonial Literature and Theory</p>
                                <p className="Nirmala_research">&#8226; Institutionalization of Postcolonial Literature</p>
                                <p className="Nirmala_research">&#8226; World literatures in other languages in translation</p>
                                <a href="https://scholar.google.com/citations?user=4ohNq8gAAAAJ&hl=en"> <button className="Read_Nirmala">Read more....</button></a>
                        </div>
                </div>
        </>
    )
}


export default Nirmala;