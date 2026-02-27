import { Actions, ApiCommand } from "./base";


export type SetRGBCommand = ApiCommand<typeof Actions.SET_RGB, { 
    room_id: number,
    r: number;
    g: number;
    b: number;
}>;

