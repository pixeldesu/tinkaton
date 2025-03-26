export abstract class AbstractExtractor {
  /**
   * Method to detect a HTML element containing framework information
   *
   * @param selector optional selector that can be passed to check
   */
  abstract detect(selector?: string): HTMLElement[];

  /**
   * Method to extract framework information from a list of HTML elements
   *
   * @param elements (detected) HTML elements containing framework information
   */
  abstract extract(elements: HTMLElement[]): Record<string, any>[];

  /**
   * Method that is called from the base class running both detection and extraction logic
   *
   * @returns extracted framework information from detected elements
   */
  run() {
    const elements = this.detect();

    if (!elements) {
      return null;
    }

    return this.extract(elements);
  }
}
