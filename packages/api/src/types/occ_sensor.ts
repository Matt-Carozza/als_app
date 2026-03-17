import { Actions, ApiCommand } from "./base";

export type SetOffDelayCommand = ApiCommand<typeof Actions.OCC_CONFIG_DELAY, {
  room_id: number,
  off_delay: number,
}>;