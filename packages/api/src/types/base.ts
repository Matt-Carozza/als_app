export const Actions = {
    SET_RGB: 'SET_RGB',
    TOGGLE_ADAPTIVE_LIGHTING_MODE: 'TOGGLE_ADAPTIVE_LIGHTING_MODE',
    OCC_CONFIG_DELAY: 'OCC_CONFIG_DELAY',
} as const;

export interface ApiCommand<TAction extends string, TPayload> {
  target: string;
  action: TAction;
  payload: TPayload;
}