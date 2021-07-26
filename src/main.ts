import "./scss/main.scss";
import * as PIXI from "pixi.js-legacy";
import Handlers from "./utils/handlers";
// import Demo from "./demo/Demo";
import Building from "./lift/Building";
import { BACKGROUND_COLOR, PIXI_JS_DEVTOOlS_SUPPORT } from './const';

initPIXI();
const handlers = new Handlers();
handlers.init();
start();

/**
 * Инициализация PIXI
 */
function start(): void {
    const building = new Building();
    // const demo = new Demo();
    // demo.start();
}

function initPIXI(): void {
    window.PIXI = PIXI;
    // Проверим инициализацию библиотеки PIXI
    if (PIXI === undefined) {
        throw new Error('PIXI is undefined');
    }

    // window.sceneWidth = screen.width || 1200;
    // window.sceneHeight = screen.height || 800;

    window.sceneWidth = 1200;
    window.sceneHeight = 800;

    const app = new PIXI.Application({
        width: window.sceneWidth,
        height: window.sceneHeight,
        ///transparent: true,
        forceCanvas: true,
        backgroundColor: BACKGROUND_COLOR,
        view: <HTMLCanvasElement>getElement("scene")
    });
    window.renderer = app.renderer;
    window.app = app;
    getElement("sceneDiv").appendChild(app.view);

    if (process.env.NODE_ENV === 'development' && PIXI_JS_DEVTOOlS_SUPPORT) {
        registerPixiInspector();
    }
}

function registerPixiInspector() {
    const sceneEl = document.getElementById('scene');
    if (sceneEl) {
        sceneEl.classList.add('debug');
    }

    (window as any).__PIXI_INSPECTOR_GLOBAL_HOOK__ &&  (window as any).__PIXI_INSPECTOR_GLOBAL_HOOK__.register({ PIXI: PIXI });
}

function getElement(elementName: string): HTMLElement {
    return <HTMLElement>document.getElementById(elementName);
}

document.onready = function () {
    window.sizeHandler();
};
