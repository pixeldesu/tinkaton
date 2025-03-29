import { DetectionResult, ExtractionResult } from "../types";
import { AbstractExtractor } from "./_abstract";

export default class LivewireExtractor extends AbstractExtractor {
  type: string = "livewire";

  detect(): DetectionResult {
    const results: HTMLElement[] = [];

    if (this.options.selector) {
      Array.from(document.querySelectorAll(this.options.selector)).forEach(
        (node) => {
          if (node.hasAttribute("wire:id")) {
            results.push(node as HTMLElement);
          }
        },
      );
    } else {
      const treeWalker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_ELEMENT,
        (node) => {
          return (node as Element).hasAttribute("wire:id")
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_SKIP;
        },
      );

      while (treeWalker.nextNode()) {
        results.push(treeWalker.currentNode as HTMLElement);
      }
    }

    return this.buildDetectionResult(results.length > 0, results);
  }

  extract(elements: HTMLElement[]): ExtractionResult[] {
    const results: ExtractionResult[] = [];

    for (const element of elements) {
      results.push(
        this.buildExtractionResult({ ...element["__livewire"] }, element),
      );
    }

    return results;
  }
}
