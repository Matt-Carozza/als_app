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

export type LightSetEvent = BaseEvent<'SET_RGB', {
    r: number,
    g: number,
    b: number
}>;

export type LightSetWakeAndSleep = BaseEvent<'SET_WAKE_AND_SLEEP', {
    wake_time: HHMM,
    sleep_time: HHMM
}>;

export type ServerEvent = 
    | StatusEvent
    | LightSetWakeAndSleep
    | LightSetEvent;
