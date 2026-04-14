export const Actions = {
    SET_RGB: 'SET_RGB',
    TOGGLE_ADAPTIVE_LIGHTING_MODE: 'TOGGLE_ADAPTIVE_LIGHTING_MODE',
    OCC_CONFIG_DELAY: 'OCC_CONFIG_DELAY',
    GET_MAIN_STATE: 'GET_MAIN_STATE',
    SEND_FRAME: 'SEND_FRAME',
} as const;

export interface ApiCommand<TAction extends string, TPayload> {
  target: string;
  action: TAction;
  payload: TPayload;
}