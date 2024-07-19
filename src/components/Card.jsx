// src/components/Card.js
import React from 'react';

const Card = ({ index, image, isFlipped, onFlip }) => {
  const handleClick = () => {
    onFlip(index);
  };

  return (
    <div
      className={`card w-64 h-64 lg:w-72 lg:h-72 cursor-pointer transition hover:scale-105 duration-300 ${isFlipped ? 'flipped' : ''}`}
      onClick={handleClick}
    >
      <div className="card-inner">
        <div className="card-front">
          <img src={image} alt="card front" className="w-full h-full object-cover" />
        </div>
        <div className="card-back flex items-center justify-center">
          ?
        </div>
      </div>
    </div>
  );
};

export default Card;
