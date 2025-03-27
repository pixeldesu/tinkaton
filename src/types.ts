export interface ExtractionResult {
  type: string;
  data: any;
  entrypoint?: HTMLElement;
}

export type DetectionResult = [boolean, HTMLElement[]];
