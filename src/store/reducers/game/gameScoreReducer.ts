/* eslint-disable max-len */
/* eslint-disable default-param-last */
enum SCOREACTION {
  RESET_SCORE = 'RESET_SCORE',
  UPDATE_SCORE = 'UPDATE_SCORE'
}

export interface IGameScore {
  points: number;
  accuracy: number;
}

export interface IGameResetAction {
  type: SCOREACTION.RESET_SCORE;
  payload: IGameScore;
}

interface IGameUpdateAction {
  type: SCOREACTION.UPDATE_SCORE;
  payload: IGameScore;
}

type IScoreAction = IGameResetAction | IGameUpdateAction;

const initialState: IGameScore = {
  points: 0,
  accuracy: 0,
};

export const gameScoreReducer = (state = initialState, action: IScoreAction): IGameScore => {
  switch (action.type) {
    case SCOREACTION.UPDATE_SCORE:
      return { ...action.payload };
    case SCOREACTION.RESET_SCORE:
      return { ...initialState };
    default:
      return state;
  }
};

export const resetGameAction = (payload: IGameScore) => (
  { type: SCOREACTION.RESET_SCORE, payload }
);

export const updateScore = (payload: IGameScore) => (
  { type: SCOREACTION.UPDATE_SCORE, payload }
);
