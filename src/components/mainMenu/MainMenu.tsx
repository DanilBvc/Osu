/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './mainMenu.scss';
import { signOut } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../firebase/firebase';
import IReducers from '../../types/reducers/reducersType';
import clearUserData from '../../store/actionCreators/userData/clearUserData';

export default function MainMenu(): JSX.Element {
  const dispatch = useDispatch();
  const handleSignOut = () => {
    signOut(auth);
    dispatch(clearUserData());
  };
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
          <div className="border" onClick={() => { handleSignOut(); }} />
          <span>Exit</span>
        </Link>
      </ul>
    </nav>
  );
}
