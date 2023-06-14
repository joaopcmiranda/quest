export const config = {
  player: {
    // Adjust this value to control the minimum speed of the player
    minSpeed: 50,
    // Adjust this value to control the maximum speed of the player
    maxSpeed: 200,
    // How far the player can be from the cursor before the speed is at its maximum
    far: 250,
    // How close the player needs to be to the cursor before stopping
    near: 10,
    // Adjust this value to control the curve of the speed adjustment
    easeConstant: 0.5,
    // Adjust this value to control the size of the player in the game.
    // It will be an oval with these values as the radius
    collisionBarrier: [20, 10],
    // Adjust this value to control the threshold for needing to jump
    rampThreshold: 20,
    // Adjust this value to control the height of the jump
    jumpHeight: 200,
  },
  camera: {
    // How close to the edge of the screen the cursor needs to be before the camera starts moving
    edgeThreshold: 70,
    // Adjust this value to control the speed of the camera on the edges of the screen
    movingSpeed: 1,
    // How much percentage of the screen's width/height the camera should move when triggered
    // Adjust this to prevent infinite movement if the threshold is too big
    movingPercentage: 0.8
  }
};