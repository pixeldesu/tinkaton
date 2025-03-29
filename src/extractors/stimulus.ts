import { DetectionResult, ExtractionResult } from "../types";
import { AbstractExtractor } from "./_abstract";

export default class StimulusExtractor extends AbstractExtractor {
  type: string = "stimulus";

  detect(): DetectionResult {
    return this.buildDetectionResult(window["Stimulus"] !== undefined);
  }

  extract(): ExtractionResult {
    return this.buildExtractionResult(window["Stimulus"]);
  }
}
