import React, { useEffect, useState } from "react";
import * as bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "./Middle_content.css";
import axios from 'axios';

function Middle_content() {
    const [carouselItems, setCarouselItems] = useState([]);

    useEffect(() => {
        const fetchCarouselItems = async () => {
            try {
                const response = await axios.get('https://cisksbackend1-0.onrender.com/api/carousel-events');
                setCarouselItems(response.data);
            } catch (error) {
                console.error('Error fetching carousel items:', error);
            }
        };
        fetchCarouselItems();
    }, []);

    useEffect(() => {
        const carouselElement = document.querySelector("#carouselExampleControls");
        if (carouselElement && carouselItems.length > 0) {
            const bootstrapCarousel = new bootstrap.Carousel(carouselElement, {
                interval: 3000,
                wrap: true,
            });

            return () => {
                bootstrapCarousel.dispose();
            };
        }
    }, [carouselItems]);

    return (
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner container">
                {carouselItems.map((item, index) => (
                    <div key={item._id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                        <img className="img-fluid" src={item.imagePath} alt="Cisks_deparment_images" />
                    </div>
                    
                ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually">Previous</span>
            </button>

            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span className="visually">Next</span>
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
            </button>
        </div>
    );
}

export default Middle_content;