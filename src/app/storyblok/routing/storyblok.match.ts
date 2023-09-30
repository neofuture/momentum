import {CanMatchFn, Route, Router, UrlSegment} from "@angular/router";
import {inject} from "@angular/core";
import {STORYBLOK_MODE, STORYBLOK_PREVIEW_TOKEN, StoryblokPreviewService, StoryblokService} from "@/storyblok";

export const StoryblokCanMatch: CanMatchFn = async (route: Route, segments: UrlSegment[]) => {
    const storyblokService = inject(StoryblokService);
    const storyblokMode = inject(STORYBLOK_MODE);
    const storyblokPreviewToken = inject(STORYBLOK_PREVIEW_TOKEN);
    const storyblokPreviewService = inject(StoryblokPreviewService);

    const router = inject(Router);
    const queryParams = router.getCurrentNavigation()?.extractedUrl.queryParams;
    const spaceId = queryParams?.['_storyblok_tk[space_id]'] || '';
    const timestamp = queryParams?.['_storyblok_tk[timestamp]'] || '';
    const token = queryParams?.['_storyblok_tk[token]'] || '';

    const validatedPreview = await storyblokPreviewService.validateToken(
        spaceId,
        timestamp,
        token,
        storyblokPreviewToken,
    );

    storyblokMode.set(validatedPreview ? 'draft' : 'published');
    const slug = segments.join('/');
    try {
        const r = await storyblokService.getStory(slug);
        return !!r.story;
    } catch (e) {
        return false
    }

}
