const getNewsDataFromApi = async () => {
  const url = 'http://api.osugame.online/fetch/';
  const request = await fetch(url);
  const result = await request.json();
  return result;
};
export default getNewsDataFromApi;
