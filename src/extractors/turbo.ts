import { DetectionResult, ExtractionResult } from "../types";
import { AbstractExtractor } from "./_abstract";

export default class TurboExtractor extends AbstractExtractor {
  type: string = "turbo";

  detect(): DetectionResult {
    return this.buildDetectionResult(window["Turbo"] !== undefined);
  }

  extract(): ExtractionResult {
    return this.buildExtractionResult(window["Turbo"]);
  }
}
