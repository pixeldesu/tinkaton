import { DetectionResult, ExtractionResult } from "../types";
import { AbstractExtractor } from "./_abstract";

export default class EmberExtractor extends AbstractExtractor {
  type: string = "ember";

  detect(): DetectionResult {
    return this.buildDetectionResult(window["Ember"] !== undefined);
  }

  extract(): ExtractionResult {
    return this.buildExtractionResult(window["Ember"]);
  }
}
