import React from 'react';
import useUnsub from '../../customHooks/useUnsub';
import './notFound.scss';

function NotFound() {
  useUnsub();
  return (
    <div className="not-found-wrapper">
      <div className="notfound"></div>
    </div>
  );
}

export default NotFound;
