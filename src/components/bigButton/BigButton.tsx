import { Link } from 'react-router-dom';
import './bigButton.scss';
import { signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { auth } from '../../firebase/firebase';
import clearUserData from '../../store/actionCreators/userData/clearUserData';

export default function BigButton() {
  const dispatch = useDispatch();
  const hoverEffectHover = () => {
    new Audio('/sounds/selectMapPage/hover.mp3').play();
  };

  const hoverEffectClick = () => {
    new Audio('/sounds/selectMapPage/start.mp3').play();
  };

  const handleSignOut = () => {
    signOut(auth);
    dispatch(clearUserData());
  };

  return (
    <>
      <div className="bg" />
      <div className="osu-main">
        <div className="osu-main-menu">
          <div
            onMouseEnter={hoverEffectHover}
            onClick={hoverEffectClick}
            className="play"
            tabIndex={0}
            role="button"
          >
            <Link className="main__menu-item" to="/selectMap"> Play</Link>
          </div>
          <div
            className="edit"
            onMouseEnter={hoverEffectHover}
            onClick={hoverEffectClick}
            tabIndex={-1}
            role="button"
          >
            <Link className="main__menu-item" to="/game">Game</Link>
          </div>
          <div
            className="options"
            onMouseEnter={hoverEffectHover}
            onClick={hoverEffectClick}
            tabIndex={-2}
            role="button"
          >
            <Link className="main__menu-item" to="/options/">Options</Link>
          </div>
          <div
            className="exit"
            onMouseEnter={hoverEffectHover}
            onClick={hoverEffectClick}
            tabIndex={-3}
            role="button"
          >
            <Link className="main__menu-item" onClick={() => handleSignOut()} to="/">Exit</Link>
          </div>
        </div>
        <div className="osu">RS osu!</div>
      </div>
    </>
  );
}
