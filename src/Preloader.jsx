import React, { useState, useEffect } from "react";
import "./Preloader.css";



const words = ["अविद्यया", "मृत्युम्तीर्त्वा", "विद्ययाऽमृतमश्नुते"];

const Preloader = () => {
  const [visibleWords, setVisibleWords] = useState([]);
  const [currentWord, setCurrentWord] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (wordIndex < words.length) {
      if (charIndex < words[wordIndex].length) {
        const charTimer = setTimeout(() => {
          setCurrentWord((prev) => prev + words[wordIndex][charIndex]);
          setCharIndex(charIndex + 1);
        }, 30); // Typing speed

        return () => clearTimeout(charTimer);
      } else {
        setTimeout(() => {
          setVisibleWords((prev) => [...prev, currentWord]); // Store completed word
          setCurrentWord(""); // Reset current word for next typing
          setCharIndex(0);
          setWordIndex(wordIndex + 1);
        }, 0); // Pause before typing the next word
      }
    }
  }, [charIndex, wordIndex]);

  return (
    <>
    <div className="preloader">
      {visibleWords.map((word, i) => (
        <span key={i} className="typed-word"><h1 style={{color:"white"}}>{word}</h1></span>
      ))}
      <span className="typing"><h1 style={{color:"white"}}>{currentWord}</h1></span>
    </div>

    </>
  );
};

export default Preloader;
