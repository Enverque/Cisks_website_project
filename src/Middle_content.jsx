import React, { useEffect } from "react";
import * as bootstrap from "bootstrap"; // Import Bootstrap JavaScript
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "./Middle_content.css";

function Middle_content() {
    useEffect(() => {
        const carouselElement = document.querySelector("#carouselExampleControls");
        if (carouselElement) {
            const bootstrapCarousel = new bootstrap.Carousel(carouselElement, {
                interval: 3000,
                wrap: true,
            });

            return () => {
                bootstrapCarousel.dispose(); // Cleanup
            };
        }
    }, []);


    return (
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" >
            <div className="carousel-inner container">
                <div className="carousel-item active">
                    <img className="img-fluid" src="/Home_img/img1.jpg" alt="Second slide" />
                </div>
                <div className="carousel-item ">
                    <img className="img-fluid" src="/Gallery/img10.jpg" alt="third slide" />
                </div>
                <div className="carousel-item ">
                    <img className="img-fluid" src="/Events_img/img5.png" alt="fourth slide" />
                </div>
                <div className="carousel-item ">
                    <img className="img-fluid" src="/Gallery/img8.jpg" alt="fourth slide" />
                </div>
            </div>

            <button className="carousel-control-prev " type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span className="carousel-control-prev-icon text-dark" aria-hidden="true"></span>
                <span className="visually">Previous</span>
            </button>

            <button className="carousel-control-next " type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span className="visually">Next</span>
                <span className="carousel-control-next-icon text-dark" aria-hidden="true"></span>
            </button>
        </div>
    );
}

export default Middle_content;
