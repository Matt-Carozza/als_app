export type CommandTarget =
  | { type: 'all' }
  | { type: 'room'; id: string }
  | { type: 'device'; id: string };

export function resolveCommandTopic(target?: string): string {
  if (!target || target === 'all') {
    return '/als/commands';
  }

  if (target.startsWith('room:')) {
    return `/als/commands/room/${target.split(':')[1]}`;
  }

  if (target.startsWith('device:')) {
    return `/als/commands/device/${target.split(':')[1]}`;
  }

  return '/als/commands';
}