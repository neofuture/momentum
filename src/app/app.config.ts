import {ApplicationConfig} from '@angular/core';
import {provideClientHydration, withNoHttpTransferCache} from "@angular/platform-browser";
import {
    provideRouter,
    withEnabledBlockingInitialNavigation,
    withInMemoryScrolling,
} from '@angular/router';

import {provideStoryblok} from "@/storyblok";
import {Bloks} from "@/bloks";

import {appRoutes} from './app.routes';
import {environment} from "../environments/environment";

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(
            appRoutes,
            withEnabledBlockingInitialNavigation(),
            withInMemoryScrolling({anchorScrolling: 'enabled', scrollPositionRestoration: 'top'}),
        ),
        provideStoryblok({
            previewToken: environment.storyblok.previewToken,
            token: environment.storyblok.token,
            bloks: Bloks,
        }),
        provideClientHydration(withNoHttpTransferCache()),
    ],
};
