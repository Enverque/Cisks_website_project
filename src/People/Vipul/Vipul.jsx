import React from "react";
import "./Vipul.css";

function Vipul() {
    return(
        <>
                <div className=" Card_Vipul">
                        <div className="Front_Card_Vipul">
                            <div className="Upper_Front_Card_Vipul">
                                <img src="/Faculty_img/Vipul_EE.png" className="Vipul_img" alt="Ghanti Vipul iiti" />
                                <h5 className="Name">Dr. Vipul Singh</h5>
                                <h6 className="position">Associate Professor,</h6>
                            </div>
                            <div className="Lower_Front_Card_Vipul">
                                <p className="Vipul_email"><strong>Email :</strong> vipul@iiti.ac.in</p>
                                <p className="Department_vipul"> <strong>Department :</strong> Discipline of Electrical Engineering,</p>
                                <p className="Vipul_phone"><strong>Phone :</strong> 0731-6603274</p>
                                <p className="Vipul_address"><strong>Office : </strong>Room No 312, Scandium-Pod, IIT Indore, Khandwa Road, Simrol, Indore (M.P)- 453552</p>
                            </div>
                        </div>

                        <div className="Back_Card_Vipul">
                                <p className="Heading_Back_Card_Vipul"><strong>Research Interests:</strong></p>
                                <p className="Vipul_research">&#8226; Bulk and SOI Technologies</p>
                                <p className="Vipul_research">&#8226; Photonic Devices.</p>
                                <p className="Vipul_research">&#8226; CMOS based sensors.</p>
                                <p className="Vipul_research">&#8226; Worked on Silicon Nanodevices. Issues pertaining to scaling down of MOSFETs. Single Electron Transistors and their applications. </p>
                                <a href="http://people.iiti.ac.in/~vipul/"> <button className="Read_Vipul">Read more....</button></a>
                        </div>
                </div>
        </>
    )
}


export default Vipul;