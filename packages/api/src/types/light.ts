import { HHMM } from "@shared/domain";
import { Actions, ApiCommand } from "./base";


export type SetRGBCommand = ApiCommand<typeof Actions.SET_RGB, { 
    room_id: number,
    r: number;
    g: number;
    b: number;
}>;

export type SetWakeAndSleepCommand = ApiCommand<typeof Actions.TOGGLE_ADAPTIVE_LIGHTING_MODE,
    | {
        room_id: number,
        enabled: true;
        wake_time: HHMM;
        sleep_time: HHMM;
      }
    | {
        room_id: number,
        enabled: false;
      }
>;
