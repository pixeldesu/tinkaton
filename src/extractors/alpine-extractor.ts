import { AbstractExtractor } from "./abstract-extractor";

export default class AlpineExtractor extends AbstractExtractor {
  detect(selector?: string): HTMLElement[] {
    const results: HTMLElement[] = [];
    let targets: HTMLElement[] = [];

    targets.push(
      ...(Array.from(document.querySelectorAll("[x-data]")) as HTMLElement[]),
    );
    if (selector !== undefined) {
      targets.push(
        ...(Array.from(document.querySelectorAll(selector)) as HTMLElement[]),
      );
    }
    targets = targets.filter((target) => target);

    for (const target of targets) {
      if (target && Object.hasOwn(target, "_x_dataStack")) {
        results.push(target);
      }
    }

    return results;
  }

  extract(elements: HTMLElement[]): Record<string, any>[] {
    const results: Record<string, any>[] = [];

    for (const element of elements) {
      results.push(element["_x_dataStack"][0]);
    }

    return results;
  }
}
