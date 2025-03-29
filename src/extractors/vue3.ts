import { DetectionResult, ExtractionResult } from "../types";
import { AbstractExtractor } from "./_abstract";

export default class Vue3Extractor extends AbstractExtractor {
  type: string = "vue3";

  detect(selector?: string): DetectionResult {
    const results: HTMLElement[] = [];

    const appElement = document.querySelector("#app") as HTMLElement;
    const vAppElements = Array.from(document.querySelectorAll("[data-v-app]")) as HTMLElement[];
    const additionalElements = this.options.selector ? Array.from(document.querySelectorAll(this.options.selector)) as HTMLElement[] : [];
    const targets = [appElement, ...vAppElements, ...additionalElements];

    for (const target of targets) {
      if (target && Object.hasOwn(target, "__vue_app__")) {
        results.push(target);
      }
    }

    return this.buildDetectionResult(results.length > 0, results);
  }

  extract(elements: HTMLElement[]): ExtractionResult[] {
    const results: ExtractionResult[] = [];

    for (const element of elements) {
      results.push(
        this.buildExtractionResult(
          { ...element["__vue_app__"]._context?.config?.globalProperties },
          element,
        ),
      );
    }

    return results;
  }
}
