"use client";
import { TypeAnimation } from "react-type-animation";
import React from "react";

const TypingTitle = () => {
  return (
    <h1 className="text-4xl text-center font-extrabold text-gray-800 py-10 max-w-80">
      <TypeAnimation
        sequence={[
          // Same substring at the start will only be typed out once, initially
          "PDF AI Assistant to Boost Your Productivity",
          1000, // wait 1s before replacing "Mice" with "Hamsters"
          "PDF AI Assistant to Boost Your Performance",
          1000,
          "PDF AI Assistant to Boost Your Creativity",
          1000,
        ]}
        wrapper="span"
        speed={50}
        // style={{ fontSize: "2em", display: "inline-block" }}
        repeat={Infinity}
      />
    </h1>
  );
};

export default TypingTitle;
