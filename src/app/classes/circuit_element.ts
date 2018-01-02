import { UP, MID, DOWN, SELECT, SOURCE, EXT } from '../img_config';

export class CircuitElement {

  row: number;
  col: number;
  selected: string;
  direction: string;
  name: string;
  image: string;

  constructor(row: number, col: number, name: string = '') {
    this.row = row;
    this.col = col;
    this.selected = '';
    this.direction = '';
    this.name = name;
    this.updateImage();
  }

  public select(): void {
    this.selected = SELECT;
    this.updateImage();
  }

  public deselect(): void {
    this.selected = '';
    this.updateImage();
  }

  public directUp(): void {
    this.direction = UP;
  }

  public directMid(): void {
    this.direction = MID;
  }

  public directDown(): void {
    this.direction = DOWN;
  }

  public directNone(): void {
    this.direction = '';
  }

  public setName(name: string): void {
    this.name = name;
}

  public updateImage(): void {
    this.image = SOURCE + this.name + this.direction + this.selected + EXT;
  }

  public onContextMenu(): boolean {
    return false;
  }
}
