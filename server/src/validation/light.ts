
export function isHHMM(s: unknown): s is string {
  if (typeof s !== 'string') return false;
  if (!/^\d{2}:\d{2}$/.test(s)) return false;

  const [h, m] = s.split(':').map(Number);

  return h >= 0 && h <= 23 &&
         m >= 0 && m <= 59;
}

export function validateSetRGB(payload: any) {
  return typeof payload?.room_id === 'number' &&
         typeof payload?.r === 'number' &&
         typeof payload?.g === 'number' &&
         typeof payload?.b === 'number';
}

export function validateToggleAdaptiveLightingMode(payload: any) {
  const isEnabled = Boolean(payload?.enabled);
  
  if (!isEnabled) {
    return true;
  }

  return isHHMM(payload?.wake_time) &&
         isHHMM(payload?.sleep_time);
}