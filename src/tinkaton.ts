import AlpineExtractor from "./extractors/alpine-extractor";
import LivewireExtractor from "./extractors/livewire-extractor";
import ReactExtractor from "./extractors/react-extractor";
import Vue2Extractor from "./extractors/vue2-extractor";
import Vue3Extractor from "./extractors/vue3-extractor";

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
