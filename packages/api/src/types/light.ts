import { HHMM } from "@shared/domain";
import { ApiCommand } from "./base";

export const Actions = {
    SET_RGB: 'SET_RGB',
    SET_WAKE_AND_SLEEP: 'SET_WAKE_AND_SLEEP',
} as const;

export type SetRGBCommand = ApiCommand<typeof Actions.SET_RGB, { 
    r: number;
    g: number;
    b: number;
}>;

export type SetWakeAndSleepCommand = ApiCommand<typeof Actions.SET_WAKE_AND_SLEEP, {
    wakeTime: HHMM;
    sleepTime: HHMM;
}>;