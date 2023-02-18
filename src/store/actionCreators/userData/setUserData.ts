const actionType = 'SET_USER_DATA';
const setUserData = (payload: {
  name: string;
  email: string;
  avatar: string;
  accessToken: string;
  performance: number;
  accuracy: number;
  lvl: number;
  uuid: string;
  maps: string[];
}) => ({
  type: actionType,
  payload,
});
export default setUserData;
