import { Layer } from 'konva/lib/Layer';
import { HitObjects } from './mapsDataTypes/osuDataTypes';

export interface UpdatedObject extends HitObjects {
  unKey: string;
  animationTime: number;
  keyframes: { x: number; y: number }[] | undefined;
  fadeInTime: number;
  fadeOutTime: number;
}

export interface IRadiusRingProps {
  x: number;
  y: number;
}

export interface IResultMessage {
  x: number;
  y: number;
  color: string;
  text: number | string;
  id?: string;
}
export interface IGameElement {
  model: UpdatedObject;
  colors?: number[][];
  layerRef: React.RefObject<Layer>;
  messageHandler?: (result: IResultMessage) => void;
  handleHitSound: (soundIndex: number) => void;
}
