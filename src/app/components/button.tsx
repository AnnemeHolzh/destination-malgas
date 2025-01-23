"use client"

import React from 'react';

interface CustomButtonProps {
  text: string;
  onClick?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="relative px-8 py-3 text-lg font-semibold transition-all duration-300 ease-in-out
        bg-transparent text-white rounded-full hover:bg-white hover:text-black
        border-2 border-white
        hover:scale-105"
    >
      {text}
    </button>
  );
};

export default CustomButton;