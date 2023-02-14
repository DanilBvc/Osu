import GithubSvg from '../../utils/GithubSvg';
import './footer.scss';

export default function Footer(): JSX.Element {
  return (
    <footer className="footer">
      <div className="outer-wrapper">
        <div className="socials-links">
          <div className="github-block">
            <a className="image-link github-block__link hover-opacity" href="https://github.com/DanilBvc">
              <GithubSvg />
            </a>
          </div>
          <div className="github-block">
            <a className="image-link github-block__link hover-opacity" href="https://github.com/groom7">
              <GithubSvg />
            </a>
          </div>
          <div className="github-block">
            <a className="image-link github-block__link hover-opacity" href="https://github.com/AndreyVeres">
              <GithubSvg />
            </a>
          </div>
          <div className="rss-block">
            <a className="image-link rss-block__link hover-opacity" href="https://rs.school/js/">
              <img className="rss-block__logo" src="https://rs.school/images/rs_school_js.svg" alt="rs.school logo" />
            </a>
          </div>
        </div>
        <div className="developed-year">2023</div>
      </div>
    </footer>

  );
}
