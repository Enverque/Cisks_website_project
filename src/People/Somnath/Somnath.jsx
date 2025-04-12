import React from "react";
import "./Somnath.css";

function Somnath() {
    return(
        <>
                <div className=" Card_Somnath">
                        <div className="Front_Card_Somnath">
                            <div className="Upper_Front_Card_Somnath">
                                <img src="/Faculty_img/Somnath_cse.png" className="Somnath_img" alt="Ghanti Somnath iiti" />
                                <h5 className="Name">Dr. Somnath Dey</h5>
                                <h6 className="position">Professor , PhD , IIT Kharagpur</h6>
                                
                            </div>
                            <div className="Lower_Front_Card_Somnath">
                                <p className="Somnath_email"><strong>Email :</strong> Somnath@iiti.ac.in</p>
                                <p className="Department_Somnath"> <strong>Department :</strong> Discipline of Computer Science and Engineering,</p>
                                <p className="Somnath_phone"><strong>Phone :</strong>  +91-731-6603241</p>
                                <p className="Somnath_address"><strong>Office : </strong>Room No. 704, Silicon Building, IIT Indore, Khandwa Road, Simrol, Indore (M.P)- 453552</p>
                            </div>
                        </div>

                        <div className="Back_Card_Somnath">
                                <p className="Heading_Back_Card_Somnath"><strong>Research Interests:</strong></p>
                                <p className="Somnath_research">&#8226; Biometrics Security : Iris, Fingerprint, Face, Cancelable Biometrics</p>
                                <p className="Somnath_research">&#8226; Biometric Master Print : Fingerprint Master Print</p>
                                <p className="Somnath_research">&#8226; Image Processing : Fingerprint Image Quality Analysis</p>
                                <p className="Somnath_research">&#8226; Computer Vision :Applications in Biometrics</p>
                                <a href="https://somnathd.wixsite.com/somnath"> <button className="Read_Somnath">Read more....</button></a>
                        </div>
                </div>
        </>
    )
}


export default Somnath;