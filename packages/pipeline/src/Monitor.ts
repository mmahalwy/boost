/* eslint-disable promise/prefer-await-to-callbacks */

import { BailEvent, Event } from '@boost/event';
import { Context } from './Context';
import { Routine } from './Routine';
import { AnyPipeline, AnyWorkUnit } from './types';

export class Monitor {
	/**
	 * Called after a pipeline class has ran.
	 * @category Events
	 */
	readonly onPipelineAfterRun = new Event<[AnyPipeline]>('after-run');

	/**
	 * Called before a pipeline class is ran.
	 * @category Events
	 */
	readonly onPipelineBeforeRun = new Event<[AnyPipeline, unknown]>('before-run');

	/**
	 * Called before a pipeline's work unit is executed.
	 * @category Events
	 */
	readonly onPipelineRunWorkUnit = new Event<[AnyPipeline, AnyWorkUnit, unknown]>('run-work-unit');

	/**
	 * Called when any work unit has failed.
	 * @category Events
	 */
	readonly onWorkUnitFail = new Event<[AnyWorkUnit, Error | null, unknown, Context]>('fail');

	/**
	 * Called when any work unit has passed.
	 * @category Events
	 */
	readonly onWorkUnitPass = new Event<[AnyWorkUnit, unknown, unknown, Context]>('pass');

	/**
	 * Called when any work unit is ran.
	 * @category Events
	 */
	readonly onWorkUnitRun = new BailEvent<[AnyWorkUnit, unknown, Context]>('run');

	/**
	 * Called when any work unit is skipped.
	 * @category Events
	 */
	readonly onWorkUnitSkip = new Event<[AnyWorkUnit, unknown, Context]>('skip');

	/**
	 * Monitor events for the provided pipeline, its work units, and all other
	 * pipelines and work units down the hierarchical tree.
	 */
	monitor(pipeline: AnyPipeline): this {
		pipeline.onAfterRun.listen(() => {
			this.onPipelineAfterRun.emit([pipeline]);
		});

		pipeline.onBeforeRun.listen((input) => {
			this.onPipelineBeforeRun.emit([pipeline, input]);
		});

		pipeline.onRunWorkUnit.listen((workUnit, value) => {
			if (workUnit instanceof Routine) {
				workUnit.setMonitor(this);
			}

			this.onPipelineRunWorkUnit.emit([pipeline, workUnit, value]);

			workUnit.onFail.listen((error, input, context) => {
				this.onWorkUnitFail.emit([workUnit, error, input, context]);
			});

			workUnit.onPass.listen((output, input, context) => {
				this.onWorkUnitPass.emit([workUnit, output, input, context]);
			});

			workUnit.onRun.listen((input, context) => {
				this.onWorkUnitRun.emit([workUnit, input, context]);
			});

			workUnit.onSkip.listen((input, context) => {
				this.onWorkUnitSkip.emit([workUnit, input, context]);
			});
		});

		return this;
	}
}
