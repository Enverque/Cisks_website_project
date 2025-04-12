import React from 'react';
import "./Events.css";

const eventsData = [
    {
        img: "/Events_img/img1.png",
        description: "Honorable Registrar at the function held on 13th January 2025 to mark the 152nd birth anniversary of Swami Vivekananda.",
    },
    {
        img: "/Events_img/img2.png",
        description: "IIT Indore Professor Dr. Ganti S. Murthy and other guests lighting the lamp on the occasion of the 152nd birth anniversary of Swami Vivekananda.",
    },
    {
        "img": "/Events_img/img3.png",
        "description": "A three-day 'Nitividhana' workshop was organized by the CISKS Department of IIT Indore from 24th to 27th October 2024. Also present as speakers were Srinivas Jammalamadaka (Scholar, IKS, Siddhanta Knowledge Foundation), Ku. Upasana Tendulkar (Founder, Dancing Tales), Shri Raghav Krishna, Shri Amritanshu Pandey (Founder and CEO, Bṛhat), and Dr. Anurag Shukla (Director, Policy & Education, Bṛhat)."
    },
    
    {
        img: "/Events_img/img4.png",
        description: "IIT Indore's CISKS Department has awarded Sayali Vikhrankar, the top performer in the Certificate Course in Sanskrit Language.",
    },
    {
        img: "/Events_img/img5.png",
        description: "Apurva Kamble has secured first place in the logo design competition organized by the CISKS Department of IIT Indore.",
    },
    {
        img: "/Events_img/img6.png",
        description: "A Sanskrit Study Centre has been running for the last three years in the CISKS department of IIT Indore.",
    },
    {
        img: "/Events_img/img7.png",
        description: "India’s Journey: Learning Traditions, and Water Stewardship Documentary Screening, Director’s Cut.",
    },
    {
        img: "/Events_img/img8.png",
        description: "The impact of Mantras using signal processing.",
    },
    {
        img: "/Events_img/img9.png",
        description: "Complete Bhagavad Gita Course. Started from 28th March 2024",
    },
    {
        img: "/Events_img/img11.png",
        description: "Workshop on Agriculture/Botany/Water Management (UGC-IKS) from 1st to 3rd July 2024.",
    },
    {
        img: "/Events_img/img12.png",
        description: "Temple Architecture Workshop held on 4th and 5th July 2024.",
    },
];

function Events() {
    return (
        <div className='Events'>
            <h2>EVENTS</h2>
            <div className="events-container">
            {eventsData.map((event, index) => (
                <div key={index} className="event-card">
                    <img src={event.img} alt={`Event ${index + 1}`} />
                    <p>{event.description}</p>
                </div>
            ))}
        </div>
        </div>
    );
}

export default Events;
