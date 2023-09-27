import {StoryblokBloks} from "@/storyblok";

const enum BLOKS {
    STANDARD_PAGE = 'standard-page',
    IMAGE_CONTENT = 'image-content',
    CAROUSEL = 'carousel',
    CAROUSEL_SLIDE = 'carousel-slide',
    SECTION = 'section',
    ITEM = 'item',
    TEXT = 'text',
}

export const Bloks: StoryblokBloks = {
    [BLOKS.STANDARD_PAGE]: () => import('./content-types/standard-page').then(m => m.StandardPageComponent),
    [BLOKS.IMAGE_CONTENT]: () => import('./nestable/image-content-blok').then(m => m.ImageContentBlokComponent),
    [BLOKS.CAROUSEL]: () => import('./nestable/carousel-blok').then(m => m.CarouselBlokComponent),
    [BLOKS.CAROUSEL_SLIDE]: () => import('./nestable/carousel-slide-blok').then(m => m.CarouselSlideBlokComponent),
    [BLOKS.SECTION]: () => import('./nestable/section-blok').then(m => m.SectionBlokComponent),
    [BLOKS.ITEM]: () => import('./nestable/item-blok').then(m => m.ItemBlokComponent),
    [BLOKS.TEXT]: () => import('./nestable/text-blok').then(m => m.TextBlokComponent),
}
