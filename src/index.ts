import ReactExtractor from "./extractors/react-extractor";
import VueExtractor from "./extractors/vue-extractor";

export default class Tinkaton {
    private extractors = [
        new VueExtractor(),
        new ReactExtractor()
    ];

    run(): any[] {
        const results: any[] = [];

        for (const extractor of this.extractors) {
            results.push(extractor.run())
        }

        return results.flat();
    }
}