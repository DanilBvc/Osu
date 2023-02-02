import './mainButton.scss';

export default function MainButton(): JSX.Element {
  return (
    <div className="button_container">
      <div className="bg" />
      <div className="bg2" />
      <div className="bg3" />
      <button className="button" type="button">!</button>
    </div>
  );
}
