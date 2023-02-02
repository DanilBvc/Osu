import { Link } from 'react-router-dom';
import './mainMenu.scss';

export default function MainMenu(): JSX.Element {
  return (
    <nav className="main__menu">
      <ul>
        <Link className="main__menu-item" to="/selectMap">
          <span>Play</span>
        </Link>

        <Link className="main__menu-item" to="/edit">
          <span>Edit</span>
        </Link>

        <Link className="main__menu-item" to="/options/">
          <span>Options</span>
        </Link>

        <Link className="main__menu-item" to="/">
          <span>Exit</span>
        </Link>
      </ul>
    </nav>
  );
}
