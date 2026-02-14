import { HHMM } from "@shared/domain";
import { Actions, ApiCommand } from "./base";


export type SetRGBCommand = ApiCommand<typeof Actions.SET_RGB, { 
    r: number;
    g: number;
    b: number;
}>;

export type SetWakeAndSleepCommand = ApiCommand<typeof Actions.TOGGLE_ADAPTIVE_LIGHTING_MODE,
    | {
        enabled: true;
        wake_time: HHMM;
        sleep_time: HHMM;
      }
    | {
        enabled: false;
      }
>;
