export class GameCanvas {
  public rect: DOMRect;
  public width: number;
  public height: number;
  private canvas: HTMLCanvasElement;
  private isCursorInsideCanvas: boolean;
  private cursorPosition: { x: number; y: number };

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.rect = this.canvas.getBoundingClientRect();
    this.width = this.rect.width;
    this.height = this.rect.height;
    this.isCursorInsideCanvas = false;
    this.cursorPosition = { x: 0, y: 0 };

    // Add event listeners to update properties in real-time
    document.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('resize', this.handleWindowResize);
  }

  public get isCursorInsideGameCanvas(): boolean {
    return this.isCursorInsideCanvas;
  }

  public isCoordinateInsideCanvas(x: number, y: number): boolean {
    return x >= this.rect.left
      && x <= this.rect.right
      && y >= this.rect.top
      && y <= this.rect.bottom;
  }

  public getCursorPosition(): { x: number; y: number } {
    const relativeX = this.cursorPosition.x - this.rect.left;
    const relativeY = this.cursorPosition.y - this.rect.top;
    return { x: relativeX, y: relativeY };
  }

  public getGlobalCursorPosition(): { x: number; y: number } {
    return { ...this.cursorPosition };
  }

  private handleMouseMove = (event: MouseEvent) => {
    this.cursorPosition.x = event.clientX;
    this.cursorPosition.y = event.clientY;

    this.isCursorInsideCanvas =
      event.clientX >= this.rect.left &&
      event.clientX <= this.rect.right &&
      event.clientY >= this.rect.top &&
      event.clientY <= this.rect.bottom;
  };

  private handleWindowResize = () => {
    this.rect = this.canvas.getBoundingClientRect();
  };
}

// Singleton instance variable
export let canvas: GameCanvas | null = null;

// Singleton creation function
export const setCanvas = (_canvas: HTMLCanvasElement): GameCanvas => {
  if (!canvas) {
    canvas = new GameCanvas(_canvas);
  }
  return canvas;
};