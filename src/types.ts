export interface ExtractionResult {
  type: string;
  data: any;
  entrypoint?: HTMLElement;
}

export type DetectionResult = [boolean, HTMLElement[]];

export interface TinkatonOptions {
  selector?: string;
  extractor?: Record<string, any>;
}

export interface TinkatonExtractorOptions {
  selector?: string;
  [key: string]: any;
}
