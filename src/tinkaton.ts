import AlpineExtractor from "./extractors/alpine";
import LivewireExtractor from "./extractors/livewire";
import ReactExtractor from "./extractors/react";
import Vue2Extractor from "./extractors/vue2";
import Vue3Extractor from "./extractors/vue3";

export class Tinkaton {
  private extractors = [
    new Vue2Extractor(),
    new Vue3Extractor(),
    new ReactExtractor(),
    new AlpineExtractor(),
    new LivewireExtractor(),
  ];

  run(): any[] {
    const results: any[] = [];

    for (const extractor of this.extractors) {
      results.push(extractor.run());
    }

    return results.flat();
  }
}
