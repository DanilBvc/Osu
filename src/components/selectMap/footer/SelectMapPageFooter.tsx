import React from 'react';
import { Link } from 'react-router-dom';
import './selectMapPageFooterStyles.scss';
import { backButtonIcon } from '../../../assets/images/icons';
import PlayerCard from '../../playerCard/PlayerCard';

function SelectMapPageFooter() {
  return (
    <footer className="select-map-page-footer">
      <div className="previous-page-button-wrapper">
        <Link className="previous-page-button" to="/">
          <img className="previous-page-button__icon" src={backButtonIcon} alt="back page" />
          <span>Back</span>
        </Link>
      </div>
      <div className="player-card-wrapper">
        <PlayerCard />
      </div>
    </footer>
  );
}

export default SelectMapPageFooter;
