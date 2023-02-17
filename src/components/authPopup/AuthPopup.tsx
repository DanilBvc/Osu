import { useState } from 'react';
import LoginComponent from '../Login/LoginComponent';
import RegisterCmponents from '../Register/RegisterCmponents';
import './authPopup.scss';

export default function AuthPopup(): JSX.Element {
  const [window, setWindow] = useState(false);

  return (
    <div className="popup">
      {window ? <LoginComponent /> : <RegisterCmponents />}
      <button
        className="popup__authorization-components-switch-button hover-pink-bgc"
        onClick={() => setWindow(!window)}
        type="button"
      >
        {window ? 'Sign up' : 'I already have an account'}
      </button>
    </div>
  );
}
