import { useState } from 'react';
import LoginComponent from '../Login/LoginComponent';
import RegisterCmponents from '../Register/RegisterCmponents';
import './authPopup.scss';

export default function AuthPopup(): JSX.Element {
  const [window, setWindow] = useState(false);
  return (
    <div className="popup">

      {window ? <LoginComponent /> : <RegisterCmponents />}
      <button onClick={() => setWindow(!window)} type="button">{window ? 'Регистрация' : 'У меня уже есть аккаунт'}</button>
    </div>
  );
}
