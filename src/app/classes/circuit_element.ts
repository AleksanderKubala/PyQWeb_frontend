import { UP, MID, DOWN, SELECT, SOURCE, EXT } from '../img_config';

export class CircuitElement {

  selected: string;
  direction: string;
  name: string;
  image: string;

  constructor(name: string = '') {
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
    this.updateImage();
  }

  public directMid(): void {
    this.direction = MID;
    this.updateImage();
  }

  public directDown(): void {
    this.direction = DOWN;
    this.updateImage();
  }

  public directNone(): void {
    this.direction = '';
    this.updateImage();
  }

  public setName(name: string): void {
    this.name = name;
    this.updateImage();
}

  public updateImage(): void {
    this.image = SOURCE + this.name + this.direction + this.selected + EXT;
  }
}
