import { signOut } from 'firebase/auth';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../firebase/firebase';
import clearUserData from '../../store/actionCreators/userData/clearUserData';
import { setAuthLoadingAction } from '../../store/reducers/authLoadingReducer';
import { setAuthPopupActiveAction } from '../../store/reducers/authPopupActiveReducer';
import IReducers from '../../types/reducers/reducersType';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';
import LoginComponent from '../Login/LoginComponent';
import RegisterCmponents from '../Register/RegisterCmponents';
import authFormHeadlineShaker from './authFormHeadlineShaker';
import './authPopup.scss';

export default function AuthPopup(): JSX.Element {
  const dispatch = useDispatch();
  const [currentAuthComponent, switchAuthComponents] = useState(false);
  const setAuthPopupActive = (status: boolean) => dispatch(setAuthPopupActiveAction(status));
  const authPopupActive = useSelector((state: IReducers) => state.authPopupActiveReducer);
  const isAuth = useSelector((state: IReducers) => !!state.userDataReducer.email);
  const { name } = useSelector((state: IReducers) => state.userDataReducer);
  const clearStoreUserData = () => dispatch(clearUserData());
  const setAuthLoading = (status: boolean) => dispatch(setAuthLoadingAction(status));
  const authLoading = useSelector((state: IReducers) => state.authLoadingReducer);

  return (
    <div
      className={`auth-popup ${authPopupActive || !isAuth ? 'active' : ''}`}
      role="menuitem"
      tabIndex={0}
      onClick={() => {
        setAuthPopupActive(false);
        authFormHeadlineShaker();
      }}
    >
      <div
        className={`auth-popup__content ${authPopupActive || !isAuth ? 'active' : ''}`}
        role="menuitem"
        tabIndex={0}
        onClick={(event) => event.stopPropagation()}
      >
        {(() => {
          if (authLoading) {
            return (
              <>
                <h2>...Authentification</h2>
                <LoadingSpinner />
              </>
            );
          }
          return isAuth
            ? (
              <>
                <h1 className="authorized-title">
                  You are authorized as
                  <span className="user-name">{` ${name}`}</span>
                </h1>
                <button
                  className="sing-out-button hover-pink-bgc"
                  onClick={() => {
                    signOut(auth);
                    clearStoreUserData();
                    setAuthLoading(false);
                  }}
                  type="submit"
                >
                  Sign out
                </button>
              </>
            )
            : (
              <>
                {currentAuthComponent ? <RegisterCmponents /> : <LoginComponent />}
                <p className="authorization-components-switch-button-title">
                  {currentAuthComponent ? 'I already have an account' : 'Do not have an account?'}
                </p>
                <button
                  className="authorization-components-switch-button hover-pink-bgc"
                  onClick={() => switchAuthComponents(!currentAuthComponent)}
                  type="button"
                >
                  {currentAuthComponent ? 'Sign in' : 'Sign up'}
                </button>
              </>
            );
        })()}
      </div>
    </div>
  );
}
