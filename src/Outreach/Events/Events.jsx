import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Events.css";

function Events() {
  const [eventsData, setEventsData] = useState([]);
  
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("/api/program-events");
        setEventsData(res.data);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };
    
    fetchEvents();
  }, []);
  
  return (
    <div className='Events'>
        <h2>EVENTS</h2>
        <div className="timeline">
          {eventsData.map((event, index) => (
            <div key={index} className={`event-container ${index % 2 === 0 ? 'left' : 'right'}`}>
              <div className="event-card" data-index={index + 1}>
                <h3>{event.title}</h3>
                <div className="year">
                    {event.date ? new Date(event.date).toISOString().split('T')[0] : "2025-2026"}
                </div>
                {event.imagePath && <img src={event.imagePath} alt={event.title || `Event ${index + 1}`} />}
                <p>{event.content}</p>
              </div>
            </div>
          ))}
        </div>
    </div>

  );
}

export default Events;