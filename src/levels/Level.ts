import { Player } from '../player/Player';
import { Area } from '../regions/types';
import { canvas } from '../utils/GameCanvas';
import { config } from '../config';
import { HeightMap } from '../utils/HeightMap';

export class Level extends Phaser.Scene {
  public heightMap: HeightMap;
  protected player: Player;
  private map: string;
  private readonly heightMapName: string;
  private cameraMoving: boolean;
  private cameraLock: boolean = false;
  private playableWidth: number;
  private playableHeight: number;

  constructor(config: string | Phaser.Types.Scenes.SettingsConfig, area: Area) {
    super(config);

    this.map = area.region.key + '/' + area.key + '/map';
    this.heightMapName = area.region.key + '/' + area.key + '/height_map';

    console.log(this.heightMap);
  }

  public create() {
    this.heightMap = this.buildHeightMap(this.heightMapName);
    const mapImage = this.add.image(0, 0, this.map).setOrigin(0, 0);
    this.playableWidth = mapImage.width;
    this.playableHeight = mapImage.height;

    this.player = new Player(this, this.playableWidth / 2, this.playableHeight / 2);
    this.cameraMoving = false;

    // Set the size of the camera's viewport to match the playable area
    this.cameras.main.setSize(this.playableWidth, this.playableHeight);
  }

  public update(): void {
    if (!this.cameraMoving) {

      this.handleEdgeCameraMovement();

      this.player.update();
    }

  }

  public buildHeightMap(heightMapName: string): HeightMap {
    const heightmap = this.cache.binary.get(heightMapName);
    return new HeightMap(heightmap);
  }

  private handleEdgeCameraMovement() {
    if (this.cameraLock) {
      return;
    }

    const { scrollX, scrollY } = this.cameras.main;
    const { edgeThreshold, movingPercentage } = config.camera;
    const { height, width } = canvas;

    const topEdge = scrollY + edgeThreshold;
    const bottomEdge = scrollY + height - edgeThreshold;
    const leftEdge = scrollX + edgeThreshold;
    const rightEdge = scrollX + width - edgeThreshold;

    const { x: playerX, y: playerY } = this.player.sprite;

    const targetY = Math.max(
      scrollY - (height * movingPercentage),
      0
    );
    const targetX = Math.max(
      scrollX - (width * movingPercentage),
      0
    );

    const maxY = this.playableHeight - height;
    const maxX = this.playableWidth - width;

    if (playerY < topEdge && scrollY > 0) {
      this.moveCameraSmoothly(scrollX, targetY);
    } else if (playerY > bottomEdge && scrollY + height < maxY) {
      this.moveCameraSmoothly(scrollX, targetY + height);
    } else if (playerX < leftEdge && scrollX > 0) {
      this.moveCameraSmoothly(targetX, scrollY);
    } else if (playerX > rightEdge && scrollX + width < maxX) {
      this.moveCameraSmoothly(targetX + width, scrollY);
    }
  }

  private moveCameraSmoothly(targetX: number, targetY: number) {
    this.cameraMoving = true;
    this.tweens.add({
      targets: this.cameras.main,
      scrollX: targetX,
      scrollY: targetY,
      duration: 500 / config.camera.movingSpeed, // Adjust the duration as needed for a smooth transition
      onComplete: () => {
        this.cameraMoving = false;
      },
    });
  }
}
