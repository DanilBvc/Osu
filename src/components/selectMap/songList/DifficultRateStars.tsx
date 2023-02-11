import React from 'react';
import { IDifficultRateStars } from '../../../types/selectMapPageTypes/selectMapPageTypes';
import './difficultRateStarsStyles.scss';

function DifficultRateStars(props: IDifficultRateStars) {
  const { difficulty } = props;
  const easyDifficultyStarsCount = 2;
  const hardDifficultyStarsCount = 5;
  const difficultRate = difficulty === 'Easy'
    ? easyDifficultyStarsCount
    : hardDifficultyStarsCount;

  return (
    <div className="difficult-rate">
      {Array(10).fill(0).map((star, index) => (
        <span
          className={`difficult-rate__star ${index <= difficultRate - 1 ? 'full-star' : ''}`}
          key={window.crypto.randomUUID()}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default DifficultRateStars;
