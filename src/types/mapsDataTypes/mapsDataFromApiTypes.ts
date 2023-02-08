export interface AudioFromApi {
  audioName: string;
  audioFile: string;
}

export interface Images {
  imagesName: string;
  imagesFile: string;
}

export interface MapDataFromApi {
  id: string;
  mapName: string;
  audio: string;
  additionAudio: AudioFromApi[];
  images: Images[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mapData: any[];
}
