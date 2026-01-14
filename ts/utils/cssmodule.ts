/**
 * @description Represents a CSS module.
 *
 * @example
 * import stylesheet from './main.module.css';
 * import { CSSModule } from './cssmodule';
 *
 * const css = new CSSModule(stylesheet);
 * css.all();
 * css.join('class1', 'class2');
 * css.get('class1', 'class2');
 */
export class CSSModule {
  public constructor(protected classDict: Record<string, string>) {}

  public all(): string {
    return Object.values(this.classDict).join(' ');
  }

  public join(...classNames: string[]): string {
    const result: Set<string> = new Set();

    for (const className of classNames) {
      if (className in this.classDict) {
        result.add(this.classDict[className]);
      } else {
        result.add(className);
      }
    }

    return Array.from(result).join(' ');
  }

  public get(...classNames: string[]): string {
    const result: Set<string> = new Set();

    for (const className of classNames) {
      if (className in this.classDict) {
        result.add(this.classDict[className]);
      }
    }

    return Array.from(result).join(' ');
  }
} //:: class
