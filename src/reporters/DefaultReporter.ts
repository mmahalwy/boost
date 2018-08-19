/**
 * @copyright   2017-2018, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

import cliTruncate from 'cli-truncate';
import Reporter from '../Reporter';
import Routine, { RoutineInterface } from '../Routine';
import { TaskInterface } from '../Task';

export interface Line {
  depth: number;
  routine: RoutineInterface;
  tasks: TaskInterface[];
}

export default class DefaultReporter extends Reporter<Line> {
  depth: number = 0;

  keyLength: number = 0;

  bootstrap() {
    this.console
      .on('start', this.handleStart)
      .on('task', this.handleTask)
      .on('task.pass', this.handleTaskComplete)
      .on('task.fail', this.handleTaskComplete)
      .on('routine', this.handleRoutine)
      .on('routine.pass', this.handleRoutineComplete)
      .on('routine.fail', this.handleRoutineComplete)
      .on('command.data', this.handleCommand)
      .on('render', this.handleRender);
  }

  /**
   * Calculate the max string length for routine key's at every depth.
   */
  calculateKeyLength(routines: RoutineInterface[], depth: number = 0): number {
    return routines.reduce(
      (sum: number, routine: RoutineInterface) =>
        Math.max(
          sum,
          routine.key.length + depth,
          this.calculateKeyLength(routine.routines, depth + 1),
        ),
      0,
    );
  }

  /**
   * Calculate the current number of tasks that have completed.
   */
  calculateTaskCompletion(tasks: TaskInterface[]): number {
    return tasks.reduce((sum, task) => (task.hasPassed() || task.isSkipped() ? sum + 1 : sum), 0);
  }

  /**
   * Return the task title with additional metadata.
   */
  // eslint-disable-next-line complexity
  getLineTitle(task: TaskInterface | RoutineInterface, usedColumns: number = 0): string {
    const { verbose } = this.console.options;
    // @ts-ignore
    const { tasks = [], routines = [] } = task;
    const title = task.statusText ? this.style(task.statusText) : task.title;
    const status = [];

    if (task.isSkipped()) {
      status.push(this.style('skipped', 'warning'));
    } else if (task.hasFailed()) {
      status.push(this.style('failed', 'failure'));
    } else if (tasks.length > 0) {
      status.push(`${this.calculateTaskCompletion(tasks)}/${tasks.length}`);
    } else if (routines.length > 0) {
      status.push(`${this.calculateTaskCompletion(routines)}/${routines.length}`);
    }

    if (task instanceof Routine && !task.isSkipped() && verbose >= 2) {
      status.push(this.getElapsedTime(task.startTime, task.stopTime));
    }

    // eslint-disable-next-line no-magic-numbers
    const columns = process.stdout.columns || 80;
    const fullStatus =
      status.length > 0 && verbose >= 1 ? this.style(` [${status.join(', ')}]`) : '';

    return cliTruncate(title, columns - usedColumns - fullStatus.length) + fullStatus;
  }

  handleStart = (routines: RoutineInterface[]) => {
    this.keyLength = this.calculateKeyLength(routines);
  };

  handleCommand = () => {
    this.console.render();
  };

  handleTask = (task: TaskInterface, routine: RoutineInterface) => {
    const line = this.findLine(row => row.routine === routine);

    if (line) {
      line.tasks.push(task);
    }

    this.console.render();
  };

  handleTaskComplete = (task: TaskInterface, routine: RoutineInterface) => {
    const line = this.findLine(row => row.routine === routine);

    if (line) {
      line.tasks = line.tasks.filter(t => t !== task);
    }

    this.console.render();
  };

  handleRender = () => {
    this.lines.forEach(({ routine, tasks, depth }) => {
      this.renderLine(routine, null, depth);

      tasks.forEach(task => {
        this.renderLine(routine, task, depth);
      });
    });
  };

  handleRoutine = (routine: RoutineInterface, value: any, wasParallel: boolean) => {
    this.addLine({
      depth: this.depth,
      routine,
      tasks: [],
    });

    this.console.render();

    if (!wasParallel) {
      this.depth += 1;
    }
  };

  handleRoutineComplete = (routine: RoutineInterface, result: any, wasParallel: boolean) => {
    if (!wasParallel) {
      this.depth -= 1;
    }

    if (this.depth > 0 && this.console.options.verbose < 3) {
      this.removeLine(line => line.routine === routine);
    }

    this.console.render();
  };

  renderLine(routine: RoutineInterface, task: TaskInterface | null, depth: number) {
    const indent = depth * 2;
    const key =
      this.indent(depth) + (task ? '' : routine.key.toUpperCase()).padEnd(this.keyLength - depth);
    let output = '';

    // Status
    output += this.style(key, this.getColorType(routine), ['bold']);
    output += '  ';

    // Tree
    if (depth > 0) {
      if (task) {
        output += this.indent(indent);
      } else {
        output += this.indent(indent - 2);
        output += this.style('└');
        output += ' ';
      }
    }

    // Title
    const usedColumns = indent + key.length;

    if (task) {
      output += this.style(this.getLineTitle(task, usedColumns));
    } else {
      output += this.getLineTitle(routine, usedColumns);
    }

    this.console.write(output, 1);
  }
}