import { Level } from './Level';
import { regions } from '../regions/regions';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Game',
};

export class Level1 extends Level {

  constructor() {
    super(sceneConfig, regions.arbo.areas.quest_assignment);
  }

}
