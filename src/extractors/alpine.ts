import { DetectionResult, ExtractionResult } from "../types";
import { AbstractExtractor } from "./_abstract";

export default class AlpineExtractor extends AbstractExtractor {
  type: string = "alpine";

  detect(): DetectionResult {
    const results: HTMLElement[] = [];

    const xDataElements = Array.from(
      document.querySelectorAll("[x-data]"),
    ) as HTMLElement[];
    const additionalElements = this.options.selector
      ? (Array.from(
          document.querySelectorAll(this.options.selector),
        ) as HTMLElement[])
      : [];
    const targets = [...xDataElements, ...additionalElements];

    for (const target of targets) {
      if (target && Object.hasOwn(target, "_x_dataStack")) {
        results.push(target);
      }
    }

    return this.buildDetectionResult(results.length > 0, results);
  }

  extract(elements: HTMLElement[]): ExtractionResult[] {
    const results: ExtractionResult[] = [];

    for (const element of elements) {
      results.push(
        this.buildExtractionResult(element["_x_dataStack"][0], element),
      );
    }

    return results;
  }
}
