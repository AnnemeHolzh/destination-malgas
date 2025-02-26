"use client"

import React from 'react';

interface CustomButtonProps {
  children: React.ReactNode
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  variant?: 'default' | 'small';
}

const CustomButton: React.FC<CustomButtonProps> = ({ 
  children, 
  onClick, 
  className,
  variant = 'default' 
}) => {
  const baseStyles = "relative font-semibold transition-all duration-300 ease-in-out bg-transparent text-white rounded-full border-2 border-white hover:bg-white hover:text-black hover:scale-105"
  
  const sizeStyles = variant === 'small' 
    ? "px-4 py-1.5 text-sm" 
    : "px-8 py-3 text-lg"

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles} ${className || ''}`}
    >
      {children}
    </button>
  );
};

export default CustomButton;