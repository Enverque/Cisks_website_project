import React from "react";
import "./Vision_mission.css";

function Vision_mission() {
    return(
        <>
            <div className=" mission_box container">
                        <h4 className="What_is_sankrit">Little bit about sankrit</h4>
                        <div className="explaination_What_is_sankrit">
                            <img src="/img/Vision.png" className="Vision_image" alt="rishi image" />
                            <p className="That_is_Sanksrit">Sanskrit, one of the world's oldest and most refined languages, 
                            was not invented by a single person but evolved over millennia. However, the great Indian 
                            grammarian Panini (circa 4th century BCE) is considered the key figure in shaping its structure. 
                            His masterpiece, Ashtadhyayi, a systematic treatise with nearly 4,000 sutras, laid the foundation 
                            for linguistic science and computational linguistics. Panini’s work influenced modern language studies, 
                            making Sanskrit the most structured language known. Revered as the "Father of Linguistics," his 
                            contributions extend beyond Sanskrit, impacting logic, philosophy, and artificial intelligence in 
                            the modern world.</p>
                        </div>
                        <h4 className="heading_Mission">Vision and Mission</h4>
                        <div className="mission_meaning">
                            <p className="About_mission"><strong style={{color:"Green"}}>Mission :</strong> This center will focus exclusively on the research and education 
                            of the Indian scientific heritage by studying original texts in all Indian languages and understanding 
                            their relevance to address current technological challenges to sustainable societal development. This 
                            center will focus on developing specific courses for various engineering disciplines in Samskrit aimed 
                            at undergraduate/graduate students, research into texts and identifying their relevance in modern context 
                            and serve as a center for dissemination of knowledge and training the teachers and students in the engineering 
                            colleges of India.</p>
                            <p className="Mission_motive">The grand vision of the Center for Indian Scientific Knowledge Systems 
                            is to train generations of scholars who will show the ‘Indian way’ to the world.</p>
                        </div>
            </div>
        </>
    )
}


export default Vision_mission;