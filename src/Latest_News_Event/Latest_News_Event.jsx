import React, { useEffect, useState } from "react";
import "./Latest_News_Event.css";

function Latest_News_Event() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [items, setItems] = useState([]);

    // Fetch latest events from the correct API endpoint
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('/api/latest-events');
                const data = await response.json();
                setItems(data);
            } catch (error) {
                console.error('Error fetching latest events:', error);
            }
        };
        fetchEvents();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % Math.ceil(items.length / 2));
        }, 3000);
        return () => clearInterval(interval);
    }, [items.length]);

    const itemPairs = [];
    for (let i = 0; i < items.length; i += 2) {
        itemPairs.push(items.slice(i, i + 2));
    }

    if (items.length === 0) {
        return <div className="Latest_News_Event__container">Loading events...</div>;
    }

    return (
        <div className="Latest_News_Event__container">
            <div className="Latest_News_Event__wrapper">
                <div
                    className="Latest_News_Event__inner"
                    style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                >
                    {itemPairs.map((pair, index) => (
                        <div key={index} className="Latest_News_Event__item">
                            {pair.map((item) => (
                                <div className="Latest_News_Event__card" key={item._id}>
                                    <img
                                        src={item.imagePath}
                                        alt={item.title}
                                        className="Latest_News_Event__image"
                                    />
                                    <div className="Latest_News_Event__content">
                                        <h5 className="Latest_News_Event__title">{item.title}</h5>
                                        <h6 className="Latest_News_Event__text">{item.content}</h6>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Latest_News_Event;
