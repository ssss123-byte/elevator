export const BUTTON_SIDE_PX = 70;
export const BUTTON_GAP_X = 50;
export const BUTTON_GAP_Y = 30;

export const CABIN_WIDTH_PX = 80;
export const CABIN_X = 320;

export const COLOR_DOOR_OPENED = 0xffffff;

export const COLOR_BUTTON = 0xefefef;
export const COLOR_BUTTON_TINT_DEFAULT = 0xffffff;
export const COLOR_BUTTON_TINT_PRESSED = 0xfff200;
export const COLOR_BUTTON_TINT_CURRENT = 0x05ff0d;

export const COLOR_FLOOR = 0xA33033;

export const COLOR_LIFT_SHAFT = 0xCEFFCD;

export const DISPLAY_WIDTH = 330;
export const DISPLAY_HEIGHT = 50;

export const FLOOR_HEIGHT_PX = 100;
export const FLOOR_GAP_PX = 0
export const FLOOR_X = 0;
export const FLOOR_WIDTH_PX = 300;

export const FLOORS_COUNT = 6;

export const LIFT_SHAFT_GAP_X = 10;

export const PANEL_X = 450;
export const PANEL_Y = 100

export const SCENE_X = 20;
export const SCENE_Y = 20;

export const TARGET_FLOOR_PRECISION_PX = 5;

export const Z_INDEX_SHAFT = -2;
export const Z_INDEX_ROPE = -1;

// точность поиска пересечения уровня лифта и этажа в пикселах (если слишком мал., лифт может "пролететь мимо")

// вычисляемые константы
export const BUILDING_HEIGHT_PX = FLOORS_COUNT * (FLOOR_HEIGHT_PX + FLOOR_GAP_PX)

