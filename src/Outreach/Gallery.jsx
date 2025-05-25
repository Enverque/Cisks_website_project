import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./Gallery.css";

function Gallery() {
  const [galleryItems, setGalleryItems] = useState([]);

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        const response = await axios.get('https://cisksbackend1-0.onrender.com/api/gallery-events');
        setGalleryItems(response.data);
      } catch (error) {
        console.error('Error fetching gallery items:', error);
      }
    };
    fetchGalleryItems();
  }, []);

  return (
    <>        
      <div className="Gallery_box container">
        <h2>GALLERY</h2>
        <div className="slide">
          {galleryItems.map((item) => (
            <div key={item._id} className="item" style={{ backgroundImage: `url(${item.imagePath})` }}>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Gallery;