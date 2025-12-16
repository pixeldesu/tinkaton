import { DetectionResult, ExtractionResult } from "../types";
import { AbstractExtractor } from "./_abstract";

export default class RequireJsExtractor extends AbstractExtractor {
  type: string = "requirejs";

  detect(): DetectionResult {
    return this.buildDetectionResult(
      window["require"] !== undefined ||
        window["requirejs"] !== undefined ||
        window["requireModule"] !== undefined,
    );
  }

  extract(): ExtractionResult {
    return this.buildExtractionResult(
      window["requireModule"] ?? window["requirejs"] ?? window["require"],
    );
  }
}
