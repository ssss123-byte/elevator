import Button from './Button';
import { BUTTON_GAP_X, BUTTON_GAP_Y, BUTTON_SIDE_PX } from './const';
import Display from './Display';

export type Buttons = {[num: number]: Button};

export default class Panel {
  buttons: Buttons;
  display: Display;
  panelGfx: PIXI.Graphics;
  floorsCount: number;
  buttonsInRow: number = 3;

  constructor(floorsCount: number, buttonsInRow: number = 3) {
    this.floorsCount = floorsCount;
    this.buttonsInRow = buttonsInRow;
    this.panelGfx = new PIXI.Graphics();
    this.panelGfx.name = 'panel';
    this.display = new Display();
    this.panelGfx.addChild(this.display.displayGfx);

    this.buttons = this.createButtons();
  }

  createButtons(): Buttons {
    const { buttonsInRow } = this;

    let result: Buttons = {};

    for (let num = 1; num <= this.floorsCount; num++) {
      const b= new Button(num)

      const bRow = Math.floor((num - 1) / buttonsInRow) + 1;
      let bColumn = (num - 1) % buttonsInRow;

      b.buttonGfx.x = bColumn * (BUTTON_SIDE_PX + BUTTON_GAP_X);
      b.buttonGfx.y = 100 + (bRow - 1) * (BUTTON_SIDE_PX + BUTTON_GAP_Y);

      result[num] = b;

      this.panelGfx.addChild(b.buttonGfx);
    }
    return result;
  }
}
