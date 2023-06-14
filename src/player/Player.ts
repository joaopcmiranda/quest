import { Physics } from 'phaser';
import { canvas } from '../utils/GameCanvas';
import { config } from '../config';
import { Level } from '../levels/Level';

export class Player {
  public sprite: Physics.Arcade.Sprite;
  private readonly level: Level;

  constructor(level: Level, x: number, y: number) {
    this.sprite = level.physics.add.sprite(x, y, 'man');
    this.level = level;

    // Add oval collision barrier to the player sprite
    const radiusX = config.player.collisionBarrier[0]; // X-axis radius of the oval
    const radiusY = config.player.collisionBarrier[1]; // Y-axis radius of the oval
    this.sprite.body.setSize(radiusX * 2, radiusY * 2);
    this.sprite.body.setOffset(-radiusX, -radiusY);
    this.sprite.body.setCircle(radiusX, radiusY); // Oval collision shape
  }

  public update(): void {
    this.sprite.setVelocity(0, 0);
    const input = this.sprite.scene.input;

    if ((input.mousePointer.isDown || input.pointer1.isDown) && canvas.isCursorInsideGameCanvas) {

      const playerPosition = this.sprite.getCenter();
      const cursorPosition = {
        x: canvas.getCursorPosition().x + this.level.cameras.main.scrollX,
        y: canvas.getCursorPosition().y + this.level.cameras.main.scrollY
      };

      const direction = new Phaser.Math.Vector2(
        cursorPosition.x - playerPosition.x,
        cursorPosition.y - playerPosition.y
      );


      const {
        minSpeed,
        maxSpeed,
        near,
        far,
        easeConstant
      } = config.player;

      const distance = direction.length();

      let adjustedSpeed;

      if (distance > far) {
        adjustedSpeed = maxSpeed;
      } else if (distance <= near) {
        adjustedSpeed = 0;
      } else {
        const range = maxSpeed - minSpeed;
        const distanceRatio = (distance - near) / (far - near);
        const easeFactor = 1 - Math.pow(1 - distanceRatio, 1 / easeConstant);
        adjustedSpeed = minSpeed + range * easeFactor;
      }

      if (distance > 5) {
        direction.normalize();
        this.sprite.setVelocity(direction.x * adjustedSpeed, direction.y * adjustedSpeed);
        // Calculate the angle in radians between the direction vector and the positive x-axis
        const angle = Phaser.Math.Angle.Normalize(Math.PI / 2 + Phaser.Math.Angle.Between(0, 0, direction.x, direction.y));

        // Set the rotation of the character sprite to the calculated angle
        this.sprite.setRotation(angle);
      }
    } else {
      this.sprite.setVelocity(0, 0);
    }

  }
}
