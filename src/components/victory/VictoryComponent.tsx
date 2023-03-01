/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  arrayUnion, doc, getDoc, updateDoc
} from '@firebase/firestore';
import IReducers from '../../types/reducers/reducersType';
import './victory.scss';
import SelectMapPageFooter from '../selectMap/footer/SelectMapPageFooter';
import { db } from '../../firebase/firebase';

function VictoryComponent() {
  const mapsData = useSelector((state: IReducers) => state.activeGameReduccer);
  const songDiffucult = useSelector((state: IReducers) => state.songDifficultyIndexReducer);
  const gameScore = useSelector((state: IReducers) => state.gameScoreReducer);
  const background = useSelector((state: IReducers) => state.backgroundSourceReducer);
  const currentGame = mapsData.mapData[songDiffucult];
  const userData = useSelector((state: IReducers) => state.userDataReducer);
  const gameId = useSelector((state: IReducers) => state.songDifficultyIndexReducer);

  const handler = async () => {
    if (mapsData.id) {
      const docRef = doc(db, 'top', mapsData.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const userName = userData.name;
        const userScore = gameScore.points;
        const currentMapDiff = mapsData.mapData[gameId].metadata.Version;
        const difficultyDataFromBd = JSON.parse(JSON.stringify(docSnap.get(currentMapDiff)));
        if (userName !== null) {
          if (difficultyDataFromBd.length > 0) {
            let newUser = true;
            const resultTopData = difficultyDataFromBd.map((user: {
              userName: string;
              userImg: string;
              userScore: number;
            }) => {
              if (user.userName === userName) {
                newUser = false;
                if (userScore > user.userScore) {
                  return {
                    userName: user.userName,
                    userImg: user.userImg,
                    userScore,
                  };
                }
                return {
                  userName: user.userName,
                  userImg: user.userImg,
                  userScore: user.userScore,
                };
              }
              return user;
            });
            if (newUser) {
              await updateDoc(docRef, {
                [currentMapDiff]:
                  arrayUnion({
                    userName,
                    userImg: userData.avatar,
                    userScore,
                  }),
              });
            } else {
              await updateDoc(docRef, {
                [currentMapDiff]:
                  resultTopData,
              });
            }
          } else {
            await updateDoc(docRef, {
              [currentMapDiff]:
                arrayUnion({ userScore, userName, userImg: userData.avatar }),
            });
          }
        }
      } else {
        console.log('No such document!');
      }
    }
    if (userData.uuid) {
      const userDocRef = doc(db, 'users', userData.uuid);
      const docSnap = await getDoc(userDocRef);
      const userLvl = docSnap.get('lvl');
      const userAccurency = docSnap.get('accuracy');
      if (userAccurency === 0 && gameScore.accuracy !== null) {
        const resultAccurency = `${1}.${gameScore.accuracy % 10 === 0 ? gameScore.accuracy + 1 : gameScore.accuracy}`;
        await updateDoc(userDocRef, {
          accuracy: +resultAccurency,
        });
      } else {
        const spllitedAccurency = userAccurency.toString().split('.');
        const userNumberOfPlayedGames = +spllitedAccurency[0];
        const userAccurencyPercent = +spllitedAccurency[1] % 10 === 0
          ? +spllitedAccurency[1] + 1 : +spllitedAccurency[1];
        const resultAccurency = `${userNumberOfPlayedGames + 1}.${Math.floor((userAccurencyPercent) / (userNumberOfPlayedGames + 1))}`;
        await updateDoc(userDocRef, {
          accuracy: +resultAccurency,
        });
      }
      await updateDoc(userDocRef, {
        lvl: userLvl + gameScore.points,
      });
    }
  };

  useEffect(() => {
    handler();
  }, []);
  return (
    <div className="victory__popup">
      <img src={background} alt="" className="victory-background" />
      <div className="victory-header">
        <div className="victory-map-name">
          {currentGame.metadata.Title.toUpperCase()}
        </div>
        <div className="victory-map-author">
          Beatmap by
          {' '}
          {currentGame.metadata.Artist}
        </div>
      </div>
      <div className="victory-content">
        <div className="points-block">
          <span className="points-block-score">Score</span>
          {' '}
          {gameScore.points}
        </div>
        <div className="victory-points-info">
          <div className="victory-points-up">
            <div className="victory-points-300">
              <div className="victory-icon-300">
                300
              </div>
              {gameScore.hits_300}
              X
            </div>
            <div className="victory-points-100">
              <div className="victory-icon-100">
                100
              </div>
              {gameScore.hits_100}
              X
            </div>
            <div className="victory-points-50">
              <div className="victory-icon-50">
                50
              </div>
              {gameScore.hits_50}
              X
            </div>
          </div>
          <div className="victory-points-bottom">
            <div className="victory-combo">
              <div className="victory-combo-title">
                Combo
              </div>

            </div>
            <div className="victory-accurency">
              <div className="victory-accurency-title">
                Accurency
              </div>
              {gameScore.accuracy}
              %
            </div>
          </div>
        </div>
        <SelectMapPageFooter />
      </div>
    </div>
  );
}

export default VictoryComponent;
