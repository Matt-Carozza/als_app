import { Actions, SetWakeAndSleepCommand } from '@shared/api';
import { ServerEvent } from "@shared/events";
import { sendCommand } from "../commandBus";

export async function handleWakeAndSleep(
  payload: SetWakeAndSleepCommand['payload'],
  target?: string
) {
  // if (

  // ) {
  //   throw new Error('Invalid RGB values');
  // }
  // 
  
  const brokerMessage: ServerEvent = {
    origin: 'APP',
    device: 'MAIN',
    action: Actions.TOGGLE_ADAPTIVE_LIGHTING_MODE,
    payload,
  };

  await sendCommand(brokerMessage, 
    target ?? 'all')
}
