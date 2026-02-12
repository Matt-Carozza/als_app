import { ServerEvent } from '@shared/events';
import { publish } from '.';
import { resolveCommandTopic } from './targeting';

export async function sendCommand(
  event: ServerEvent, 
  target: string
) {
  const topic = resolveCommandTopic(target);
  await publish(topic, event);
}