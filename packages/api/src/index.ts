import { SetRGBCommand, SetWakeAndSleepCommand } from './types';

export * from './types';

export type AnyApiCommand = 
| SetRGBCommand
| SetWakeAndSleepCommand;

