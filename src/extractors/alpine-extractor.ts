import { DetectionResult, ExtractionResult } from "../types";
import { AbstractExtractor } from "./abstract-extractor";

export default class AlpineExtractor extends AbstractExtractor {
  type: string = "alpine";

  detect(selector?: string): DetectionResult {
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
