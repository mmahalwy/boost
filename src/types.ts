/**
 * @copyright   2017, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

import { Blueprint, Options } from 'optimal';
import Task from './Task';

export type Partial<T> = {
  [P in keyof T]?: T[P];
};

export interface ConsoleOptions extends Options {
  debug: boolean,
  footer: string,
  header: string,
  silent: boolean,
};

export interface ToolConfig extends Options {
  debug: boolean,
  extends: string | string[],
  plugins: string[],
  reporter: string,
  silent: boolean,
  [key: string]: any,
}

export interface ToolOptions extends Options {
  appName: string,
  configBlueprint: Blueprint,
  configFolder: string,
  extendArgv: string,
  footer: string,
  header: string,
  pluginAlias: string,
  root: string,
  scoped: boolean,
};

export interface PackageConfig {
  name: string,
  version: string,
  // Add others if we need them
}

export interface ReportParams {
  debug: boolean,
  debugs: string[],
  errors: string[],
  footer: string,
  header: string,
  logs: string[],
  silent: boolean,
  tasks: Task<object, object>[],
}

export type ReportLoader = () => ReportParams;

export type Status = 'pending' | 'running' | 'skipped' | 'passed' | 'failed';

export type TaskAction<Tx> = (value: any, context: Tx) => any | Promise<any>;

export type EventArguments = any[];

export type EventListener = (...args: EventArguments) => void;

export type EventNextHandler = (index: number, ...args: EventArguments) => void;