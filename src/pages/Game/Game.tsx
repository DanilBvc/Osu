/* eslint-disable no-debugger */
import { useRef, useEffect, useState } from 'react';
import { Stage, Layer } from 'react-konva';
import { useDispatch, useSelector } from 'react-redux';
import Konva from 'konva';

import {
  arrayUnion, doc, getDoc, updateDoc
} from 'firebase/firestore';
import IReducers from '../../types/reducers/reducersType';
import './game.scss';
import audioPlug from '../../assets/plugs/audio-plug.mp3';
import useUpdate from '../../customHooks/useUpdate';
import GameBar from './GameBar/GameBar';
import { resetGameAction } from '../../store/reducers/game/gameScoreReducer';
import HitObjects from './hitObjects';
import Preloader from './Preloader/Preloader';
import { useAudioElement } from '../../contexts/audioContextWrapper';
import VictoryComponent from '../../components/victory/VictoryComponent';
import { db } from '../../firebase/firebase';

export default function Game(): JSX.Element {
  const dispatch = useDispatch();

  const gameScore = useSelector((state: IReducers) => state.gameScoreReducer);
  const userData = useSelector((state: IReducers) => state.userDataReducer);

  const mapData = useSelector((state: IReducers) => state.activeGameReduccer);
  const mainPlayerAudioElement = useAudioElement();
  const gameId = useSelector((state: IReducers) => state.songDifficultyIndexReducer);
  const audioRef = useRef<HTMLAudioElement>(null);
  const preloaderDelay = 2000;
  const speedMultiplier = 0.4;
  const { ApproachRate, OverallDifficulty } = mapData.mapData[gameId].difficulty;
  const { hitObjects, timingPoints, colors } = mapData.mapData[gameId];
  // dispatch(resetGameAction());
  const layerRef = useRef<Konva.Layer>(null);
  const gameElements = useUpdate(
    hitObjects,
    timingPoints,
    ApproachRate,
    OverallDifficulty,
    speedMultiplier,
    preloaderDelay
  );

  useEffect(() => {
    if (mainPlayerAudioElement) {
      mainPlayerAudioElement.pause();
    }
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, []);

  const [inGame, setInGame] = useState<boolean>(true);

  const onFinishGame = async () => {
    setInGame(() => false);
    if (mapData.id) {
      const docRef = doc(db, 'top', mapData.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const userName = userData.name;
        const userScore = gameScore.points;
        const currentMapDiff = mapData.mapData[gameId].metadata.Version;
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
        // doc.data() will be undefined in this case
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

  return (
    <div
      className="gameStage"
      style={
        { backgroundImage: `url(${mapData.images[0].imagesFile})` }
      }
    >
      <GameBar />
      {!inGame ? <VictoryComponent /> : null}

      <audio ref={audioRef} src={mapData.audio || audioPlug}>
        <track kind="captions" />
      </audio>

      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer ref={layerRef}>
          <Preloader animationTime={preloaderDelay} />
          <HitObjects
            objects={gameElements}
            colors={colors}
            audioRef={audioRef}
            layerRef={layerRef}
            onFinishGame={onFinishGame}
          />
        </Layer>
      </Stage>
    </div>
  );
}
