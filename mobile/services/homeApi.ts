import { Actions, SetRGBCommand, SetWakeAndSleepCommand } from "@shared/api";
import { HHMM } from "@shared/domain";
import { apiFetch } from "./http";

export async function sendRGB(
  r: number, 
  g: number, 
  b: number
): Promise<void> {
  const cmd: SetRGBCommand = {
    target: 'all',
    action: Actions.SET_RGB,
    payload: { r, g, b },
  };

  return apiFetch('/command', {
    method: 'POST',
    body: JSON.stringify(cmd)
  });
}

export async function enableAdaptiveLightingMode(
  wakeTime: HHMM,
  sleepTime: HHMM
): Promise<void> {
  const cmd: SetWakeAndSleepCommand = {
    target: 'all',
    action: Actions.TOGGLE_ADAPTIVE_LIGHTING_MODE,
    payload: {  enabled: true, 
                wake_time: wakeTime, 
                sleep_time: sleepTime
              },
  };
  
  return apiFetch('/command', {
    method: 'POST',
    body: JSON.stringify(cmd)
  })
}

export async function disableAdaptiveLightingMode(): Promise<void> {
  const cmd: SetWakeAndSleepCommand = {
    target: 'all',
    action: Actions.TOGGLE_ADAPTIVE_LIGHTING_MODE,
    payload: { enabled: false },
  };
  
  return apiFetch('/command', {
    method: 'POST',
    body: JSON.stringify(cmd)
  })
}