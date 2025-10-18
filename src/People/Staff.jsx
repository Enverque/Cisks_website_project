import React from "react";
import "./Staff.css";
import Murthy from "./Murthy/Murthy";
import Preety from "./Preety/Preety";
import Amaresh from "./Amaresh/Amaresh";
import Himanshu from "./Himanshu/Himanshu";
import Prince from "./Prince/Prince";

function Staff() {
    return (
        <div className="staff-container">
            <div className="staff-box">
                <h2 className="Prof_Incharge">Professor In-charge</h2>
                <Murthy />
            </div>
            <div className="staff-box">
                <h2 className="Staff_member">Staff Member</h2>
                <Preety />
            </div>
            <div className="staff-box">
                <h2 className="Staff_member">Staff Member</h2>
                <Amaresh />
            </div>
            <div className="staff-box">
                <h2 className="Staff_member"> Volunteer</h2>
                <Prince />
            </div>
            <div className="staff-box">
                <h2 className="Staff_member"> Volunteer</h2>
                <Himanshu />
            </div>
        </div>
    );
}

export default Staff;
