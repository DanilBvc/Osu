import './playerCard.scss';
import avatarPlug from '../../assets/plugs/avatar-plug.jpg';

export default function PlayerCard(): JSX.Element {
  return (
    <div className="playerCard">
      <img className="playerCard-avatar" src={avatarPlug} alt="" />
      <div className="playerCard-info">
        <p className="playerCard-name">Name</p>
        <p className="playerCard-performance">Performance: 999999999</p>
        <p className="playerCard-accuracy">Accuracy: 100%</p>
        <div className="playerCard-lvl lvl">
          <p className="lvl-count">lvl: 80</p>
          <div className="lvl-bar">
            <div className="lvl-progress" />
          </div>
        </div>
      </div>
    </div>
  );
}
