/* eslint-disable default-param-last */
enum SCOREACTION {
  RESET_SCORE = 'RESET_SCORE',
  UPDATE_SCORE = 'UPDATE_SCORE',
  SET_TOTAL_OBJECTS = 'SET_TOTAL_OBJECTS',
  HIT = 'HIT'
}

export interface IGameScore {
  points: number;
  accuracy: number;
  totalHits: number;
  totalObjects: number;
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

type IScoreAction = IGameResetAction | IGameUpdateScoreAction | IGameHitAction | IGameSetOBjects;

const initialState: IGameScore = {
  points: 0,
  accuracy: 0,
  totalHits: 0,
  totalObjects: 0,
};

export const gameScoreReducer = (state = initialState, action: IScoreAction): IGameScore => {
  switch (action.type) {
    case SCOREACTION.UPDATE_SCORE:
      return {
        ...state,
        points: state.points + action.payload,
        // totalHits: state.totalHits + 1,
        accuracy: +((state.totalHits / state.totalObjects) * 100).toFixed(0),
      };
    case SCOREACTION.SET_TOTAL_OBJECTS:
      return {
        ...state,
        totalObjects: state.totalObjects + 1,

      };
    case SCOREACTION.HIT:
      return {
        ...state,
        totalHits: state.totalHits + 1,
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
