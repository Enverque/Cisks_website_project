import React from "react";
import "./Projects.css";

function Projects() {
    return(
        <>
            <div className="Projects">
                <div className="Inprogress">
                    <h2>In Progress Projects</h2>
                    <ul>
                        <li>Positional Astronomy with the Ancient Ved-shala in Ujjain</li>
                        <li>Identification and purification of Phytochemicals derived from Indian medicinal plants as Cancer therapeutics</li>
                        <li>Characterizing the microstructure and mechanical properties of iron alloys obtained from traditional Indian processing methods and compare it with the steel obtained from modern methods</li>
                        <li>In Silico Systematic Study of Ayurvedic Neuroprotective Herbs Against Dual Leucine Zipper Kinase for the Treatment of Neurodegeneration</li>
                        <li>Pilot Study of AI-assisted Melodic Structures in Indian Classical Music</li>
                        <li>The role of Phytochemicals as an anti-inflammatory agent: Understanding from computer experiment</li>
                    </ul>
                </div>
                <div className="Extramural">
                    <h2>Extramural Projects </h2>
                    <ul>
                        <li>Development and characterization of novel metallic Vajra Lep coating (Dr. Vinod Kumar; Rs. 19.7 Lakhs)</li>
                        <li>Development and characterization of URUMI sword: A Forgotten steel technology (Dr. Vinod Kumar)</li>
                        <li>Development of Fe-based composite materials mimicking Delhi iron pillar’s structure (Dr. Santosh Hosmani; Rs. 17.5 Lakhs)</li>
                        <li>Investigation of traditional iron monuments in the central India and understanding their metallurgical origins (Dr. Easwar Prasad Korimilli; Rs. 17.3 Lakhs)</li>
                    </ul>
                </div>

                {/* Internal Projects */}
                <div className="Internal">
                    <h2>Internal Projects</h2>
                    <ul>
                        <li>Positional Astronomy with the Ancient Ved-shala in Ujjain (Prof. Abhirup Dutta)</li>
                        <li>Eco friendly synthesis of metallic nanoparticles from various Ayurvedic Indian herbs (Ms. Tanushree Ghosh)</li>
                        <li>Characterizing the microstructure and mechanical properties of iron alloys obtained from traditional Indian processing methods and compare it with the steel obtained from modern methods (Ms. Tulika Dixit)</li>
                        <li>In Silico Systematic Study of Ayurvedic Neuroprotective Herbs Against Dual Leucine Zipper Kinase for the Treatment of Neurodegeneration (Mr. Rajarshi Roy)</li>
                        <li>Pilot Study of AI-assisted Melodic Structures in Indian Classical Music (Dr. Siddharth Malu)</li>
                        <li>The role of Phytochemicals as an anti-inflammatory agent: Understanding from computer experiment (Mr. Md. Fulbabu Sk.)</li>
                        <li>Traditional liquid fertilizer as a substituent to conventional inorganic chemical fertilizers and solid manure (Ms. Harshita Liti)</li>
                        <li>Investigating ‘Panchgavya’ (cow dung, urine, milk, ghee, curd) for synthesizing graphene and carbon quantum dots (Ms. Manushree Tanwar)</li>
                    </ul>
                </div>
                
                <div className="Completed">
                    <h2>Completed Projects</h2>
                    <ul>
                        <li>Traditional liquid fertilizer as a substituent to conventional inorganic chemical fertilizers and solid manure</li>
                        <li>Investigating ‘Panchgavya’ (cow dung, urine, milk, ghee, curd) for synthesizing graphene and carbon quantum dots</li>
                    </ul>
                </div>

            </div>
        </>
    );
}

export default Projects;
