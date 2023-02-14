import { KonvaEventObject } from 'konva/lib/Node';
/* eslint-disable import/prefer-default-export */
export const handleCursor = (e: KonvaEventObject<MouseEvent>) => {
  const stage = e.target.getStage();
  if (stage) {
    if (e.type === 'pointerclick') {
      stage.container().style.cursor = 'default';
    }
    if (e.type === 'mouseleave') {
      stage.container().style.cursor = 'default';
    }
    if (e.type === 'mouseenter') {
      stage.container().style.cursor = 'pointer';
    }
  }
};
