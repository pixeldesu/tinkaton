import VueExtractor from "./extractors/vue-extractor";

export default class Tinkaton {
    private extractors = [
        new VueExtractor()
    ]

    run(): any[] {
        const results: any[] = [];

        for (const extractor of this.extractors) {
            results.push(extractor.run())
        }

        return results.flat();
    }
}