import { AbstractExtractor } from "./abstract-extractor";

export default class LivewireExtractor extends AbstractExtractor {
  type: string = "livewire";

  detect(selector?: string): HTMLElement[] {
    const results: HTMLElement[] = [];

    if (selector) {
      Array.from(document.querySelectorAll(selector)).forEach((node) => {
        if (node.hasAttribute("wire:id")) {
          results.push(node as HTMLElement);
        }
      });
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

    return results;
  }

  extract(elements: HTMLElement[]): Record<string, any>[] {
    const results: Record<string, any>[] = [];

    for (const element of elements) {
      results.push(this.buildResult({ ...element["__livewire"] }, element));
    }

    return results;
  }
}
