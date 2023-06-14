import { Area, Region } from './types';

let arbo: Region = {
  name: 'Arbo',
  key: 'arbo',
  areas: {}
} as Region;

let quest_assignment: Area = {
  name: 'Quest Assignment',
  key: 'quest_assignment',
  region: arbo
};

arbo.areas = { quest_assignment };


export const regions: Record<string, Region> = {
  arbo
};
