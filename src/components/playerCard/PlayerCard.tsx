import React, { useState } from 'react';
import './playerCard.scss';
import avatarPlug from '../../assets/plugs/avatar-plug.jpg';

interface IUser {
  name: string | null;
  id: number | null;
  performance?: string | null;
}

export default function PlayerCard() {
  const [user, setUser] = useState<IUser>({
    name: null,
    id: null,
    performance: null,
  });

  fetch('https://jsonplaceholder.typicode.com/users/1')
    .then((response) => response.json())
    .then((json) => {
      setUser({
        name: json.name,
        id: json.id,
        performance: json.phone,
      });
    });

  return (
    <div className="playerCard">
      <img className="playerCard-avatar" src={avatarPlug} alt="" />
      <div className="playerCard-info">
        <p className="playerCard-name">{user.name}</p>
        <p className="playerCard-performance">
          Performance:
          {' '}
          {user.performance}
        </p>
        <p className="playerCard-accuracy">Accuracy: 100%</p>
        <div className="playerCard-lvl lvl">
          <p className="lvl-count">lvl: 80</p>
          <div className="lvl-bar">
            <div className="lvl-progress" />
          </div>
        </div>
      </div>
    </div>

  );
}
