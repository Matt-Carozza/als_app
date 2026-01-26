export interface BaseEvent<TAction extends string, TPayload> {
    origin: 'MAIN' | 'APP';
    device: 'APP' | 'LIGHT';
    action: TAction;
    payload: TPayload;
}

export type StatusEvent = BaseEvent<'STATUS', {
    connected_to_broker: boolean;
}>;


export type ServerEvent = 
    | StatusEvent;