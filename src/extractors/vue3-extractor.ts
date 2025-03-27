import { TinkatonResult } from "../types";
import { AbstractExtractor } from "./abstract-extractor";

export default class Vue3Extractor extends AbstractExtractor {
  type: string = "vue3";

  detect(selector?: string): HTMLElement[] {
    const results: HTMLElement[] = [];
    let targets: HTMLElement[] = [];

    targets.push(document.querySelector("#app") as HTMLElement);
    targets.push(
      ...(Array.from(
        document.querySelectorAll("[data-v-app]"),
      ) as HTMLElement[]),
    );
    if (selector !== undefined) {
      targets.push(
        ...(Array.from(document.querySelectorAll(selector)) as HTMLElement[]),
      );
    }
    targets = targets.filter((target) => target);

    for (const target of targets) {
      if (target && Object.hasOwn(target, "__vue_app__")) {
        results.push(target);
      }
    }

    return results;
  }

  extract(elements: HTMLElement[]): TinkatonExtractionResult[] {
    const results: TinkatonExtractionResult[] = [];

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
