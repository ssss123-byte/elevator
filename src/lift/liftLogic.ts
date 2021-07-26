import Building, { Floors } from './Building';
import Floor from './Floor';
import { COLOR_DOOR_OPENED, TARGET_FLOOR_PRECISION_PX } from './const';
import { Buttons } from './Panel';
import { ButtonMode } from './Button';
import Cabin from './Cabin';
import Display from './Display';

enum DoorsState { 'Opening' = 1, 'Closed' = -1, 'stop' = 0 }

export default class LiftLogic {
    private building: Building;
    private DoorsState: DoorsState;
    private doorsAnimation: boolean;
    private targetFloor: Floor | undefined;
    public queue: Map<number, Floor>;
    private liftSpeed: number = 2000;
    private doorsSpeed: number = 1400;
    currentFloorNum: number = 1;

    /** -1: вверх */
    movingDirectionVectorY: number = -1;

    constructor(building: Building) {
        this.building = building;
        this.start();
        this.DoorsState = DoorsState.Opening;
        this.queue = new Map<number, Floor>();
        this.doorsAnimation = true;
        this.targetFloor = this.building.floors[1];
        this.floorButtonClick = this.floorButtonClick.bind(this);
        this.updateCurrentFloorNum();
    }


    floorButtonClick(num: number) {
        this.buttons[num].mode = ButtonMode.pressed;
        this.queue.set(num, this.building.floors[num]);
    }

    start() {
        window.app.ticker.add((d) => {
            const { targetFloor } = this;

            if (this.doorsAnimation) {
                this.moveDoor(d);
                if (targetFloor) {
                    this.queue.delete(targetFloor.number);
                }
            } else {
                if (this.queue.size == 0 && targetFloor && targetFloor.number > 1) {
                    this.floorButtonClick(1);
                }

                // let sortedFloors = Array.from(this.queue.values());

                const {
                  floorsUp,
                  floorsDown
                } = this.floorsSplitUpDown(Array.from(this.queue.values()))

                // this.targetFloor = sortedFloors.length > 0 ? sortedFloors[0] : undefined;

                let firstDown = floorsDown[0];
                let lastUp = floorsUp[floorsUp.length - 1];

                /**
                 * Лифт не будет менять направление,
                 *   если есть непосещённые этажи в очереди по текущему направлению
                 */
                if (this.movingDirectionVectorY > 0) {
                    if (firstDown) {
                        this.targetFloor = firstDown;
                    } else {
                        this.targetFloor = lastUp;
                        this.movingDirectionVectorY = -this.movingDirectionVectorY;
                    }
                } else {
                    // this.movingDirectionVectorY
                    if (lastUp) {
                        this.targetFloor = lastUp;
                    } else {
                        this.targetFloor = firstDown;
                        this.movingDirectionVectorY = -this.movingDirectionVectorY;
                    }
                }

                if (this.targetFloor) {
                    this.moveCabin(d);
                }
            }
        })
    }

    moveCabin(d: number) {
        let { targetFloor, building } = this;
        let { cabin } = building;
        let { cabinGfx } = cabin

        if (!targetFloor) {
            return;
        }

        let { floorGfx } = targetFloor

        // определяем направление движения, вверх или вниз
        this.movingDirectionVectorY = (floorGfx.y > cabinGfx.y) ? 1 : -1;

        if (this.getFloorDistancePx(targetFloor) <= TARGET_FLOOR_PRECISION_PX) {
            this.updateLiftInTargetFloor();
        } else {
            cabinGfx.y = cabinGfx.y + this.movingDirectionVectorY * d / 1000 * this.liftSpeed;
            this.cabin.drawNewRope();
        }

        this.updateCurrentFloorNum();
    }

    floorsSort(floors: Floor[]): Floor[] {
        return floors.sort(
          (a, b) =>
            (a.number - b.number)
        );
    }

    floorsSplitUpDown(floors: Floor[]): {floorsUp: Floor[], floorsDown: Floor[]} {
        let floorsUp: Floor[] = [];
        let floorsDown: Floor[] = [];

        floors.forEach((floor) => {
            if (this.currentFloorNum >= floor.number) {
                floorsUp.push(floor);
            }
            if (this.currentFloorNum <= floor.number) {
                floorsDown.push(floor);
            }
        })

        return {
            floorsUp: this.floorsSort(floorsUp),
            floorsDown: this.floorsSort(floorsDown),
        };
    }

    updateCurrentFloorNum() {
        this.currentFloorNum = this.getCurrentFloorNum();
        const directionSign =
          this.standing ?
            ''
            : String.fromCharCode((this.movingDirectionVectorY > 0) ? 9660 : 9650);
        this.display.text = `Этаж ${this.currentFloorNum}`;
        this.display.symbols = directionSign;
    }

    updateLiftInTargetFloor() {
        let { targetFloor } = this;

        if (!targetFloor) {
            return;
        }

        let { floorGfx, number } = targetFloor;

        this.cabin.cabinGfx.y = floorGfx.y;
        this.cabin.drawNewRope();

        this.buttons[number].mode = ButtonMode.current;

        this.doorsAnimation = true;
        this.DoorsState = DoorsState.Opening;
    }

    getFloorDistancePx(floor: Floor): number {
        return Math.abs(this.cabin.cabinGfx.y - floor.floorGfx.y);
    }

    getCurrentFloorNum(): number {
        let minDistancePx = Number.MAX_SAFE_INTEGER;
        let nearestNum = 1;

        for (const [num, floor] of Object.entries(this.floors)) {
            const distance = this.getFloorDistancePx(floor);
            if (distance < minDistancePx) {
                minDistancePx = distance;
                nearestNum = parseInt(num);
            }
        }

        return nearestNum;
    }

    moveDoor(d: number) {
        if (this.building.cabin.door.width >= 76) {
            this.updateDoorWidth(d, 76);
            setTimeout(() => this.DoorsState = DoorsState.Closed, 1000)
        }
        this.updateDoorWidth(d);

        if (this.building.cabin.door.width <= 2) {
            if (!this.targetFloor) {
                return;
            }

            const floorNum = this.targetFloor.number;

            this.buttons[floorNum].mode = ButtonMode.default;

            this.doorsAnimation = false;
            this.updateDoorWidth(d, 4);
            this.DoorsState = DoorsState.Opening;
        }
    }

    updateDoorWidth(d: number, width?: number): void {
        let currentDoorWidth = this.building.cabin.door.width;
        let speed = d / 1000 * this.doorsSpeed * this.DoorsState;
        if (!width) {
            width = currentDoorWidth + speed;
        }
        this.building.cabin.door = new PIXI.Graphics();
        this.building.cabin.door.beginFill(COLOR_DOOR_OPENED);
        this.building.cabin.door.drawRect(
          (this.building.cabin.cabinGfx.width - width) / 2,
          0,
          width,
          100
        );
        this.building.cabin.door.endFill();
        this.building.cabin.cabinGfx.removeChildAt(0);
        this.building.cabin.cabinGfx.addChild(this.building.cabin.door);
    }

    get buttons(): Buttons {
        return this.building.panel.buttons;
    }

    get display(): Display {
        return this.building.panel.display;
    }

    get cabin(): Cabin {
        return this.building.cabin;
    }

    get floors(): Floors {
        return this.building.floors;
    }

    get standing() {
        return this.doorsAnimation || this.queue.size < 1;
    }
}
