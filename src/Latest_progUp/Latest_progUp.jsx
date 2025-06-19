import React, { useEffect, useState } from "react";
import "./Latest_progUp.css";

const Latest_progUp = () => {
    const [events, setEvents] = useState([]); 

    useEffect(() => {
        const fetchHomeNews = async () => {
            try {
                const response = await fetch('https://cisksbackend1-0.onrender.com/api/homeslider-events');
                const data = await response.json();
                console.log("Fetched home slider events:", data);

                if (Array.isArray(data) && data.length > 0) {
                    setEvents(data); // ✅ save the full array
                } else {
                    setEvents([]);
                }
            } catch (error) {
                console.error("Error fetching home news:", error);
                setEvents([]);
            }
        };

        fetchHomeNews();
    }, []);

    return (
        <div className="Latest_progUp_slider">
            <div className="Latest_progUp_center">
                {events.map((item) => (
                    <div key={item._id} className="Latest_progUp_box">
                        <h3>{item.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Latest_progUp;
