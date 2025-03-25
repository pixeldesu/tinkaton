import { AbstractExtractor } from "./abstract-extractor";

export default class VueExtractor extends AbstractExtractor {
    detect(selector?: string): HTMLElement[] {
        const results: HTMLElement[] = [];

        const appElement = document.querySelector("#app") as HTMLElement | undefined;
        if (appElement && Object.hasOwn(appElement, "__vue_app__")) {
            results.push(appElement);
        }

        return results;
    }
    
    extract(elements: HTMLElement[]): Record<string, any>[] {
        const results: Record<string, any>[] = [];

        for (const element of elements) {
            results.push({
                ...(element["__vue_app__"]._context?.config?.globalProperties as Record<string, any>)
            });
        }

        return results;
    }

}