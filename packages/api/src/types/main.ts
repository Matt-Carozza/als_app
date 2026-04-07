import { HHMM } from "@shared/domain";
import { Actions, ApiCommand } from "./base";

export type SetWakeAndSleepCommand = ApiCommand<typeof Actions.TOGGLE_ADAPTIVE_LIGHTING_MODE,
    | {
        room_id: number,
        enabled: true;
        wake_time: HHMM;
        sleep_time: HHMM;
        current_time: HHMM;
      }
    | {
        room_id: number,
        enabled: false;
      }
>;