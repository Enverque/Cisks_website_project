import React, { useEffect, useState } from "react";
import "./Latest_News_Event.css";

function Latest_News_Event() {
  const [activeIndex, setActiveIndex] = useState(0);
  const items = [
    { id: 1, img: "/Events_img/img1.png", title: "Birth Anniversary of Swami Vivekananda", content: " A three-day workshop (24th–27th Oct 2024) was organized by IIT Indore’s CISKS Department, featuring Dr. Ramaswami Balasubramaniam and Director Suhas Joshi."},
    { id: 2, img: "/Events_img/img2.png", title: "Birth Anniversary of Swami Vivekananda", content: "IIT Indore Professor Dr. Ganti S. Murthy, Dr. Devayan Sarkar, and other guests are lighting the lamp on the occasion of the 152nd birth anniversary of Swami Vivekananda."},
    { id: 3, img: "/Events_img/img3.png", title: "Nitividhana workshop", content: "A three-day workshop (24th–27th Oct 2024) was organized by IIT Indore’s CISKS Department, featuring Dr. Ramaswami Balasubramaniam and Director Suhas Joshi." },
    { id: 4, img: "/Events_img/img4.png", title: "Gold Medal Award", content: "Sayali Vikhrankar received a gold medal from IIT Indore for excelling in the Sanskrit Certificate Course, presented in memory of Kusma Devi." },
    { id: 5, img: "/Events_img/img5.png", title: "Logo Design Competition", content: "Apurva Kamble won first place in the CISKS logo design competition, judged by industry experts and presented by Registrar Siba Prasad Hota." },
    { id: 6, img: "/Events_img/img6.png", title: "Sanskrit Study Centre", content: "IIT Indore, in collaboration with Central Sanskrit University, runs a Sanskrit Study Centre, open to enthusiasts above 15 years of age." },
    // Add more items as needed
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % Math.ceil(items.length / 2));
    }, 3000);
    return () => clearInterval(interval);
  }, [items.length]);

  // Create pairs of items for carousel slides
  const itemPairs = [];
  for (let i = 0; i < items.length; i += 2) {
    itemPairs.push(items.slice(i, i + 2));
  }

  return (
    <div className="Latest_News_Event__container">
      <div className="Latest_News_Event__wrapper">
        <div className="Latest_News_Event__inner" 
             style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
          {itemPairs.map((pair, index) => (
            <div key={index} className="Latest_News_Event__item">
              {pair.map((item) => (
                <div className="Latest_News_Event__card" key={item.id}>
                  <img src={item.img} 
                       alt={item.title} 
                       className="Latest_News_Event__image" />
                  <div className="Latest_News_Event__content">
                    <h5 className="Latest_News_Event__title">{item.title}</h5>
                    <p className="Latest_News_Event__text">{item.content} </p>
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