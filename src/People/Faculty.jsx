import react from "react";
import "./Faculty.css";
import Murthy from "./Murthy/Murthy";
import Neminath from "./Neminath/Neminath";
import Somnath from "./Somnath/Somnath";
import Aquil from "./Aquil/Aquil";
import Ashisha from "./Ashisha/Ashisha";
import Vipul from "./Vipul/Vipul";
import Amod from "./Amod/Amod";
import Santosh from "./Santosh/Santosh";
import Devendra from "./Devendra/Devendra";
import Sandeep from "./Sandeep/Sandeep";
import Neelima from "./Neelima/Neelima";
import Eswar from "./Eswar/Eswar";
import Vinod from "./Vinod/Vinod";
import Selvakumar from "./Selvakumar/Selvakumar";
import Biswarup from "./Biswarup/Biswarup";
import Rajesh from "./Rajesh/Rajesh";
import Krushna from "./Krushna/Krushna";
import Datta from "./Datta/Datta";
import Sharad from "./Sharad/Sharad";
import Pritee from "./Pritee/Pritee";
import Nirmala from "./Nirmala/Nirmala";


function Faculty() {
    return(
        <>
            <h2 className="Faculty_member">Faculty Member</h2>
            <div className="Faculty_img container-fluid">
                    <Murthy />
                    <Eswar />
                    <Vinod />
                    <Datta />
                    <Santosh />
                    <Rajesh />
                    <Neminath />
                    <Somnath />
                    <Aquil />
                    <Ashisha />
                    <Vipul />
                    <Amod />
                    <Devendra />
                    <Sandeep />
                    <Neelima />
                    <Selvakumar />
                    <Biswarup />
                    <Krushna />
                    <Sharad />
                    <Pritee />
                    <Nirmala />
            </div>
        </>
    )
}



export default Faculty;