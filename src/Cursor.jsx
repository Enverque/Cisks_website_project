import React, { useEffect, useState } from 'react';
import './Cursor.css'; 

function Cursor() {
  const [letters, setLetters] = useState([]);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const [distance, setDistance] = useState(0);

  const SANSKRIT_LETTERS = ["ॐ"];
  const MIN_DISTANCE = 40; // Minimum distance between letters (in pixels)

  const addLetter = (e) => {
    const currentX = e.clientX;
    const currentY = e.clientY;
    
    // Calculate distance from last position
    const deltaX = currentX - lastPosition.x;
    const deltaY = currentY - lastPosition.y;
    const currentDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    // Update total distance
    const newDistance = distance + currentDistance;
    
    // Only add a letter if we've moved far enough
    if (newDistance >= MIN_DISTANCE) {
      const letter = {
        id: Date.now(),
        char: SANSKRIT_LETTERS[Math.floor(Math.random() * SANSKRIT_LETTERS.length)],
        x: currentX,
        y: currentY,
      };

      setLetters((prev) => [...prev, letter]);
      setDistance(0); // Reset distance counter
      
      // Remove the letter after 1 second to avoid too many items in state
      setTimeout(() => {
        setLetters((prev) => prev.filter((l) => l.id !== letter.id));
      }, 1000);
    } else {
      setDistance(newDistance);
    }
    
    // Update last position
    setLastPosition({ x: currentX, y: currentY });
  };

  useEffect(() => {
    window.addEventListener('mousemove', addLetter);
    return () => window.removeEventListener('mousemove', addLetter);
  }, [lastPosition, distance]); // Add dependencies to ensure we track the latest values

  return (
    <>
      <div className="cursor-container">
        {letters.map((letter) => (
          <span
            key={letter.id}
            className="cursor-letter"
            style={{
              left: `${letter.x - 30}px`, // Closer to cursor (adjusted -30px)
              top: `${letter.y - 30}px`,  // Closer to cursor (adjusted -30px)
            }}
          >
            {letter.char}
          </span>
        ))}
      </div>
    </>
  );
}

export default Cursor;