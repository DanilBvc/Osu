import './playerCard.scss';
import { useSelector } from 'react-redux';
import userAvatarPlaceHolder from '../../assets/images/userAvatarPlaceholderImage.png';
import IReducers from '../../types/reducers/reducersType';
import useUnSub from '../../customHooks/useUnSub';

export default function PlayerCard(): JSX.Element {
  useUnSub();
  const {
    name,
    performance,
    accuracy,
    avatar,
    lvl,
  } = useSelector((state: IReducers) => state.userDataReducer);

  return (
    <div className="playerCard">
      <img className="playerCard-avatar" src={avatar || userAvatarPlaceHolder} alt="avatar" />
      <div className="playerCard-info">
        <p className="playerCard-name">{name}</p>
        <p className="playerCard-performance">
          Performance:
          {' '}
          {performance}
          {' '}

        </p>
        <p className="playerCard-accuracy">
          Accuracy:
          {' '}
          {accuracy}
          %
        </p>
        <div className="playerCard-lvl lvl">
          <p className="lvl-count">
            lvl:
            {' '}
            {lvl}
          </p>
          <div className="lvl-bar">
            <div className="lvl-progress" />
          </div>
        </div>
      </div>
    </div>
  );
}
