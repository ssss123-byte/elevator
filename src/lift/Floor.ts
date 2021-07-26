import Building from "./Building";
import { BUILDING_HEIGHT_PX, COLOR_FLOOR, FLOOR_GAP_PX, FLOOR_HEIGHT_PX, FLOOR_WIDTH_PX, FLOOR_X } from './const';

export default class Floor {
    public readonly number: number;
    // public button: PIXI.Graphics;
    private lift: Building;
    public floorGfx: PIXI.Graphics;

    constructor(lift: Building, number: number) {
        this.number = number;
        this.lift = lift;
        this.draw()
    }

    draw() {
        const { number } = this;

        this.floorGfx = new PIXI.Graphics();
        // this.floorGfx = new PIXI.Container();
        this.floorGfx.name = `floor${number}`;
        this.floorGfx.y = BUILDING_HEIGHT_PX - (number * (FLOOR_HEIGHT_PX + FLOOR_GAP_PX));
        this.floorGfx.x = FLOOR_X;
        // let texture = PIXI.Texture.from('assets/floor1.png');
        // let background = new PIXI.Sprite(texture);
        // background.name = `background${number}`
        // background.width = FLOOR_WIDTH;
        // background.height = FLOOR_HEIGHT_PX;
        this.floorGfx.beginFill(COLOR_FLOOR);
        this.floorGfx.lineStyle(/*border width*/2,/*border color*/ 0x000000, 1);
        this.floorGfx.drawRect(0, 0, FLOOR_WIDTH_PX, FLOOR_HEIGHT_PX);

        // this.floorGfx.addChild(background);
        this.lift.scene.addChild(this.floorGfx);
    }
}
