import React from "react";
import "./App.css";
import Middle_content from "./Middle_content";
import Latest_progUp from "./Latest_progUp/Latest_progUp";
import Latest_News_Event from "./Latest_News_Event/Latest_News_Event";
import Updated_News from "./Updated_News/Updated_News";
import "./Home.css";


function Home() {
  return (
    <>
      <Middle_content />
      <Latest_progUp />
      <div className="News">
          <div>
            <h2 className="Latest_News_Event_Heading"> News and Events</h2>
            <Latest_News_Event />
          </div>
          <div>
              <h5 className="Updated_News_Heading"> Updated News</h5>
              <Updated_News />
          </div>
      </div>

      <div className="Home_content container py-6">
        <h2 className="text-3xl font-bold text-center mb-6 animate-pulse">
          Why do we need Center for Indian Scientific Knowledge Systems?
        </h2>

        {/* Scientific Heritage Section */}
        <div className="content-section">
          <div className="text-content">
            <h3 className="text-2xl font-semibold mb-4 text-indigo-600">
              Preserving Scientific Heritage
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Indic civilization was a knowledge and manufacturing powerhouse for most of the known history. 
              Samskrit was the primary language of knowledge transmission in India. While it is popularly associated 
              with spiritual texts, over 95% of Samskrit literature actually pertains to worldly sciences, yet only ~7% 
              of these texts are digitally preserved.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              To bridge the vast gap in understanding India's scientific history, we need scholars trained to 
              interpret Sanskrit scientific texts in their original form while applying this knowledge to 21st-century problems.
            </p>
          </div>
          <div className="image-wrapper">
            <img
              src="/Home_img/img5.png"
              alt="Vedic Science"
              className="responsive-image"
            />
          </div>
        </div>

        {/* Development Paradigm Section */}
        <div className="content-section mt-16">
          <div className="text-content">
            <h3 className="text-2xl font-semibold mb-4 text-indigo-600">
              A New Paradigm for Development
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Recent global developments show that current models of development are unsustainable. Capitalist 
              inequalities and the failures of socialist economics highlight the need for new paradigms. India offers 
              a sustainable and holistic approach to development—one that ensures welfare for all.
            </p>
          </div>
          <div className="image-wrapper">
            <img
              src="/Home_img/img6.jpeg"
              alt="Sustainable Indian Development"
              className="responsive-image"
            />
          </div>
        </div>

        {/* Vishwaguru Section */}
        <div className="content-section mt-16">
          <div className="text-content">
            <h3 className="text-2xl font-semibold mb-4 text-indigo-600">
              India as Vishwaguru
            </h3>
            <p className="text-gray-700 leading-relaxed">
              If India is to reclaim its place as the global knowledge leader, we must reconnect with our heritage 
              and showcase the ‘Indian way’ of innovation and sustainability to the world.
            </p>
          </div>
          <div className="image-wrapper">
            <img
              src="/Home_img/img7.png"
              alt="India as Vishwaguru"
              className="responsive-image"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;