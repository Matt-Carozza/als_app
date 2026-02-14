import { Actions } from '@shared/api';
import { HHMM } from '@shared/domain';

export interface BaseEvent<TAction extends string, TPayload> {
    origin: 'MAIN' | 'APP';
    device: 'APP' | 'LIGHT';
    action: TAction;
    payload: TPayload;
}

export type StatusEvent = BaseEvent<'STATUS', {
    connected_to_broker: boolean;
}>;

export type LightSetEvent = BaseEvent<typeof Actions.SET_RGB, {
    r: number,
    g: number,
    b: number
}>;

export type LightSetWakeAndSleep = BaseEvent<typeof Actions.TOGGLE_ADAPTIVE_LIGHTING_MODE,
    | {
        enabled: true;
        wake_time: HHMM;
        sleep_time: HHMM;
      }
    | {
        enabled: false;
      }
>;

export type ServerEvent = 
    | StatusEvent
    | LightSetWakeAndSleep
    | LightSetEvent;
