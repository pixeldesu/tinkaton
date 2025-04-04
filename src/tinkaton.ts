import AlpineExtractor from "./extractors/alpine";
import BackboneExtractor from "./extractors/backbone";
import EmberExtractor from "./extractors/ember";
import KnockoutExtractor from "./extractors/knockout";
import LivewireExtractor from "./extractors/livewire";
import ReactExtractor from "./extractors/react";
import StimulusExtractor from "./extractors/stimulus";
import TurboExtractor from "./extractors/turbo";
import Vue2Extractor from "./extractors/vue2";
import Vue3Extractor from "./extractors/vue3";
import { TinkatonOptions } from "./types";

export class Tinkaton {
  options: TinkatonOptions;

  private extractors = [
    Vue2Extractor,
    Vue3Extractor,
    ReactExtractor,
    AlpineExtractor,
    LivewireExtractor,
    StimulusExtractor,
    TurboExtractor,
    EmberExtractor,
    BackboneExtractor,
    KnockoutExtractor,
  ];

  constructor(options: TinkatonOptions) {
    const defaultOptions = {
      extractorOptions: {},
    };

    this.options = {
      ...defaultOptions,
      ...(options ?? {}),
    };
  }

  run(): any[] {
    const results: any[] = [];

    for (const extractor of this.extractors) {
      const extractorInstance = new extractor();
      extractorInstance.setOptions({
        selector: this.options.selector,
        ...(this.options.extractorOptions?.[extractorInstance.type] ?? {}),
      });

      results.push(extractorInstance.run());
    }

    return results.flat();
  }
}
