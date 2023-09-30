import {StoryblokBloks} from "@/storyblok";

const enum BLOKS {
    STANDARD_PAGE = 'standard-page',
    CATEGORY_PAGE = 'category-page',
    ITEM_PAGE = 'item-page',
    AUTOMOTIVE_PAGE = 'automotive-page',

    NAVIGATION = 'navigation',
    USER_STATUS = 'user-status',
    SEARCH_BAR = 'search-bar',

    IMAGE_CONTENT = 'image-content',
    CAROUSEL = 'carousel',
    CAROUSEL_SLIDE = 'carousel-slide',
    SECTION = 'section',
    ITEM = 'item',
    TEXT = 'text',
}

export const Bloks: StoryblokBloks = {
    [BLOKS.STANDARD_PAGE]: () => import('./content-types/standard-page').then(m => m.StandardPageComponent),
    [BLOKS.CATEGORY_PAGE]: () => import('./content-types/category-page').then(m => m.CategoryPageComponent),
    [BLOKS.ITEM_PAGE]: () => import('./content-types/item-page').then(m => m.ItemPageComponent),
    [BLOKS.AUTOMOTIVE_PAGE]: () => import('./content-types/automotive-page').then(m => m.AutomotivePageComponent),

    [BLOKS.NAVIGATION]: () => import('./nestable/navigation-blok').then(m => m.NavigationBlokComponent),
    [BLOKS.USER_STATUS]: () => import('./nestable/user-status-blok').then(m => m.UserStatusBlokComponent),
    [BLOKS.SEARCH_BAR]: () => import('./nestable/search-bar-blok').then(m => m.SearchBarBlokComponent),

    [BLOKS.IMAGE_CONTENT]: () => import('./nestable/image-content-blok').then(m => m.ImageContentBlokComponent),
    [BLOKS.CAROUSEL]: () => import('./nestable/carousel-blok').then(m => m.CarouselBlokComponent),
    [BLOKS.CAROUSEL_SLIDE]: () => import('./nestable/carousel-slide-blok').then(m => m.CarouselSlideBlokComponent),
    [BLOKS.SECTION]: () => import('./nestable/section-blok').then(m => m.SectionBlokComponent),
    [BLOKS.ITEM]: () => import('./nestable/item-blok').then(m => m.ItemBlokComponent),
    [BLOKS.TEXT]: () => import('./nestable/text-blok').then(m => m.TextBlokComponent),
}
