/**
 * @copyright   2017, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

export default class Module<To extends object> {
  moduleName: string = '';

  name: string = '';

  options: To;

  constructor(options: To) {
    this.options = {
      // @ts-ignore
      ...options,
    };
  }
}