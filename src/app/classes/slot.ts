import { SOURCE, EXT } from '../img_config';


export class Slot {

  row: number;
  col: number;
  selected: string;
  direction: string;
  image: string;
  path: string;

  constructor(row: number, col: number) {
    this.col = col;
    this.row = row;
    this.selected = '';
    this.direction = '';
    this.image = 'empty';
    this.path = SOURCE + this.image + EXT;
  }

}
