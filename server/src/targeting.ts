export type CommandTarget =
  | { type: 'all' }
  | { type: 'room'; id: string }
  | { type: 'device'; id: string };

export function resolveCommandTopic(target?: string): string {
  if (!target || target === 'all') {
    return '/commands';
  }

  if (target.startsWith('room:')) {
    return `/commands/room/${target.split(':')[1]}`;
  }

  if (target.startsWith('device:')) {
    return `/commands/device/${target.split(':')[1]}`;
  }

  return '/commands';
}