export const Actions = {
    SET_RGB: 'SET_RGB',
    SET_WAKE_AND_SLEEP: 'SET_WAKE_AND_SLEEP',
} as const;

export interface ApiCommand<TAction extends string, TPayload> {
  target: string;
  action: TAction;
  payload: TPayload;
}