import { HitObjects, Timing } from './osuDataTypes';

export interface AudioFromApi {
  audioName: string;
  audioFile: string;
}

export interface Images {
  imagesName: string;
  imagesFile: string;
}

export interface MapData {
  colors: number[][];
  difficulty: {
    ApproachRate: number;
    CircleSize: number;
    HPDrainRate: number;
    OverallDifficulty: number;
    SliderMultiplier: number;
    SliderTickRate: number;
  };
  events: string[][];
  general: {
    AudioFilename: string;
    AudioLeadIn: number;
    Countdown: number;
    LetterboxInBreaks: number;
    Mode: number;
    PreviewTime: number;
    SampleSet: string;
    StackLeniency: number;
    WidescreenStoryboard: number;
  };
  hitObjects: HitObjects[];
  metadata: {
    Artist: string;
    ArtistUnicode: string;
    BeatmapID: string;
    BeatmapSetID: string;
    Creator: string;
    Source: string;
    Tags: string;
    Title: string;
    TitleUnicode: string;
    Version: string;
  };
  timingPoints: Timing[];
}

export interface MapDataFromApi {
  id: string;
  mapName: string;
  audio: string;
  additionAudio: AudioFromApi[];
  images: Images[];
  mapData: MapData[];
}
export interface BeatData {
  AR: number;
  BPM: number;
  CS: number;
  HP: number;
  OD: number;
  aim: number;
  artist: string;
  artistU: string;
  bid: number;
  creator: string;
  favourite_count: number;
  img: string;
  length: number;
  maxcombo: number;
  mode: number;
  passcount: number;
  playcount: number;
  pp: number;
  pp_aim: number;
  ranked: number;
  sid: number;
  source: string;
  speed: number;
  star: number;
  submitted: number;
  title: string;
  titleU: string;
  version: string;
  video: string;
}
