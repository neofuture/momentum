import {inject, Injectable} from "@angular/core";
import {BlokComponent, BlokLoadType, STORYBLOK_BLOKS} from "@/storyblok";

@Injectable({
    providedIn: 'root',
})
export class StoryblokComponentService {
    bloks = inject(STORYBLOK_BLOKS);

    async getComponent(name: string): Promise<BlokComponent> {
        const Component = this.bloks[name];

        if (!Component) {
            throw new Error(`Component ${name} not found`);
        }

        if (typeof Component === 'function') {
            return (Component as BlokLoadType)();
        }

        return Component;

    }
}
