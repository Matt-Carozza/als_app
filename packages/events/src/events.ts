import { Actions } from '@shared/api';
import { HHMM } from '@shared/domain';

export interface BaseEvent<TAction extends string, TPayload> {
    origin: 'MAIN' | 'APP';
    device: 'APP' | 'LIGHT' | 'MAIN' | 'OCC';
    action: TAction;
    payload: TPayload;
}

export type StatusEvent = BaseEvent<'STATUS', {
    connected_to_broker: boolean;
}>;

export type RoomStatePayload = {
    room_id: number;
    r: number;
    g: number;
    b: number;
    alm_enabled: boolean;
    wake_time?: HHMM;  
    sleep_time?: HHMM;
};

export type StateEvent = BaseEvent<typeof Actions.GET_MAIN_STATE, {
    rooms: RoomStatePayload[];
}>;

export type RoomStateReqEvent = BaseEvent<typeof Actions.GET_MAIN_STATE, {

}>;

export type LightSetEvent = BaseEvent<typeof Actions.SET_RGB, {
    room_id: number,
    r: number,
    g: number,
    b: number
}>;

export type LightSetWakeAndSleep = BaseEvent<typeof Actions.TOGGLE_ADAPTIVE_LIGHTING_MODE,
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

export type OccConfigDelay = BaseEvent<typeof Actions.OCC_CONFIG_DELAY, {
    room_id: number,
    off_delay: number
}>;

export type FrameUpdateEvent = BaseEvent<typeof Actions.SEND_FRAME, {
    pixels: number[];
}>;

export type ServerEvent = 
    | StatusEvent
    | StateEvent
    | RoomStateReqEvent
    | LightSetWakeAndSleep
    | LightSetEvent
    | FrameUpdateEvent
    | OccConfigDelay;
