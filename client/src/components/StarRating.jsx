import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const StarRating = ({ rating = 0, size = 'md', interactive = false, onRate }) => {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const val = i + 1;
    if (rating >= val) return 'full';
    if (rating >= val - 0.5) return 'half';
    return 'empty';
  });

  const fs = size === 'sm' ? '.7rem' : size === 'lg' ? '1.25rem' : '.9rem';

  return (
    <div className="stars" style={{ fontSize: fs }}>
      {stars.map((type, i) => (
        <span
          key={i}
          className={type === 'full' ? 'star-filled' : type === 'half' ? 'star-filled' : 'star-empty'}
          style={{ cursor: interactive ? 'pointer' : 'default' }}
          onClick={() => interactive && onRate && onRate(i + 1)}
        >
          {type === 'full' ? <FaStar /> : type === 'half' ? <FaStarHalfAlt /> : <FaRegStar />}
        </span>
      ))}
    </div>
  );
};

export default StarRating;
