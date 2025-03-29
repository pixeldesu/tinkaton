import { DetectionResult, ExtractionResult } from "../types";
import { AbstractExtractor } from "./_abstract";

export default class ReactExtractor extends AbstractExtractor {
  type: string = "react";

  detect(selector?: string): DetectionResult {
    const results: HTMLElement[] = [];

    if (this.options.selector) {
      Array.from(document.querySelectorAll(this.options.selector)).forEach((node) => {
        let found = false;

        for (const key in node) {
          if (Object.hasOwn(node, key)) {
            if (
              key.startsWith("__reactContainer") ||
              key.startsWith("_reactRootContainer")
            ) {
              found = true;
            }
          }
        }

        if (found) {
          results.push(node as HTMLElement);
        }
      });
    } else {
      const treeWalker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_ELEMENT,
        (node) => {
          let found = false;

          for (const key in node) {
            if (Object.hasOwn(node, key)) {
              if (
                key.startsWith("__reactContainer") ||
                key.startsWith("_reactRootContainer")
              ) {
                found = true;
              }
            }
          }

          return found ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
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
      let reactContainer;

      if (Object.hasOwn(element, "_reactRootContainer")) {
        reactContainer = element["_reactRootContainer"]._internalRoot?.current;
      } else {
        const key = this.getReactContainerNameFromNode(element);

        reactContainer = element[key];
      }

      if (reactContainer) {
        results.push(
          this.buildExtractionResult(
            { props: this.collectProps(reactContainer) },
            element,
          ),
        );
      }
    }

    return results;
  }

  getReactContainerNameFromNode(element: HTMLElement): string {
    let result;

    for (const key in element) {
      if (Object.hasOwn(element, key) && key.startsWith("__reactContainer")) {
        result = key;
      }
    }

    return result;
  }

  collectProps(node) {
    const collectedProps: any[] = [];

    function recurse(currentNode) {
      if (currentNode.memoizedProps) {
        const props = {};

        for (const [key, value] of Object.entries(currentNode.memoizedProps)) {
          if (key !== "children") {
            props[key] = value;
          }
        }

        collectedProps.push(props);
      }

      if (
        currentNode.memoizedState &&
        currentNode.memoizedState.element &&
        currentNode.memoizedState.element.props
      ) {
        const props = {};

        for (const [key, value] of Object.entries(
          currentNode.memoizedState.element.props,
        )) {
          if (key !== "children") {
            props[key] = value;
          }
        }

        collectedProps.push(props);
      }

      if (currentNode.child) {
        recurse(currentNode.child);
      }
    }

    recurse(node);

    return collectedProps;
  }
}
