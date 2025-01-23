"use client"

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface NavButtonProps {
  direction: 'prev' | 'next';
  onClick: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ direction, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center w-12 h-12 rounded-full border-2 border-white transition-all duration-300 ease-in-out
        bg-transparent text-white hover:bg-white hover:text-black`}
    >
      {direction === 'prev' ? (
        <FontAwesomeIcon icon={faChevronLeft} />
      ) : (
        <FontAwesomeIcon icon={faChevronRight} />
      )}
    </button>
  );
};

export default NavButton; 