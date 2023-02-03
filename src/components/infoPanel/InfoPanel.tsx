import Player from '../player/Player';
import PlayerCard from '../playerCard/PlayerCard';
import './infoPanel.scss';

export default function InfoPanel(): JSX.Element {
  return (
    <div className="panel">
      <PlayerCard />
      <Player />
    </div>
  );
}
