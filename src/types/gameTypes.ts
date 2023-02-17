import { HitObjects } from './mapsDataTypes/osuDataTypes';

export interface UpdatedObject extends HitObjects {
  unKey: string;
  animationTime: number;
  keyframes: { x: number; y: number }[] | undefined;
}
export interface IGameElement {
  model: UpdatedObject;
  colors?: string[][];
  audioRef: React.RefObject<HTMLAudioElement>;
}

export interface IRadiusRingProps {
  x: number;
  y: number;
  visible: boolean;
}
