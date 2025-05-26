import React, { useEffect, useState } from "react";
import "./Updated_News.css";
import { Link } from "react-router-dom";

function Updated_News() {
    const [index, setIndex] = useState(0);
    const [events, setEvents] = useState([]);

    // Fetch updated events from the correct API endpoint
   useEffect(() => {
  const fetchEvents = async () => {
    try {
      const response = await fetch('https://cisksbackend1-0.onrender.com/api/updated-events');
      if (!response.ok) throw new Error('API error');
      const data = await response.json();
      setEvents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error_fetching_updated_events:', error);
      setEvents([]);
    }
  };
  fetchEvents();
}, []);


    useEffect(() => {
        const interval = setInterval(() => {
            if (events.length > 0) {
                setIndex((prev) => (prev + 1) % events.length);
            }
        }, 3000);
        return () => clearInterval(interval);
    }, [events.length]);

    if (events.length === 0) {
        return <div className="Updated_News">Loading events...</div>;
    }

    return (
        <div className="Updated_News">
            <div
                className="Updated_News_Wrapper"
                style={{
                    transform: `translateY(-${index * 110}px)`,
                    transition: "transform 1s ease-in-out",
                }}
            >
                {events.map((event, i) => (
                    <Link to="/Events" key={event._id || i}>
                        <div className={`Updated_slide ${i === index ? "active" : ""}`}>
                            <img src={event.imagePath} alt={event.title} />
                            <h6>{event.content}</h6>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Updated_News;
