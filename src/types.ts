export interface TinkatonExtractionResult {
  type: string;
  data: any;
  entrypoint?: HTMLElement;
}

export type TinkatonDetectionResult = [boolean, HTMLElement[]];
