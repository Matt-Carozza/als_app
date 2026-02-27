import { Actions } from '@shared/api';
import { HHMM } from '@shared/domain';

export interface BaseEvent<TAction extends string, TPayload> {
    origin: 'MAIN' | 'APP';
    device: 'APP' | 'LIGHT' | 'MAIN';
    action: TAction;
    payload: TPayload;
}

export type StatusEvent = BaseEvent<'STATUS', {
    connected_to_broker: boolean;
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

export type ServerEvent = 
    | StatusEvent
    | LightSetWakeAndSleep
    | LightSetEvent;
