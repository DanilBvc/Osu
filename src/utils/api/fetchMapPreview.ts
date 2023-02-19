/* eslint-disable default-param-last */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { BeatData } from '../../types/mapsDataTypes/mapsDataFromApiTypes';

/* eslint-disable no-await-in-loop */
export interface BigData {
  AR: number;
  CS: number;
  HP: number;
  OD: number;
  aim: number;
  audio: string;
  bg: string;
  bid: number;
  circles: number;
  hit300window: number;
  img: string;
  length: number;
  maxcombo: number;
  mode: number;
  passcount: number;
  playcount: number;
  pp: number;
  pp_acc: number;
  pp_aim: number;
  pp_speed: number;
  sliders: number;
  speed: number;
  spinners: number;
  star: number;
  strain_aim: string;
  strain_speed: string;
  version: string;
}
export interface ResponseItem {
  approved: number;
  approved_date: number;
  artist: string;
  artistU: string;
  bid_data: BigData[];
  bids_amount: number;
  bpm: number;
  creator: string;
  creator_id: number;
  favourite_count: number;
  genre: number;
  language: number;
  last_update: number;
  local_update: number;
  preview: number;
  sid: number;
  source: string;
  storyboard: number;
  tags: string;
  title: string;
  titleU: string;
  video: number;
}
export interface Result {
  images: string;
  audio: string;
  beatMapInfo: ResponseItem;
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
  if (action === 'recently' || action === 'download') {
    url = `https://api.sayobot.cn/beatmaplist?0=${count}&1=0${payload?.search ? `&2=4&3=${payload.search}&5=1` : '&2=2&5=1'}`;
  }
  if (action === 'popular') {
    url = `https://api.sayobot.cn/beatmaplist?0=${count}&1=0${payload?.search ? `&2=4&3=${payload.search}&5=1` : '&2=1&5=1'}`;
  }
  if (action === 'random') {
    url = `https://api.sayobot.cn/beatmaplist?0=${count}&1=${Math.floor(Math.random() * 100000) + 1}&2=1&5=1`;
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
        const imgUrl = `https://cdn.sayobot.cn:25225/beatmaps/${item.data.sid}/covers/cover.webp`;
        const audioPreviewUrl = `https://cdn.sayobot.cn:25225/preview/${item.data.sid}.mp3`;
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

  return { result: await handlePromise(), loading: false };
};
