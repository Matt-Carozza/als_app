import { HHMM } from "@shared/domain";
import { Actions, ApiCommand } from "./base";


export type SetRGBCommand = ApiCommand<typeof Actions.SET_RGB, { 
    r: number;
    g: number;
    b: number;
}>;

export type SetWakeAndSleepCommand = ApiCommand<typeof Actions.SET_WAKE_AND_SLEEP, {
    wake_time: HHMM;
    sleep_time: HHMM;
}>;