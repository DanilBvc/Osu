import { HitObjects } from './mapsDataTypes/osuDataTypes';

export interface UpdatedObject extends HitObjects {
  visible: boolean;
  unKey: string;
}
export interface IGameElement {
  model: UpdatedObject;
  colors: string[][];
  audioRef: React.RefObject<HTMLAudioElement>;
}
