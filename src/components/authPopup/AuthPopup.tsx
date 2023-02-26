import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthPopupActiveAction } from '../../store/reducers/authPopupActiveReducer';
import IReducers from '../../types/reducers/reducersType';
import LoginComponent from '../Login/LoginComponent';
import RegisterCmponents from '../Register/RegisterCmponents';
import './authPopup.scss';

export default function AuthPopup(): JSX.Element {
  const dispatch = useDispatch();
  const [window, setWindow] = useState(false);
  const setAuthPopupActive = (status: boolean) => dispatch(setAuthPopupActiveAction(status));
  const authPopupActive = useSelector((state: IReducers) => state.authPopupActiveReducer);
  const isAuth = useSelector((state: IReducers) => !!state.userDataReducer.email);

  return (
    <div
      className={`auth-popup ${authPopupActive || !isAuth ? 'active' : ''}`}
      role="menuitem"
      tabIndex={0}
      onClick={() => setAuthPopupActive(false)}
    >
      <div
        className={`auth-popup__content ${authPopupActive || !isAuth ? 'active' : ''}`}
        role="menuitem"
        tabIndex={0}
        onClick={(event) => event.stopPropagation()}
      >
        {window ? <LoginComponent /> : <RegisterCmponents />}
        <button
          className="authorization-components-switch-button hover-pink-bgc"
          onClick={() => setWindow(!window)}
          type="button"
        >
          {window ? 'Sign up' : 'I already have an account'}
        </button>
      </div>
    </div>
  );
}
