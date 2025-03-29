import { DetectionResult, ExtractionResult } from "../types";
import { AbstractExtractor } from "./_abstract";

export default class Vue2Extractor extends AbstractExtractor {
  type: string = "vue2";

  detect(selector?: string): DetectionResult {
    const results: HTMLElement[] = [];

    const appElement = document.querySelector("#app") as HTMLElement;
    const additionalElements = this.options.selector ? Array.from(document.querySelectorAll(this.options.selector)) as HTMLElement[] : [];
    const targets = [ appElement, ...additionalElements];

    for (const target of targets) {
      if (target && Object.hasOwn(target, "__vue__")) {
        results.push(target);
      }
    }

    return this.buildDetectionResult(results.length > 0, results);
  }

  extract(elements: HTMLElement[]): ExtractionResult[] {
    const results: ExtractionResult[] = [];

    for (const element of elements) {
      results.push(
        this.buildExtractionResult({ ...element["__vue__"].$root }, element),
      );
    }

    return results;
  }
}
