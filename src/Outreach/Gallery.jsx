import React, { useEffect, useRef } from "react";
import "./Gallery.css";

function Gallery() {

  return (
    <>        
      <div className="Gallery_box container">
      <h2>GALLERY</h2>
        <div className="slide">
          <div className="item" style={{ backgroundImage: 'url(/Home_img/img1.jpg)'}}>
          </div>
          <div className="item" style={{ backgroundImage: 'url(/Events_img/img1.png)'}}>
          </div>
          <div className="item" style={{ backgroundImage: 'url(/Events_img/img2.png)'}}>
          </div>
          <div className="item" style={{ backgroundImage: 'url(/Gallery/img10.jpg)'}}>
          </div>
          <div className="item" style={{ backgroundImage: 'url(/Events_img/img4.png)'}}>
          </div>
          <div className="item" style={{backgroundImage: 'url(/Events_img/img5.png)' }}>
          </div>
          <div className="item" style={{backgroundImage: 'url(/Events_img/img10.png)' }}>
          </div>
          <div className="item" style={{backgroundImage: 'url(/Events_img/img7.png)' }}>
          </div>
          <div className="item" style={{backgroundImage: 'url(/Events_img/img11.png)' }}>
          </div>
          <div className="item" style={{backgroundImage: 'url(/Gallery/img8.jpg)' }}>
          </div>
          <div className="item" style={{backgroundImage: 'url(/Gallery/img9.jpg)' }}>
          </div>
          <div className="item" style={{backgroundImage: 'url(/Gallery/img11.jpg)' }}>
          </div>
          <div className="item" style={{backgroundImage: 'url(/Gallery/img12.jpg)' }}>
          </div>
          <div className="item" style={{backgroundImage: 'url(/Gallery/img13.jpg)' }}>
          </div>
          <div className="item" style={{backgroundImage: 'url(/Gallery/img14.jpg)' }}>
          </div>
          <div className="item" style={{backgroundImage: 'url(/Gallery/img15.jpg)' }}>
          </div>
        </div>

      </div>
    </>
  );
}

export default Gallery;
