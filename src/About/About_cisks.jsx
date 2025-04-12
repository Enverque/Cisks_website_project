import React from "react";
import "./About_cisks.css";
import "./About_cisks";
import { Link } from "react-router-dom";


function About_cisks() {
    return (
        <>  
                <div className="About_box container">
                        <h4 className="What_we_r" id="What_we_r">What this centre about and what it is not?</h4>
                        <div className="explaination_That_we_r">
                            <img src="/img/Old_image.png" className="Old_image" alt="rishi image" />
                            <p className="That_we_r">The centre will focus on understanding, preserving, teaching and adapting 
                            the science and technology heritage of India. The center will focus exclusively 
                            on the scientific and technology heritage of India and its relevance to modern 
                            world. The focus is on hard sciences such as mathematics, astronomy, metallurgy, 
                            biology, agriculture, engineering and medicine among others. This center will not 
                            focus on the language studies or humanities or social science aspects of Indian 
                            knowledge systems. The center’s mission extends beyond academia, fostering public 
                            engagement through exhibitions, lectures, and interactive platforms. By spotlighting 
                            India’s scientific ingenuity, it seeks to reclaim narratives often overshadowed by colonial 
                            perspectives and demonstrate how traditional knowledge can inform global innovation. This 
                            initiative positions India’s scientific heritage as a dynamic resource—not a relic—to inspire 
                            solutions for 21st-century challenges. </p>
                        </div>
                        

                        <h4 className="How_can_help">How will this help a Student/Teachers in STEM Fields in India in 21st Century?</h4>
                        <p className="can_help">In this resource constrained world, it is essential to balance the needs of development, 
                        sustainability and equitable development. For example, the nuanced view of Intellectual properties in Indian civilization 
                        could be a model for the world that balances the common societal good with the need for providing incentives to individuals 
                        for knowledge creation. 
                        <p>A few specific examples are provided as illustration:</p>
                        <p>1. Understanding some of the techniques in metallurgy could help us in developing new materials with unique properties 
                        (metal mirrors, rust proof iron, high strength steel alloys).</p>
                        <p>2. Knowledge from agricultural treatises such as vrikshayurveda, Krishi Parashara, viswa vallabha, kashyapiya krushi 
                        sukti among others would help us in developing sustainable technologies for watershed management, sustainable agriculture 
                        and pest management.</p>
                        <p>3. Textile Industry could benefit from some of the techniques used for animalizing cotton and it could have commercial 
                        implications. For example, please see a patent for Animalizing Cotton that was filed by a US company that found uses for 
                        such techniques in textile dyeing <Link to={"https://patents.google.com/patent/US2947594A/en"} style={{color:"red"}}>Animalization of cellulose</Link> </p></p>
                </div>

        </>
    )
}

export default About_cisks;