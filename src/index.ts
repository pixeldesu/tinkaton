import AlpineExtractor from "./extractors/alpine-extractor";
import LivewireExtractor from "./extractors/livewire-extractor";
import ReactExtractor from "./extractors/react-extractor";
import Vue3Extractor from "./extractors/vue3-extractor";

export default class Tinkaton {
  private extractors = [
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
