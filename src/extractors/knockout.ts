import { DetectionResult, ExtractionResult } from "../types";
import { AbstractExtractor } from "./_abstract";

export default class KnockoutExtractor extends AbstractExtractor {
  type: string = "knockout";

  detect(): DetectionResult {
    return this.buildDetectionResult(window["ko"] !== undefined);
  }

  extract(): ExtractionResult {
    return this.buildExtractionResult(window["ko"]);
  }
}
