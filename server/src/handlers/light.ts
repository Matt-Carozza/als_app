import { HHMM } from '@shared/domain';
import { ServerEvent } from "@shared/events";
import { sendCommand } from "../commandBus";

export async function handleSetRGB(
  payload: { r: number; g: number; b: number },
  target?: string
) {
  if (
    payload.r < 0 || payload.r > 255 ||
    payload.g < 0 || payload.g > 255 ||
    payload.b < 0 || payload.b > 255
  ) {
    throw new Error('Invalid RGB values');
  }
  
  const brokerMessage: ServerEvent = {
    origin: 'APP',
    device: 'LIGHT',
    action: 'SET_RGB',
    payload,
  };

  await sendCommand(brokerMessage, 
    target ?? 'all')
}

export async function handleWakeAndSleep(
  payload: { wake_time: HHMM, sleep_time: HHMM},
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
    action: 'SET_WAKE_AND_SLEEP',
    payload,
  };

  await sendCommand(brokerMessage, 
    target ?? 'all')
}
