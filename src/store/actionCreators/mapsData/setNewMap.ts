const actionType = 'SET_NEW_MAP';
const setNewMap = (payload: {
  mapName: string;
  audio: string;
  albumCover: string;
  topPlayers: string[];
  additionalAudio: string[];
  additionalPictures: string[];
}) => ({
  type: actionType,
  payload,
});
export default setNewMap;
