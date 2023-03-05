/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable default-param-last */
/* eslint-disable no-await-in-loop */

import { ResponseItem, Result, BigData } from '../../types/mapsDataTypes/mapsDataFromApiTypes';

const fetchMapPreview = async (count = 20, action = 'popular', payload?: {
  classification?: number;
  language?: number;
  search?: string;
}) => {
  let url = `https://api.sayobot.cn/beatmaplist?0=${count}&1=20&2=2&5=1`;
  if (action === 'classification') {
    if (payload?.search && !!Number(payload.search)) {
      url = `https://api.sayobot.cn/beatmapinfo?1=${payload.search}`;
    } else {
      url = `https://api.sayobot.cn/beatmaplist?0=${count}&1=0&2=4&7=${payload?.classification ? payload.classification : 1}&8=${payload?.language ? payload.language : 1}${payload?.search ? `&3=${payload.search}&5=1` : '&5=1'}`;
    }
  }
  if (action === 'recently' || action === 'download') {
    if (payload?.search && !!Number(payload.search)) {
      url = `https://api.sayobot.cn/beatmapinfo?1=${payload.search}`;
    } else {
      url = `https://api.sayobot.cn/beatmaplist?0=${count}&1=0${payload?.search ? `&2=4&3=${payload.search}&5=1` : '&2=2&5=1'}`;
    }
  }
  if (action === 'popular') {
    if (payload?.search && !!Number(payload.search)) {
      url = `https://api.sayobot.cn/beatmapinfo?1=${payload.search}`;
    } else {
      url = `https://api.sayobot.cn/beatmaplist?0=${count}&1=0${payload?.search ? `&2=4&3=${payload.search}&5=1` : '&2=1&5=1'}`;
    }
  }
  if (action === 'random') {
    if (payload?.search && !!Number(payload.search)) {
      url = `https://api.sayobot.cn/beatmapinfo?1=${payload.search}`;
    } else {
      url = `https://api.sayobot.cn/beatmaplist?0=${count}&1=${Math.floor(Math.random() * 100000) + 1}&2=1&5=1`;
    }
  }
  const response = await fetch(url);
  const resultData = await response.json();
  const handlePromise = async () => {
    const res = await resultData.data.map((item: ResponseItem) => new Promise((resolve, reject) => {
      const beatMapInfoUrl = `https://api.sayobot.cn/v2/beatmapinfo?0=${item.sid}`;
      const headers = {};
      const req = fetch(beatMapInfoUrl, {
        method: 'GET',
        mode: 'cors',
        headers,
      }).then((data) => data.json());
      resolve(req);
    }));
    const fetchedData = await Promise.all(res).then((data: any) => {
      let result: Result[] | [] = [];
      data.forEach((item: any) => {
        //  const imgUrl = `https://cdn.sayobot.cn:25225/beatmaps/${item.data.sid}/covers/cover.webp`;
        // const audioPreviewUrl = `https://cdn.sayobot.cn:25225/preview/${item.data.sid}.mp3`;

        const imgUrl = `https://de1.sayobot.cn/beatmaps/${item.data.sid}/covers/cover.webp`;
        const audioPreviewUrl = `https://de1.sayobot.cn/preview/${item.data.sid}.mp3`;

        result = [...result, {
          images: imgUrl,
          audio: audioPreviewUrl,
          beatMapInfo: item.data,
          id: item.data.sid,
        }];
      });
      return result;
    });
    return fetchedData;
  };

  if (resultData.data === undefined) {
    return { result: null, loading: false };
  }
  return { result: await handlePromise(), loading: false };
};

export default fetchMapPreview;
