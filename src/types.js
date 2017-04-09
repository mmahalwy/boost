/**
 * @copyright   2017, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 * @flow
 */

import type Promise from 'bluebird';
import type Task from './Task';

export type PrimitiveType = string | number | boolean;

export type Config = { [key: string]: PrimitiveType | PrimitiveType[] | Config };

export type GlobalConfig = {
  command: {
    name: string,
    options: string[],
  },
  config: Config,
  package: {
    name: string,
    version: string,
    [key: string]: PrimitiveType | PrimitiveType[] | Config,
  },
};

export type Result = *;

export type ResultPromise = Promise<Result>;

export type ResultAccumulator<T> = (value: Result, item: T) => ResultPromise;

export type Status = 'pending' | 'running' | 'skipped' | 'passed' | 'failed';

export type TaskCallback = (value: Result) => Result | ResultPromise;

export type TasksLoader = () => Task[];
