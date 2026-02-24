import { Actions, SetRGBCommand, SetWakeAndSleepCommand } from '@shared/api';
import { ServerEvent } from "@shared/events";
import { sendCommand } from "../commandBus";

export async function handleSetRGB(
  payload: SetRGBCommand['payload'],
  target?: string
) {
  if (
    payload.room_id < 0 || payload.room_id > 255 ||
    payload.r < 0 || payload.r > 255 ||
    payload.g < 0 || payload.g > 255 ||
    payload.b < 0 || payload.b > 255
  ) {
    throw new Error('Invalid RGB values');
  }
  
  const brokerMessage: ServerEvent = {
    origin: 'APP',
    device: 'LIGHT',
    action: Actions.SET_RGB,
    payload,
  };
  
  await sendCommand(brokerMessage, 
    target ?? 'all')
}

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
    device: 'LIGHT',
    action: Actions.TOGGLE_ADAPTIVE_LIGHTING_MODE,
    payload,
  };

  await sendCommand(brokerMessage, 
    target ?? 'all')
}
