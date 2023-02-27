import React from 'react';
import useUnsub from '../../customHooks/useUnsub';
import './notFound.scss';

function NotFound() {
  useUnsub();
  return (
    <div className="notfound"></div>
  );
}

export default NotFound;
