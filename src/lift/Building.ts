import Cabin from "./Cabin";
import Floor from "./Floor";
import LiftLogic from "./liftLogic";
import { BUILDING_HEIGHT_PX, FLOORS_COUNT, PANEL_X, PANEL_Y, SCENE_X, SCENE_Y } from './const';
import Panel from './Panel';

export type Floors = {[num: number]: Floor};

export default class Building {
    public cabin: Cabin;
    public floors: Floors;
    public logic: LiftLogic;
    public floorsCount: number;
    public scene: PIXI.Container;
    public panel: Panel;

    constructor() {
        this.scene = this.createScene();
        window.app.stage.addChild(this.scene);
        this.scene.sortableChildren = true;

        this.floorsCount = FLOORS_COUNT;
        this.floors = this.createFloors();

        this.createPanel();

        this.cabin = new Cabin(this);
        this.logic = new LiftLogic(this);

        this.mapEvents();
    }

    createPanel() {
        this.panel = new Panel(this.floorsCount);
        const { panelGfx} = this.panel;

        panelGfx.x = PANEL_X;
        panelGfx.y = PANEL_Y;
        this.scene.addChild(panelGfx);
    }

    mapEvents() {
        for (let [_n, button] of Object.entries(this.panel.buttons)) {
            button.onClick = this.logic.floorButtonClick;
        }
    }

    createScene(): PIXI.Container {
        let s = new PIXI.Container();
        s.name = 'scene';
        s.width = 800;
        s.width = 800;
        s.height = BUILDING_HEIGHT_PX;
        s.x = SCENE_X;
        s.y = SCENE_Y;
        return s;
    }

    createFloors(): Floors {
        let result: Floors = {};
        for (let i = 1; i <= this.floorsCount; i++) {
            result[i] = new Floor(this, i)
        }
        return result;
    }
}
