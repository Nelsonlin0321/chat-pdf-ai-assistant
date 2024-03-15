"use client";
import React, { useState, useEffect } from "react";

const TypingTitle = () => {
  const [text, setText] = useState("");
  const [typingSpeed, setTypingSpeed] = useState(100);
  const titleText = "PDF AI Assistant to Boost Your ";
  const words = ["Productivity", "Creativity", "Smoothness"];

  useEffect(() => {
    const timeout = setTimeout(() => {
      typeText();
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  const typeText = () => {
    const letters = titleText.split("");
    let i = 0;
    let wordId = 0;
    let charId = -1;

    const typingInterval = setInterval(() => {
      if (i < letters.length - 1) {
        setText((prevText) => prevText + letters[i]);
        i++;
      } else {
        const word = words[wordId];
        const characters = word.split("");
        if (charId < characters.length - 1) {
          setText((prevText) => prevText + characters[charId]);
          charId++;
        } else {
          setText(titleText);
          setTypingSpeed(200);
          if (wordId == words.length - 1) {
            wordId = 0;
          } else {
            wordId++;
          }
          charId = -1;
        }
        // clearInterval(typingInterval);
      }
    }, typingSpeed);
  };

  return (
    <h1 className="text-5xl text-center font-extrabold text-gray-800 py-10">
      {text}
      <span className="typing-cursor">|</span>
    </h1>
  );
};

export default TypingTitle;
