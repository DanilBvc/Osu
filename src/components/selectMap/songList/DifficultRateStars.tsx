import { IDifficultRateStars } from '../../../types/selectMapPageTypes/selectMapPageTypes';
import './difficultRateStarsStyles.scss';

function DifficultRateStars(props: IDifficultRateStars) {
  const { overallDifficultyRate } = props;
  const overallDifficultyIndex = overallDifficultyRate - 1;

  return (
    <div className="difficult-rate">
      {Array(10).fill(0).map((star, starIndex) => {
        let additionalClassName = '';

        if (overallDifficultyIndex - starIndex >= 0) {
          additionalClassName = ' big-star';
        }
        if (starIndex - overallDifficultyIndex > 0 && starIndex - overallDifficultyIndex < 1) {
          additionalClassName = ' small-star';
        }

        return (
          <span
            className={`difficult-rate__star${additionalClassName}`}
            key={window.crypto.randomUUID()}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}

export default DifficultRateStars;
