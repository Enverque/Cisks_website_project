import React, { useEffect, useState } from "react";
import "./Updated_News.css";
import { Link } from "react-router-dom";

const slidesData = [
    { img: "/Events_img/img1.png", text: "Swami Vivekananda birth anniversary celebration (13th Jan 2025)." },
    { img: "/Events_img/img2.png", text: "Lamp lighting on Swami Vivekananda birth anniversary by IIT Indore Professors." },
    { img: "/Events_img/img3.png", text: "Three-day Nitividhana workshop at IIT Indore (24th-27th Oct 2024)" },
    { img: "/Events_img/img4.png", text: "Gold medal awarded to Sayali Vikhrankar for Sanskrit excellence." },
    { img: "/Events_img/img5.png", text: "Apurva Kamble wins logo design competition at CISKS, IIT Indore." },
    { img: "/Events_img/img6.png", text: "Centre for learning sanskrit at CISKS, IIT Indore - 3 years of excellence." },
];

function Updated_News() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % slidesData.length);
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="Updated_News">
            <div className="Updated_News_Wrapper" style={{ transform: `translateY(-${index * 110}px)`, transition: "transform 1s ease-in-out" }}>
                {slidesData.map((slide, i) => (
                    <Link>
                    <div key={i} className={`Updated_slide ${i === index ? "active" : ""}`}>
                        <img src={slide.img} alt="Event" />
                        <p>{slide.text}</p>
                    </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Updated_News;
