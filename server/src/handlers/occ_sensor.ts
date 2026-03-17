import { Actions, SetOffDelayCommand } from '@shared/api';
import { ServerEvent } from "@shared/events";
import { sendCommand } from "../commandBus";

export async function handleOffDelay(
  payload: SetOffDelayCommand['payload'],
  target?: string
) {
  if (
    payload.room_id < 0 || payload.room_id > 255 ||
    payload.off_delay < 0 || payload.off_delay > 65535
  ) {
    throw new Error('Invalid Off Delay');
  }
  
  const brokerMessage: ServerEvent = {
    origin: 'APP',
    device: 'OCC',
    action: Actions.OCC_CONFIG_DELAY,
    payload,
  };

  await sendCommand(brokerMessage, 
    target ?? 'all')
}
