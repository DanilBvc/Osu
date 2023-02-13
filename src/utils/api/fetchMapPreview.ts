/* eslint-disable default-param-last */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-await-in-loop */
export interface Result {
  images: string;
  audio: string;
  beatMapInfo: string;
  id: string;
}
export const fetchMapPreview = async (count = 20, action = 'popular', payload?: {
  classification?: number;
  language?: number;
  search?: string;
}) => {
  let url = `https://api.sayobot.cn/beatmaplist?0=${count}&1=20&2=2&5=1`;
  if (action === 'classification') {
    url = `https://api.sayobot.cn/beatmaplist?0=${count}&1=0&2=4&7=${payload?.classification ? payload.classification : 1}&8=${payload?.language ? payload.language : 1}${payload?.search ? `&3=${payload.search}&5=1` : '&5=1'}`;
  }
  if (action === 'recently') {
    url = `https://api.sayobot.cn/beatmaplist?0=${count}&1=0${payload?.search ? `&2=4&3=${payload.search}&5=1` : '&2=2&5=1'}`;
  }
  if (action === 'popular') {
    url = `https://api.sayobot.cn/beatmaplist?0=${count}&1=0${payload?.search ? `&2=4&3=${payload.search}&5=1` : '&2=1&5=1'}`;
  }
  const response = await fetch(url);
  const resultData = await response.json();

  const handlePromise = async () => {
    const res = await resultData.data.map((item: any) => new Promise((resolve, reject) => {
      const beatMapInfoUrl = `https://api.sayobot.cn/beatmapinfo?1=${item.sid}`;
      const req = fetch(beatMapInfoUrl).then((data) => data.json());
      resolve(req);
    }));
    const fetchedData = await Promise.all(res).then((data: any[]) => {
      let result: Result[] | [] = [];
      data.forEach((item) => {
        const imgUrl = `https://cdn.sayobot.cn:25225/beatmaps/${item.data[0].sid}/covers/cover.webp`;
        const audioPreviewUrl = `https://cdn.sayobot.cn:25225/preview/${item.data[0].sid}.mp3`;
        result = [...result, {
          images: imgUrl,
          audio: audioPreviewUrl,
          beatMapInfo: item.data,
          id: item.data[0].sid,
        }];
      });
      return result;
    });
    return fetchedData;
  };

  return { result: await handlePromise(), loading: false };
};
