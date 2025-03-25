import { AbstractExtractor } from "./abstract-extractor";

export default class VueExtractor extends AbstractExtractor {
    detect(selector?: string): HTMLElement[] {
        const results: HTMLElement[] = [];
        let targets: HTMLElement[] = [];

        targets.push(document.querySelector("#app") as HTMLElement);
        targets.push(...Array.from(document.querySelectorAll("[data-v-app]")) as HTMLElement[]);
        if (selector !== undefined) {
            targets.push(...Array.from(document.querySelectorAll(selector)) as HTMLElement[]);
        }
        targets = targets.filter(target => target);

        for (const target of targets) {
            if (target && Object.hasOwn(target, "__vue_app__")) {
                results.push(target);
            }
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