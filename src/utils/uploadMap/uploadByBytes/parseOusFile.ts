/* eslint-disable block-scoped-var */
/* eslint-disable no-plusplus */
/* eslint-disable no-bitwise */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable default-case */
/* eslint-disable no-new */
/* eslint-disable no-continue */
/* eslint-disable no-case-declarations */
/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-explicit-any */
const getDataFromOsuMap = (text: string) => {
  const HIT_TYPE_CIRCLE = 1;
  const HIT_TYPE_SLIDER = 2;
  const HIT_TYPE_NEWCOMBO = 4;
  const HIT_TYPE_SPINNER = 8;
  const data: any = {
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
        var key = line.substr(0, line.indexOf(':'));
        var value = line.substr(line.indexOf(':') + 1).trim();
        if (isNaN(+value)) {
          data.general[key] = value;
        } else {
          data.general[key] = (+value);
        }
        break;
      case '[Metadata]':
        var key = line.substr(0, line.indexOf(':'));
        var value = line.substr(line.indexOf(':') + 1).trim();
        data.metadata[key] = value;
        break;
      case '[Events]':
        data.events.push(line.split(','));
        break;
      case '[Difficulty]':
        var parts = line.split(':');
        var value = parts[1].trim();
        if (isNaN(+value)) {
          data.difficulty[parts[0]] = value;
        } else {
          data.difficulty[parts[0]] = (+value);
        }
        break;
      case '[TimingPoints]':
        var parts = line.split(',');
        var t = {
          offset: +parts[0],
          millisecondsPerBeat: +parts[1],
          meter: +parts[2],
          sampleSet: +parts[3],
          sampleIndex: +parts[4],
          volume: +parts[5],
          uninherited: +parts[6],
          kaiMode: +parts[7],
        };
        // fallback to default set if sampleset is illegal
        if (t.sampleSet > 3) t.sampleSet = 0;
        if (t.millisecondsPerBeat < 0) {
          t.uninherited = 0;
        }
        data.timingPoints.push(t);
        break;
      case '[Colours]':
        var parts = line.split(':');
        var key = parts[0].trim();
        var value = parts[1].trim();
        if (key === 'SliderTrackOverride') { data.colors.SliderTrackOverride = value.split(','); } else if (key === 'SliderBorder') { data.colors.SliderBorder = value.split(','); } else data.colors.push(value.split(','));
        break;
      case '[HitObjects]':
        var parts = line.split(',');
        var hit: any = {
          x: +parts[0],
          y: +parts[1],
          time: +parts[2],
          type: +parts[3],
          hitSound: +parts[4],
        };
        // Handle combos
        if ((hit.type & HIT_TYPE_NEWCOMBO) > 0 || forceNewCombo) {
          combo++;
          combo += (hit.type >> 4) & 7; // combo skip
          index = 0;
        }
        forceNewCombo = false;
        hit.combo = combo;
        hit.index = index++;

        // Decode specific hit object type
        if ((hit.type & HIT_TYPE_CIRCLE) > 0) {
          hit.type = 'circle';
          // parse hitSample
          const hitSample = (parts.length > 5 ? parts[5] : '0:0:0:0:').split(':');
          hit.hitSample = {
            normalSet: +hitSample[0],
            additionSet: +hitSample[1],
            index: +hitSample[2],
            volume: +hitSample[3],
            filename: hitSample[4],
          };
        } else if ((hit.type & HIT_TYPE_SLIDER) > 0) {
          hit.type = 'slider';
          const sliderKeys = parts[5].split('|');
          hit.sliderType = sliderKeys[0];
          hit.keyframes = [];
          for (let j = 1; j < sliderKeys.length; j++) {
            const p = sliderKeys[j].split(':');
            hit.keyframes.push({ x: +p[0], y: +p[1] });
          }
          hit.repeat = +parts[6];
          hit.pixelLength = +parts[7];

          if (parts.length > 8) {
            hit.edgeHitsounds = parts[8].split('|').map(Number);
          } else {
            hit.edgeHitsounds = [];
            for (var wdnmd = 0; wdnmd < hit.repeat + 1; wdnmd++) { hit.edgeHitsounds.push(0); }
          }

          hit.edgeSets = [];
          for (var wdnmd = 0; wdnmd < hit.repeat + 1; wdnmd++) {
            hit.edgeSets.push({
              normalSet: 0,
              additionSet: 0,
            });
          }
          if (parts.length > 9) {
            const additions = parts[9].split('|');
            for (var wdnmd = 0; wdnmd < additions.length; wdnmd++) {
              const sets = additions[wdnmd].split(':');
              hit.edgeSets[wdnmd].normalSet = +sets[0];
              hit.edgeSets[wdnmd].additionSet = +sets[1];
            }
          }
          // parse hitSample
          const hitSample = (parts.length > 10 ? parts[10] : '0:0:0:0:').split(':');
          hit.hitSample = {
            normalSet: +hitSample[0],
            additionSet: +hitSample[1],
            index: +hitSample[2],
            volume: +hitSample[3],
            filename: hitSample[4],
          };
        } else if ((hit.type & HIT_TYPE_SPINNER) > 0) {
          if (hit.type & HIT_TYPE_NEWCOMBO) { combo--; }
          hit.combo = combo - ((hit.type >> 4) & 7); // force in same combo
          forceNewCombo = true; // force next object in new combo
          hit.type = 'spinner';
          hit.endTime = +parts[5];
          if (hit.endTime < hit.time) { hit.endTime = hit.time + 1; }
          // parse hitSample
          const hitSample = (parts.length > 6 ? parts[6] : '0:0:0:0:').split(':');
          hit.hitSample = {
            normalSet: +hitSample[0],
            additionSet: +hitSample[1],
            index: +hitSample[2],
            volume: +hitSample[3],
            filename: hitSample[4],
          };
        } else {
          console.log(`Attempted to decode unknown hit object type ${hit.type}: ${line}`);
        }
        // fallback to default set if sampleset is illegal
        if (hit.hitSample && hit.hitSample.normalSet > 3) { hit.hitSample.normalSet = 0; }
        if (hit.hitSample && hit.hitSample.additionSet > 3) { hit.hitSample.additionSet = 0; }
        data.hitObjects.push(hit);
        break;
    }
  }
  return data;
};
export default getDataFromOsuMap;
