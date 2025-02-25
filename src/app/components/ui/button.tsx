"use client"

import React from 'react';

interface CustomButtonProps {
  children: React.ReactNode
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="relative px-8 py-3 text-lg font-semibold transition-all duration-300 ease-in-out
        bg-transparent text-white rounded-full hover:bg-white hover:text-black
        border-2 border-white
        hover:scale-105"
    >
      {children}
    </button>
  );
};

export default CustomButton;