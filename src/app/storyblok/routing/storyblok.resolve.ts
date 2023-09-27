import {ResolveFn, RouterStateSnapshot} from "@angular/router";
import {inject} from "@angular/core";
import type {ISbStory} from "storyblok-js-client/src/interfaces";
import {StoryblokService} from "@/storyblok";

export const StoryblokResolve: ResolveFn<ISbStory['data']> =
    (route, state: RouterStateSnapshot) => {
        const storyblokService = inject(StoryblokService);

        const [url] = state.url.split('?')
        const baseUrl = new URL(url, 'https://www.example.com');
        let storyUrl = baseUrl.pathname.slice(1);
        return storyblokService.getStory(storyUrl);
    }
