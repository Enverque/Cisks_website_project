import React from "react";
import "./Vinod.css";

function Vinod() {
    return(
        <>
                <div className=" Card_Vinod">
                        <div className="Front_Card_Vinod">
                            <div className="Upper_Front_Card_Vinod">
                                <img src="/Faculty_img/Vinod_mems.png" className="Vinod_img" alt=" Vinod iiti" />
                                <h5 className="Name">Dr. Vinod Kumar</h5>
                                <h6 className="position">Associate Professor</h6>
                            </div>
                            <div className="Lower_Front_Card_Vinod">
                                <p className="Vinod_email"><strong>Email :</strong> vkt@iiti.ac.in</p>
                                <p className="Department_Vinod"> <strong>Department :</strong> Discipline of Metallurgical Engineering and Materials Science,</p>
                                <p className="Vinod_phone"><strong>Phone :</strong> + 91-73243063251</p>
                                <p className="Vinod_address"><strong>Office : </strong>Room No. 412, 1D POD IIT Indore, Khandwa Road, Simrol, Indore (M.P)- 453552</p>
                            </div>
                        </div>

                        <div className="Back_Card_Vinod">
                                <p className="Heading_Back_Card_Vinod"><strong>Research Interests:</strong></p>
                                <p className="Vinod_research">&#8226; Heat Treatment</p>
                                <p className="Vinod_research">&#8226; Nanomaterials</p>
                                <p className="Vinod_research">&#8226; Powder Metallurgy</p>
                                <p className="Vinod_research">&#8226; Metal recovery from Waste</p>
                                <p className="Vinod_research">&#8226; Physical Metallurgy of multicomponent alloys</p>
                                <a href="https://mems.iiti.ac.in/faculty/VinodKumar"> <button className="Read_Vinod">Read more....</button></a>
                        </div>
                </div>
        </>
    )
}


export default Vinod;