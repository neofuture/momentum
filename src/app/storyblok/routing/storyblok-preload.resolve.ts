import {ResolveFn, RouterStateSnapshot} from "@angular/router";
import {inject} from "@angular/core";
import {BlokComponent, STORYBLOK_MODE, StoryblokService} from "@/storyblok";
import {StoryblokComponentService} from "@/storyblok/service/storyblok-component.service";

const crawlTree = (
    node: Record<string, any> | string,
    accumulator = new Set<string>(),
) => {

    if (!node) {
        return accumulator;
    }

    if (typeof node === 'object' && node.component) {
        accumulator.add(node.component);
    }

    const nodes = Array.isArray(node)
        ? node
        : Object.values(node);

    nodes
        .filter((value) => typeof value === 'object' || Array.isArray(value))
        .forEach((node) => crawlTree(node, accumulator));

    return accumulator;

}

export const StoryblokPreloadResolve: ResolveFn<Array<BlokComponent>> =
    async (route, state: RouterStateSnapshot) => {
        const storyblokComponentService = inject(StoryblokComponentService);

        const baseUrl = new URL(state.url, 'https://www.example.com');
        const storyUrl = baseUrl.pathname.slice(1)
        const {story} = await inject(StoryblokService).getStory(storyUrl);
        const components = crawlTree(story);

        return Promise.all(
            [...components].map((component) => storyblokComponentService.getComponent(component))
        );
    }
