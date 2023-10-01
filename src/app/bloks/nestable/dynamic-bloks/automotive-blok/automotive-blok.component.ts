import {Component, inject, Input, OnInit} from "@angular/core";
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
import {NestableBlok, SbNestableBlok, StoryblokBlokDirective, StoryblokRenderDirective} from "@/storyblok";
import {Title} from "@angular/platform-browser";
import {CategoryBlok} from "@/bloks/nestable/dynamic-bloks/category-blok/category-blok.interface";
import {ActivatedRoute} from "@angular/router";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {LoadingComponent} from "@/components/loading";
import {dynamicRoutes} from "@/storyblok/dynamic-routes.routes";
import {AutomotiveBlok} from "@/bloks/nestable/dynamic-bloks/automotive-blok/category-blok.interface";

@Component({
    selector: 'app-automotivey-blok',
    templateUrl: './automotive-blok.component.html',
    styleUrls: ['./automotive-blok.component.css'],
    imports: [
        JsonPipe,
        StoryblokRenderDirective,
        NgForOf,
        HttpClientModule,
        LoadingComponent,
        NgIf
    ],
    hostDirectives: [{
        directive: StoryblokBlokDirective,
        inputs: ['blok']
    }],
    standalone: true
})
export class AutomotiveBlokComponent implements NestableBlok<AutomotiveBlok>, OnInit {
    @Input({required: true}) blok!: SbNestableBlok<AutomotiveBlok>;
    slugs!: string[];
    json: any;
    private title = inject(Title);
    comp: string | undefined;
    loaded = false;
    loadingText = 'Loading';
    constructor(
        route: ActivatedRoute,
        private httpClient: HttpClient
    ) {
        this.slugs = route.snapshot.url.map(({path}) => path);
        this.loaded = false;
        this.loadingText = 'Loading';
        setTimeout(() => {
            this.loadingText = 'Still loading';
        }, 3000);
        setTimeout(() => {
            this.loadingText = 'Please wait. Still loading';
        }, 8000);
        this.httpClient.get(environment.api + '/search?stored_search=' + this.slugs[0]).subscribe((data: any) => {
            this.json = data.data;
            this.loaded = true;
        });
    }

    ngOnInit(): void {
        for (const route of dynamicRoutes) {
            if (route.slug === this.slugs[0]) {
                alert(route.title);
                this.title.setTitle(route.title.replace(/&amp;/ , '&'));
            }
        }
    }
}