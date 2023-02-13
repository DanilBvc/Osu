interface HitObjectCoords {
  x: number;
  y: number;
}

interface HitObjectEdgeSets {
  normalSet: number;
  additionSet: number;
}

interface Timing {
  offset: number;
  millisecondsPerBeat: number;
  meter: number;
  sampleSet: number;
  sampleIndex: number;
  volume: number;
  uninherited: number;
  kaiMode: number;
}

export interface HitObjects {
  x: number;
  y: number;
  time: number;
  type: number | string;
  hitSound: number;
  combo?: number;
  index?: number;
  hitSample?: {
    normalSet: number;
    additionSet: number;
    index: number;
    volume: number;
    filename: string;
  };
  sliderType?: string;
  keyframes?: [] | HitObjectCoords[];
  repeat?: number;
  pixelLength?: number;
  edgeHitsounds?: number[] | [];
  edgeSets?: [] | HitObjectEdgeSets[];
  endTime?: number;
}
export interface Data {
  general: {
    [key: string]: string | number;
  };
  metadata: {
    [key: string]: string;
  };
  difficulty: {
    [key: string]: string | number;
  };
  colors: string[][];
  colorsSliderTrackOverride?: string[];
  colorsSliderBorder?: string[];
  events: [] | string[][];
  timingPoints: [] | Timing[];
  hitObjects: [] | HitObjects[];
}
