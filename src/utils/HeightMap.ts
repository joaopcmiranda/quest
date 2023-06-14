export class HeightMap {
  public readonly width: number;
  public readonly height: number;
  public readonly maxPixelValue: number;
  private map: number[][];

  constructor(source: Uint8Array) {
    let i = 0;

    while (String.fromCharCode(source[i]) !== '\n' && i < source.length) {
      i++;
    }
    i++;

    let widthHeightLine = '';
    while (String.fromCharCode(source[i]) !== '\n' && i < source.length) {
      widthHeightLine += String.fromCharCode(source[i]);
      i++;
    }
    i++;

    let maxPixelValueLine = '';
    while (String.fromCharCode(source[i]) !== '\n' && i < source.length) {
      maxPixelValueLine += String.fromCharCode(source[i]);
      i++;
    }
    i++;

    // Extract the header information
    const [, width, height] = widthHeightLine.split(' ');
    const maxPixelValue = maxPixelValueLine.trim();

    this.width = parseInt(width);
    this.height = parseInt(height);
    this.maxPixelValue = parseInt(maxPixelValue);

    this.map = [];
    let row = [];
    while (i < source.length) {
      row.push(source[i]);
      i++;
      if (row.length === this.width) {
        this.map.push(row);
        row = [];
      }
    }
  }

  public get(x: number, y: number): number {
    return this.map[y][x];
  }
}