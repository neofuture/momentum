import {computed, inject, Injectable, makeStateKey, TransferState} from '@angular/core';
import {STORYBLOK_MODE, STORYBLOK_PREVIEW_TOKEN, STORYBLOK_TOKEN} from "../index";
import {apiPlugin, ISbStoriesParams, ISbStory, storyblokInit} from "@storyblok/js";
import {ISbStoryData} from "storyblok-js-client/src/interfaces";
import {StoryblokClient} from "@storyblok/js/dist/types/types";
import {dynamicRoutes} from "@/storyblok/dynamic-routes.routes";

type SbParams = Omit<ISbStoriesParams, 'version' | 'search_term' | 'resolve_links'>

@Injectable({
    providedIn: 'root'
})
export class StoryblokService {
    dynamicRoutes = dynamicRoutes;

    accessToken = inject(STORYBLOK_TOKEN);
    previewToken = inject(STORYBLOK_PREVIEW_TOKEN);
    storyblokMode = inject(STORYBLOK_MODE);
    transferState = inject(TransferState);

    modeToken = computed(() => {
        return this.storyblokMode() === 'draft'
            ? this.previewToken
            : this.accessToken
    })

    client: StoryblokClient;

    constructor() {
        const storyblok = storyblokInit({
            accessToken: this.accessToken,
            use: [apiPlugin],
            apiOptions: {
                cache: {type: "none"},
            }
        });

        if (!storyblok.storyblokApi) {
            throw new Error('Storyblok API not initialized');
        }

        this.client = storyblok.storyblokApi;
    }

    async getStory(slug: string, params?: SbParams): Promise<ISbStory['data']> {

        const token = makeStateKey<ISbStory['data']>(`storyblok:${slug}`);

        const story = this.transferState.get(token, null);

        if (story) {
            return story;
        }

        const defaultParams = this.getDefaultParams();

        for (const s of this.dynamicRoutes) {
            if (slug.startsWith(s.slug)) {
                slug = s.mapping;
                break;
            }
        }

        const resp = await this.client.getStory(slug || 'home', {
            resolve_links: 'url',
            ...defaultParams,
            ...params,
        });

        this.transferState.set(token, resp.data);

        return resp.data;
    }

    async search<T>(search_term: string, params?: SbParams): Promise<Array<ISbStoryData<T>>> {
        const defaultParams = this.getDefaultParams();

        const resp = await this.client.get(`cdn/stories`, {
            search_term,
            ...defaultParams,
            ...params,
        });
        return resp.data.stories;
    }

    getDefaultParams(): Partial<ISbStoriesParams> {
        return {
            version: this.storyblokMode(),
            token: this.modeToken(),
        }
    }

}
