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

@Component({
    selector: 'app-category-blok',
    templateUrl: './category-blok.component.html',
    styleUrls: ['./category-blok.component.css'],
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
export class CategoryBlokComponent implements NestableBlok<CategoryBlok>, OnInit{
    @Input({required: true}) blok!: SbNestableBlok<CategoryBlok>;
    slugs!: string[];
    json: any;
    private title = inject(Title);
    comp: string | undefined;
    loaded = false;
    constructor(
        route: ActivatedRoute,
        private httpClient: HttpClient
    ) {
        this.slugs = route.snapshot.url.map(({path}) => path);
        this.loaded = false;
        this.httpClient.get(environment.api + '/search?stored_search=' + this.slugs[0]).subscribe((data: any) => {
            this.json = data.data;
            this.loaded = true;
        });
    }

    ngOnInit(): void {
        for (const route of dynamicRoutes) {
            if (route.slug === this.slugs[0]) {
                this.title.setTitle(route.title.replace(/&amp;/ , '&'));
            }
        }
    }
}