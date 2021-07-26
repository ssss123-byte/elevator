import Building from "./Building";
import {
    FLOOR_HEIGHT_PX,
    CABIN_WIDTH_PX,
    COLOR_DOOR_OPENED,
    CABIN_X,
    COLOR_LIFT_SHAFT,
    BUILDING_HEIGHT_PX, Z_INDEX_ROPE, Z_INDEX_SHAFT, LIFT_SHAFT_GAP_X,
} from './const';

export default class Cabin {
    public cabinGfx: PIXI.Graphics;
    public door: PIXI.Graphics;
    private building: Building;
    public rope: PIXI.Graphics;


    constructor(building: Building) {
        this.building = building;
        this.draw();
    }

    draw(): void {
        this.cabinGfx = new PIXI.Graphics();
        this.cabinGfx.name = 'cabin';
        this.cabinGfx.lineStyle(2, 0x000000, 1);
        this.cabinGfx.beginFill(0x3d3d4a);
        this.cabinGfx.drawRect(0, 0, CABIN_WIDTH_PX, FLOOR_HEIGHT_PX);
        this.cabinGfx.endFill();
        this.cabinGfx.x = CABIN_X;
        this.cabinGfx.y = this.building.floors[1].floorGfx.y;

        const liftShaft = new PIXI.Graphics();
        liftShaft.beginFill(COLOR_LIFT_SHAFT);
        liftShaft.drawRect(
          CABIN_X - LIFT_SHAFT_GAP_X,
          0,
          CABIN_WIDTH_PX + 2 * LIFT_SHAFT_GAP_X,
          BUILDING_HEIGHT_PX
        );
        liftShaft.zIndex = Z_INDEX_SHAFT;

        let top = new PIXI.Graphics();
        top.lineStyle(5, 0x000000, 1);
        top.moveTo(CABIN_X, 0);
        top.lineTo(CABIN_X + CABIN_WIDTH_PX, 0);

        this.drawNewRope();

        /* рисуются не боковые двери, а центральный фон лифта */
        this.door = new PIXI.Graphics();
        this.door.beginFill(COLOR_DOOR_OPENED);
        this.door.drawRect(this.cabinGfx.width / 2 - 2, 0, 4, 100);
        this.door.endFill();
        this.cabinGfx.addChild(this.door);
        this.building.scene.addChild(liftShaft);
        this.building.scene.addChild(this.rope);
        this.building.scene.addChild(this.cabinGfx);
        this.building.scene.addChild(top);
    }

    drawNewRope() {
        if (this.rope) {
            this.building.scene.removeChild(this.rope);
        }

        this.rope = new PIXI.Graphics();
        this.rope.name = 'rope';
        this.rope.lineStyle(4, 0x000000);
        this.rope.moveTo( CABIN_X + this.cabinGfx.width / 2 - 0.5, 0);
        this.rope.lineTo(CABIN_X + this.cabinGfx.width / 2 - 0.5, this.cabinGfx.y);
        this.rope.zIndex = Z_INDEX_ROPE
        this.building.scene.addChild(this.rope);
    }
}
