/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface IProps {
  handleInput: (value: React.KeyboardEvent<HTMLElement> | null,
    inputValue: string,
    mustBeRemoved?: boolean) => void;
  input: string;
}

function AddMapHeader({ handleInput, input }: IProps) {
  const location = useLocation();
  const currentFilter = location.pathname.split('/')[location.pathname.split('/').length - 1];
  const navigate = useNavigate();
  const handleClear = () => {
    handleInput(null, '', true);
  };
  return (
    <div className="nav-wrapper">
      <div className="nav-link">
        <Link to="recently" className={`choose-category ${currentFilter === 'recently' ? 'active-nav-link' : ''}`}>Recently</Link>
        <Link to="popular" className={`choose-category ${currentFilter === 'popular' ? 'active-nav-link' : ''}`}>Popular</Link>
        <Link to="classification" className={`choose-category ${currentFilter === 'classification' ? 'active-nav-link' : ''}`}>Сlassification</Link>
      </div>
      <div className="nav-search">
        <input onKeyDown={(e) => { handleInput(e, input); }} onChange={(e) => { handleInput(null, e.target.value); }} value={input} placeholder="key word or sid" className="nav-search-input" type="text" />
        <div className="clear-input" onClick={() => { handleClear(); }}></div>
      </div>
      <div className="nav-tools">
        <button className="btn-switch" type="submit" onClick={() => { navigate('/'); }}>Home</button>
      </div>
    </div>
  );
}

export default AddMapHeader;
