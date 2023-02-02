import GithubSvg from '../../utils/GithubSvg';
import './footer.scss';

export default function Footer(): JSX.Element {
  return (
    <footer className="footer">
      <ul className="authors">
        <li className="author">
          <a target="_blank" href="https://github.com/DanilBvc" className="author-link" rel="noreferrer">
            <GithubSvg />
          </a>
        </li>
        <li className="author">
          <a target="_blank" href="https://github.com/groom7" className="author-link" rel="noreferrer">
            <GithubSvg />
          </a>
        </li>
        <li className="author">
          <a target="_blank" href="https://github.com/AndreyVeres" className="author-link" rel="noreferrer">
            <GithubSvg />
          </a>
        </li>
      </ul>

      <p>{new Date().getFullYear()}</p>
    </footer>

  );
}
