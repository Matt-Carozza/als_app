export interface ApiCommand<TAction extends string, TPayload> {
  target: string;
  action: TAction;
  payload: TPayload;
}