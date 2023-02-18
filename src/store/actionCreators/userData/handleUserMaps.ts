const actionType = 'HANDLE_USER_MAPS';
const handleUserMaps = (payload: {
  name: string;
  email: string;
  avatar: string;
  accessToken: string;
  performance: number;
  accuracy: number;
  lvl: number;
  uuid: string;
  maps: number[] | number;
}) => ({
  type: actionType,
  payload,
});
export default handleUserMaps;
