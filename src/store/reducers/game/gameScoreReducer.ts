/* eslint-disable no-case-declarations */
/* eslint-disable no-nested-ternary */
/* eslint-disable default-param-last */
enum SCOREACTION {
  RESET_SCORE = 'RESET_SCORE',
  UPDATE_SCORE = 'UPDATE_SCORE',
  SET_TOTAL_OBJECTS = 'SET_TOTAL_OBJECTS',
  HIT = 'HIT',
  FINISH = 'FINISH',
  HIT_COUNT = 'HIT_COUNT'
}

export interface IGameScore {
  points: number;
  accuracy: number | null;
  totalHits: number;
  totalObjects: number;
  hits_300: number;
  hits_100: number;
  hits_50: number;
}

interface IGameHitAction {
  type: SCOREACTION.HIT;
  payload: number;
}

export interface IGameResetAction {
  type: SCOREACTION.RESET_SCORE;
  payload: IGameScore;
}

interface IGameUpdateScoreAction {
  type: SCOREACTION.UPDATE_SCORE;
  payload: number;
}

interface IGameSetOBjects {
  type: SCOREACTION.SET_TOTAL_OBJECTS;
  payload: number;
}

interface IFinishGameAction {
  type: SCOREACTION.FINISH;
}

interface IHitCountAction {
  type: SCOREACTION.HIT_COUNT;
  payload: number;
}

type IScoreAction =
  IGameResetAction
  | IGameUpdateScoreAction
  | IGameHitAction
  | IGameSetOBjects
  | IFinishGameAction
  | IHitCountAction;

const initialState: IGameScore = {
  points: 0,
  accuracy: 0,
  totalHits: 0,
  totalObjects: 0,
  hits_300: 0,
  hits_100: 0,
  hits_50: 0,
};

export const gameScoreReducer = (state = initialState, action: IScoreAction): IGameScore => {
  switch (action.type) {
    case SCOREACTION.UPDATE_SCORE:
      return {
        ...state,
        points: state.points + action.payload,

      };
    case SCOREACTION.SET_TOTAL_OBJECTS:
      return {
        ...state,
        totalObjects: state.totalObjects + 1,
        accuracy: +((state.totalHits / state.totalObjects) * 100).toFixed(0),
      };
    case SCOREACTION.HIT_COUNT:
      const hitScore = action.payload === 300 ? 300 : action.payload === 100 ? 100 : 50;
      return {
        ...state,
        [`hits_${hitScore}`]: state[`hits_${hitScore}`] + 1,
      };
    case SCOREACTION.HIT:
      return {
        ...state,
        totalHits: state.totalHits + 1,
      };

    case SCOREACTION.FINISH:

      /* Что делать с данными когда игра закончится  */
      return {
        ...state,
      };

    case SCOREACTION.RESET_SCORE:
      return { ...initialState };
    default:
      return state;
  }
};

export const resetGameAction = () => (
  { type: SCOREACTION.RESET_SCORE }
);

export const updatePointsAction = (payload: number) => (
  { type: SCOREACTION.UPDATE_SCORE, payload }
);

export const setTotalObjectsAction = () => (
  { type: SCOREACTION.SET_TOTAL_OBJECTS }
);

export const setTotalHitsAction = () => (
  { type: SCOREACTION.HIT }
);

export const setHitCountAction = (payload: number) => ({ type: SCOREACTION.HIT_COUNT, payload });
