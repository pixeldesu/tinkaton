import { AbstractExtractor } from "./abstract-extractor";

export default class ReactExtractor extends AbstractExtractor {
  detect(selector?: string): HTMLElement[] {
    const results: HTMLElement[] = [];
    
    if (selector) {
      Array.from(document.querySelectorAll(selector)).forEach(node => {
        let found = false;
  
        for (let key in node) {
          if (node.hasOwnProperty(key)) {
            if (key.startsWith("__reactContainer") || key.startsWith("_reactRootContainer")) {
              found = true;
            }
          }
        }

        if (found) {
          results.push(node as HTMLElement);
        }
      });
    }
    else {
      const treeWalker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_ELEMENT,
        (node) => {
          let found = false;
  
          for (let key in node) {
            if (node.hasOwnProperty(key)) {
              if (key.startsWith("__reactContainer") || key.startsWith("_reactRootContainer")) {
                found = true;
              }
            }
          }
  
          return found ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
        }
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
      let reactContainer;

      if (element.hasOwnProperty("_reactRootContainer")) {
        reactContainer = element["_reactRootContainer"]._internalRoot?.current;
      }
      else {
        const key = this.getReactContainerNameFromNode(element);

        reactContainer = element[key];
      }

      if (reactContainer) {
        results.push(this.collectProps(reactContainer));
      }
    }

    return results;
  }

  getReactContainerNameFromNode(element: HTMLElement): string {
    let result;

    for (let key in element) {
      if (element.hasOwnProperty(key) && key.startsWith("__reactContainer")) {
        result = key;
      }
    }

    return result;
  }
  
  collectProps(node) {
    const collectedProps = {};
  
    function recurse(currentNode) {
      if (currentNode.memoizedProps) {
        for (const [key, value] of Object.entries(currentNode.memoizedProps)) {
          if (key !== "children") {
            collectedProps[key] = value;
          }
        }
      }
  
      if (currentNode.memoizedState && currentNode.memoizedState.element && currentNode.memoizedState.element.props) {
        for (const [key, value] of Object.entries(currentNode.memoizedState.element.props)) {
          if (key !== "children") {
            collectedProps[key] = value;
          }
        }
      }
  
      if (currentNode.child) {
        recurse(currentNode.child);
      }
    }
  
    recurse(node);
  
    return collectedProps;
  }
}