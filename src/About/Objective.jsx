import React, { useEffect } from "react";
import "./Objective.css";

function Objective() {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.animate-on-scroll').forEach((element) => {
            observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <section className="objective-section">
            <div className="objective-container">
                <h2 className="objective-heading animate-on-scroll">Objective of Center</h2>
                <div className="objective-content animate-on-scroll">
                    <p className="objective-intro">The objectives of Center for Indian Scientific Knowledge Systems (CISKS) are to:</p>
                    <ul className="objective-list">
                        {[
                            "Research classic scientific texts of India",
                            "Educate students about the scientific texts of India",
                            "Nurture scholarship in Indian scientific Knowledge Systems",
                            "Preserve classic scientific texts of India",
                            "Collaborate with other HEIs of India in the field of Indian Scientific Knowledge Systems"
                        ].map((point, index) => (
                            <li 
                                key={index} 
                                className="objective-point animate-on-scroll"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <span className="point-number">{index + 1}.</span>
                                {point}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default Objective;