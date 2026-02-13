import { HHMM } from "./types";

export function dateToHHMM(date: Date): HHMM {
  const h = date.getHours().toString().padStart(2, '0');
  const m = date.getMinutes().toString().padStart(2, '0');
  return `${h}:${m}` as HHMM;
}

export function hhmmToDate(hhmm: HHMM): Date {
  const [hours, minutes] = hhmm.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes)
  
  return date
}

export function toStandardTime(hhmm: HHMM): string {
  const [hours, minutes] = hhmm.split(':').map(Number);
  const meridiem: string = hours >= 12 ? "PM" : "AM";
  
  const displayHour = hours % 12 || 12;
  return `${displayHour}:${minutes.toString().padStart(2,'0')} ${meridiem}`;
}
