import './playerCard.scss';
import { useDispatch, useSelector } from 'react-redux';
import IReducers from '../../types/reducers/reducersType';
import userAvatarPlaceHolder from '../../assets/images/userAvatarPlaceholderImage.png';
import { setAuthPopupActiveAction } from '../../store/reducers/authPopupActiveReducer';
import useUnsub from '../../customHooks/useUnsub';

export default function PlayerCard(): JSX.Element {
  const dispatch = useDispatch();
  const {
    name,
    accuracy,
    avatar,
    lvl,
  } = useSelector((state: IReducers) => state.userDataReducer);
  const setAuthPopupActive = (status: boolean) => dispatch(setAuthPopupActiveAction(status));
  const authPopupActive = useSelector((state: IReducers) => state.authPopupActiveReducer);
  const levelTotalExperiencePoints = 5000;
  const [playedGamesCount, accuracyValue] = String(accuracy).split('.');
  const levelCount = lvl ? Math.floor(lvl / levelTotalExperiencePoints) : 0;
  const levelProgressPercent = lvl
    ? ((lvl % levelTotalExperiencePoints) / levelTotalExperiencePoints) * 100
    : 0;

  useUnsub();

  return (
    <div className="playerCard" onClick={() => setAuthPopupActive(!authPopupActive)} role="button" tabIndex={0}>
      <img className="playerCard-avatar" src={avatar || userAvatarPlaceHolder} alt="avatar" />
      <div className="playerCard-info">
        <p className="playerCard-name">{name}</p>
        <p className="playerCard-performance">
          Played games:
          {' '}
          {playedGamesCount}
          {' '}
        </p>
        <p className="playerCard-accuracy">
          Accuracy:
          {' '}
          {accuracyValue}
          %
        </p>
        <div className="playerCard-lvl lvl">
          <p className="lvl-count">
            Level:
            {' '}
            {levelCount}
          </p>
          <div className="lvl-bar">
            <div className="lvl-progress" style={{ width: `${levelProgressPercent}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
