import { DetectionResult, ExtractionResult } from "../types";
import { AbstractExtractor } from "./_abstract";

export default class BackboneExtractor extends AbstractExtractor {
  type: string = "backbone";

  detect(): DetectionResult {
    return this.buildDetectionResult(window["Backbone"] !== undefined);
  }

  extract(): ExtractionResult {
    return this.buildExtractionResult(window["Backbone"]);
  }
}
