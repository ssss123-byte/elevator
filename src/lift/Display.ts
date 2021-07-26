import { DISPLAY_HEIGHT, DISPLAY_WIDTH } from './const';

export default class Display {
  displayGfx: PIXI.Graphics;
  textGfx: PIXI.Text;
  symbolsGfx: PIXI.Text;

  constructor() {
    this.displayGfx = new PIXI.Graphics();
    this.displayGfx.name = 'display';
    this.displayGfx.beginFill(0xffffff);
    this.displayGfx.lineStyle(/*border width*/2,/*border color*/ 0x000000, 1);
    this.displayGfx.drawRect(0, 0, DISPLAY_WIDTH, DISPLAY_HEIGHT);

    this.symbolsGfx = new PIXI.Text('', { fontFamily: 'Sans-Serif', fontSize:  DISPLAY_HEIGHT / 2, fill: 0x000000 });
    this.symbolsGfx.name = 'symbols';
    this.symbolsGfx.y = DISPLAY_HEIGHT / 5;
    this.symbolsGfx.x = DISPLAY_WIDTH / 20;

    this.textGfx = new PIXI.Text('', { fontFamily: 'Sans-Serif', fontSize:  DISPLAY_HEIGHT / 2, fill: 0x000000 });
    this.textGfx.name = 'text';
    this.textGfx.y = DISPLAY_HEIGHT / 5;
    this.textGfx.x = DISPLAY_WIDTH / 5;

    this.displayGfx.addChild(this.symbolsGfx);
    this.displayGfx.addChild(this.textGfx);
  }

  set text(newText: string) {
    this.textGfx.text = newText;
  }

  set symbols(newSymbols: string) {
    this.symbolsGfx.text = newSymbols;
  }
}
