import {UrlMatcher, UrlSegment} from "@angular/router";

export const StoryblokMatcher: UrlMatcher = (segments: UrlSegment[]) => ({
    consumed: segments,
})
