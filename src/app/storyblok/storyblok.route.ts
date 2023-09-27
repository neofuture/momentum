import {Route} from "@angular/router";
import {StoryblokMatcher} from "@/storyblok/routing/storyblok.matcher";
import {StoryblokCanMatch} from "@/storyblok/routing/storyblok.match";
import {StoryblokResolve} from "@/storyblok/routing/storyblok.resolve";
import {StoryblokPreloadResolve} from "@/storyblok/routing/storyblok-preload.resolve";

export const storyblokRoute: Route = {
    matcher: StoryblokMatcher,
    canMatch: [StoryblokCanMatch],
    loadComponent:
        () => import('@/storyblok')
            .then(m => m.StoryblokComponent),
    resolve: {
        storyblok: StoryblokResolve,
        preload: StoryblokPreloadResolve,
    }
}