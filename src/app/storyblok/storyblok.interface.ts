import type {ISbComponentType, ISbStoryData, ISbLinkURLObject} from "storyblok-js-client/src/interfaces";
import type {ISbRichtext} from "@storyblok/js";


export type SbNestableBlok<T = Record<string, unknown>> = ISbComponentType<string> & T;
export type SbContentTypeBlok<T = ISbComponentType<string> & Record<string, unknown>> = ISbStoryData<T>;

export interface NestableBlok<T = Record<string, unknown>> {
    blok: SbNestableBlok<T>;
}

export interface ContentTypeBlok<T = ISbComponentType<string> & Record<string, unknown>> {
    blok: ISbStoryData<T>
}

export type SbRichText = ISbRichtext;

export interface SbLink {
    id: string;
    url: string;
    anchor: string;
    linktype: string;
    fieldtype: string;
    cached_url: string;
    story?: ISbLinkURLObject;
}

export interface SbImage {
    id: number;
    alt: string
    name: string
    focus: string
    title: string
    source: string
    filename: string
    copyright: string
    fieldtype: string;
    meta_data: object;
}
