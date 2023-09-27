import {InjectionToken, makeEnvironmentProviders, signal, Type, WritableSignal} from "@angular/core";
import {SbContentTypeBlok} from "@/storyblok/storyblok.interface";

export const STORYBLOK_PREVIEW_TOKEN = new InjectionToken<string>('sb.preview-token');
export const STORYBLOK_TOKEN = new InjectionToken<string>('sb.token');
export const STORYBLOK_MODE = new InjectionToken<WritableSignal<'draft' | 'published'>>('sb.mode');
export const STORYBLOK_BLOKS = new InjectionToken<StoryblokBloks>('sb.bloks');
export const STORYBLOK_CONTEXT = new InjectionToken<SbContentTypeBlok>('sb.context');

export type BlokLoadType = () => Promise<BlokComponent>;
export type BlokComponent = Type<unknown>;
export type StoryblokBloks = Record<string, BlokComponent | BlokLoadType>;

export interface StoryblokEnvironment {
    previewToken?: string;
    token: string;
    bloks: StoryblokBloks;
}

export const provideStoryblok = ({previewToken, token, bloks}: StoryblokEnvironment) => makeEnvironmentProviders([
    {
        provide: STORYBLOK_PREVIEW_TOKEN,
        useValue: previewToken
    },
    {
        provide: STORYBLOK_TOKEN,
        useValue: token,
    },
    {
        provide: STORYBLOK_MODE,
        useValue: signal<'draft' | 'published'>('published'),
    },
    {
        provide: STORYBLOK_BLOKS,
        useValue: bloks
    }
]);
