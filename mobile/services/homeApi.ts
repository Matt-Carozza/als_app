import { SetRGBCommand, SetWakeAndSleepCommand } from "@shared/api";
import { HHMM } from "@shared/domain";
import { apiFetch } from "./http";

export async function sendRGB(
  r: number, 
  g: number, 
  b: number
): Promise<void> {
  const cmd: SetRGBCommand = {
    target: 'all',
    action: 'SET_RGB',
    payload: { r, g, b },
  };

  return apiFetch('/command', {
    method: 'POST',
    body: JSON.stringify(cmd)
  });
}

export async function sendWakeAndSleepTime(
  wakeTime: HHMM,
  sleepTime: HHMM
): Promise<void> {
  const cmd: SetWakeAndSleepCommand = {
    target: 'all',
    action: 'SET_WAKE_AND_SLEEP',
    payload: { wakeTime: wakeTime, sleepTime: sleepTime },
  };
  
  return apiFetch('/command', {
    method: 'POST',
    body: JSON.stringify(cmd)
  })
}