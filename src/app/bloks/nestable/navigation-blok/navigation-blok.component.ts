import {Component, EventEmitter, Output} from "@angular/core";
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
import {StoryblokBlokDirective, StoryblokRenderDirective} from "@/storyblok";
import {dynamicRoutes} from "@/storyblok/dynamic-routes.routes";
import {dynamicRoutesModel} from "@/storyblok/dynamic-routes.interface";

@Component({
    selector: 'app-navigation-blok',
    templateUrl: './navigation-blok.component.html',
    styleUrls: ['./navigation-blok.component.css'],
    standalone: true,
    imports: [
        StoryblokRenderDirective,
        NgForOf,
        NgIf,
        JsonPipe
    ],
    hostDirectives: [{
        directive: StoryblokBlokDirective,
        inputs: ['blok']
    }],
})
export class NavigationBlokComponent {
    megaMenu: any = [];
    focusState = false;
    constructor() {
        const menuMap = new Map();

        for (const route of dynamicRoutes) {
            if (route.position === 0) {
                route.categories = [];
                route.brands = [];
                menuMap.set(route.slug, {slug: route.slug, title: route.title, categories: route.categories, brands: route.brands, image: route.image});
            }
        }

        for (const route of dynamicRoutes) {
            if (route.position === 1 && route.menu && menuMap.has(route.menu)) {
                menuMap.get(route.menu).categories.push({slug: route.slug, title: route.title});
            } else if (route.position === 2 && route.menu && menuMap.has(route.menu)) {
                menuMap.get(route.menu).brands.push({slug: route.slug, title: route.title});
            }
        }

        this.megaMenu = Array.from(menuMap.values());
    }

    setMenuOpen() {
        this.focusState = true;
    }

    setMenuClosed() {
        this.focusState = false;
    }
}