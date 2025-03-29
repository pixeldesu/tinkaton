import {
  DetectionResult,
  ExtractionResult,
  TinkatonExtractorOptions,
} from "../types";

export abstract class AbstractExtractor {
  options: TinkatonExtractorOptions;

  /**
   * Named identifier for the framework
   */
  abstract type: string;

  /**
   * Method to detect a HTML element containing framework information
   *
   * @param selector optional selector that can be passed to check
   */
  abstract detect(): DetectionResult;

  /**
   * Method to extract framework information from a list of HTML elements
   *
   * @param elements (detected) HTML elements containing framework information
   */
  abstract extract(
    elements: HTMLElement[],
  ): ExtractionResult[] | ExtractionResult;

  /**
   * Method to build a generalized result object
   */
  protected buildExtractionResult(data, entrypoint?): ExtractionResult {
    return {
      type: this.type,
      data,
      entrypoint,
    };
  }

  /**
   * Method to build a generalized detection result
   */
  protected buildDetectionResult(
    detected: boolean = false,
    elements: HTMLElement[] = [],
  ): DetectionResult {
    return [detected, elements];
  }

  /**
   * Sets extractor options passed from Tinkaton
   *
   * @param options
   */
  public setOptions(options: TinkatonExtractorOptions) {
    this.options = options;
  }

  /**
   * Method that is called from the base class running both detection and extraction logic
   *
   * @returns extracted framework information from detected elements
   */
  run() {
    const [detected, elements] = this.detect();

    if (!detected) {
      return [];
    }

    return this.extract(elements);
  }
}
