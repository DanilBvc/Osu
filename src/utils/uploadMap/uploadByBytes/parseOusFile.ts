/* eslint-disable no-plusplus */
/* eslint-disable no-bitwise */
/* eslint-disable no-continue */

import { Data, HitObjects } from '../../../types/mapsDataTypes/osuDataTypes';

/* eslint-disable no-case-declarations */
const getDataFromOsuMap = (text: string) => {
  const HIT_TYPE_CIRCLE = 1;
  const HIT_TYPE_SLIDER = 2;
  const HIT_TYPE_NEWCOMBO = 4;
  const HIT_TYPE_SPINNER = 8;
  const data: Data = {
    general: {

    },
    metadata: {

    },
    difficulty: {

    },
    colors: [],
    events: [],
    timingPoints: [],
    hitObjects: [],
  };
  let section: null | string = null;
  let combo = 0;
  let index = 0;
  let forceNewCombo = false;
  const lines = text.replace('\r', '').split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === '') continue;
    if (line.indexOf('//') === 0) continue;
    if (line.indexOf('[') === 0) {
      section = line;
      continue;
    }
    switch (section) {
      case '[General]':
        const keyGeneral = line.substr(0, line.indexOf(':'));
        const valueGeneral = line.substr(line.indexOf(':') + 1).trim();
        if (Number.isNaN(+valueGeneral)) {
          data.general[keyGeneral] = valueGeneral;
        } else {
          data.general[keyGeneral] = (+valueGeneral);
        }
        break;
      case '[Metadata]':
        const keyMetadata = line.substr(0, line.indexOf(':'));
        const valueMetadata = line.substr(line.indexOf(':') + 1).trim();
        data.metadata[keyMetadata] = valueMetadata;
        break;
      case '[Events]':
        data.events = [...data.events, line.split(',')];
        break;
      case '[Difficulty]':
        const partsDifficulty = line.split(':');
        const valueDifficulty = partsDifficulty[1].trim();
        if (Number.isNaN(+valueDifficulty)) {
          data.difficulty[partsDifficulty[0]] = valueDifficulty;
        } else {
          data.difficulty[partsDifficulty[0]] = (+valueDifficulty);
        }
        break;
      case '[TimingPoints]':
        const partsTimingPoints = line.split(',');
        const TimingPoints = {
          offset: +partsTimingPoints[0],
          millisecondsPerBeat: +partsTimingPoints[1],
          meter: +partsTimingPoints[2],
          sampleSet: +partsTimingPoints[3],
          sampleIndex: +partsTimingPoints[4],
          volume: +partsTimingPoints[5],
          uninherited: +partsTimingPoints[6],
          kaiMode: +partsTimingPoints[7],
        };
        if (TimingPoints.sampleSet > 3) TimingPoints.sampleSet = 0;
        if (TimingPoints.millisecondsPerBeat < 0) {
          TimingPoints.uninherited = 0;
        }
        data.timingPoints = [...data.timingPoints, TimingPoints];
        break;
      case '[Colours]':
        const partsColours = line.split(':');
        const keyColours = partsColours[0].trim();
        const valueColours = partsColours[1].trim();
        data.colors.push(valueColours.split(','));
        break;
      case '[HitObjects]':
        const parts = line.split(',');
        const hit: HitObjects = {
          x: +parts[0],
          y: +parts[1],
          time: +parts[2],
          type: +parts[3],
          hitSound: +parts[4],
        };
        if ((+hit.type & HIT_TYPE_NEWCOMBO) > 0 || forceNewCombo) {
          combo++;
          combo += (+hit.type >> 4) & 7;
          index = 0;
        }
        forceNewCombo = false;
        hit.combo = combo;
        hit.index = index++;

        if ((+hit.type & HIT_TYPE_CIRCLE) > 0) {
          hit.type = 'circle';
          const hitSample = (parts.length > 5 ? parts[5] : '0:0:0:0:').split(':');
          hit.hitSample = {
            normalSet: +hitSample[0],
            additionSet: +hitSample[1],
            index: +hitSample[2],
            volume: +hitSample[3],
            filename: hitSample[4],
          };
        } else if ((+hit.type & HIT_TYPE_SLIDER) > 0) {
          hit.type = 'slider';
          const sliderKeys = parts[5].split('|');
          const [sliderType] = sliderKeys;
          hit.sliderType = sliderType;
          hit.keyframes = [];
          for (let j = 1; j < sliderKeys.length; j++) {
            const p = sliderKeys[j].split(':');
            hit.keyframes = [...hit.keyframes, { x: +p[0], y: +p[1] }];
          }
          hit.repeat = +parts[6];
          hit.pixelLength = +parts[7];

          if (parts.length > 8) {
            hit.edgeHitsounds = parts[8].split('|').map(Number);
          } else {
            hit.edgeHitsounds = [];
            for (let wdnmd = 0; wdnmd < hit.repeat + 1; wdnmd += 1) {
              hit.edgeHitsounds = [...hit.edgeHitsounds, 0];
            }
          }

          hit.edgeSets = [];
          for (let wdnmd = 0; wdnmd < hit.repeat + 1; wdnmd += 1) {
            hit.edgeSets = [...hit.edgeSets, {
              normalSet: 0,
              additionSet: 0,
            }];
          }
          if (parts.length > 9) {
            const additions = parts[9].split('|');
            for (let wdnmd = 0; wdnmd < additions.length; wdnmd++) {
              const sets = additions[wdnmd].split(':');
              hit.edgeSets[wdnmd].normalSet = +sets[0];
              hit.edgeSets[wdnmd].additionSet = +sets[1];
            }
          }
          const hitSample = (parts.length > 10 ? parts[10] : '0:0:0:0:').split(':');
          hit.hitSample = {
            normalSet: +hitSample[0],
            additionSet: +hitSample[1],
            index: +hitSample[2],
            volume: +hitSample[3],
            filename: hitSample[4],
          };
        } else if ((+hit.type & HIT_TYPE_SPINNER) > 0) {
          if (+hit.type & HIT_TYPE_NEWCOMBO) { combo--; }
          hit.combo = combo - ((+hit.type >> 4) & 7);
          forceNewCombo = true;
          hit.type = 'spinner';
          hit.endTime = +parts[5];
          if (hit.endTime < hit.time) { hit.endTime = hit.time + 1; }
          const hitSample = (parts.length > 6 ? parts[6] : '0:0:0:0:').split(':');
          hit.hitSample = {
            normalSet: +hitSample[0],
            additionSet: +hitSample[1],
            index: +hitSample[2],
            volume: +hitSample[3],
            filename: hitSample[4],
          };
        }
        if (hit.hitSample && hit.hitSample.normalSet > 3) { hit.hitSample.normalSet = 0; }
        if (hit.hitSample && hit.hitSample.additionSet > 3) { hit.hitSample.additionSet = 0; }
        data.hitObjects = [...data.hitObjects, hit];
        break;
      default:
    }
  }

  return data;
};
export default getDataFromOsuMap;
