import { DetectionResult, ExtractionResult } from "../types";
import { AbstractExtractor } from "./_abstract";

export default class SystemExtractor extends AbstractExtractor {
  type: string = "system";

  detect(): DetectionResult {
    return this.buildDetectionResult(window["System"] !== undefined);
  }

  extract(): ExtractionResult {
    return this.buildExtractionResult(window["System"]);
  }
}
