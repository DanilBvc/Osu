/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
import './gamePopup.scss';

interface IGamePopupProps {
  data: any;
  isOpen: boolean;

}

export default function GamePopup({ isOpen, data }: IGamePopupProps) {
  const allDifficulty = data.map((item: any) => item.difficulty.OverallDifficulty);
  return (
    isOpen
      ? (
        <div className="game-popup">
          <div className="game-popup-window">
            {allDifficulty.map((item: any) => (<p>{item}</p>))}
          </div>
        </div>
      )
      : null

  );
}
