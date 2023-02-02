import { Link } from 'react-router-dom';
import './mainMenu.scss';

export default function MainMenu(): JSX.Element {
  return (
    <nav className="main__menu">
      <ul>
        <Link className="main__menu-item" to="/selectMap">
          <div className="border" />
          <span>Play</span>
        </Link>

        <Link className="main__menu-item" to="/edit">
          <div className="border" />
          <span>Edit</span>
        </Link>

        <Link className="main__menu-item" to="/options/">
          <div className="border" />
          <span>Options</span>
        </Link>

        <Link className="main__menu-item" to="/">
          <div className="border" />
          <span>Exit</span>
        </Link>
      </ul>
    </nav>
  );
}
