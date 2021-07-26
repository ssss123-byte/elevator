import {
  BUTTON_SIDE_PX,
  COLOR_BUTTON,
  COLOR_BUTTON_TINT_CURRENT,
  COLOR_BUTTON_TINT_DEFAULT,
  COLOR_BUTTON_TINT_PRESSED,
} from './const';

export enum ButtonMode {
  default = 'default',
  pressed = 'pressed',
  current = 'current',
}

export default class Button {
  buttonGfx: PIXI.Graphics;
  num: number;
  onClick?: (num: number) => void;
  _mode: ButtonMode = ButtonMode.default;

  constructor(num: number) {
    this.num = num;

    this.buttonGfx = new PIXI.Graphics();
    this.buttonGfx.name = `button${num}`;
    this.buttonGfx.width = BUTTON_SIDE_PX;
    this.buttonGfx.height = BUTTON_SIDE_PX;

    this.buttonGfx.beginFill(COLOR_BUTTON);
    const buttonRadius = BUTTON_SIDE_PX/2;
    this.buttonGfx.lineStyle(/*border width*/2,/*border color*/ 0x000000, 1);
    this.buttonGfx.drawCircle(buttonRadius, buttonRadius, buttonRadius);

    this.buttonGfx.buttonMode = true;
    this.buttonGfx.interactive = true;
    this.buttonGfx.on('pointerdown', () => {
      this.onClick?.(this.num);
    });

    let text = new PIXI.Text(num + '', { fontFamily: 'Sans-Serif', fontSize:  BUTTON_SIDE_PX/2, fill: 0x000000 });
    text.name = 'text';
    text.x = BUTTON_SIDE_PX/3;
    text.y = BUTTON_SIDE_PX/4;

    this.buttonGfx.addChild(text);
  }

  set mode(newMode: ButtonMode) {
    const {buttonGfx} = this;

    switch (newMode) {
      case ButtonMode.pressed:
        buttonGfx.tint = COLOR_BUTTON_TINT_PRESSED;
        buttonGfx.interactive = false;
        break;
      case ButtonMode.current:
        buttonGfx.tint = COLOR_BUTTON_TINT_CURRENT;
        buttonGfx.interactive = false;
        break;
      case ButtonMode.default:
      default:
        buttonGfx.tint = COLOR_BUTTON_TINT_DEFAULT;
        buttonGfx.interactive = true;
        break;
    }
  }

  get mode() {
    return this._mode;
  }

  draw() {

  }
}
