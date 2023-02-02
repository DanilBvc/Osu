import React from 'react';
import LoginComponent from '../../components/Login/LoginComponent';
import RegisterCmponents from '../../components/Register/RegisterCmponents';
import useAuth from '../../customHooks/useAuth';

function MainPage() {
  const {
    isAuth, email, avatar, name,
  } = useAuth();
  return (
    <div>
      {isAuth ? (
        <div>
          <div>{email}</div>
          <div>{avatar ? <img src={avatar} alt="" /> : null}</div>
          <div>{name}</div>
        </div>
      ) : <LoginComponent />}

    </div>
  );
}

export default MainPage;
