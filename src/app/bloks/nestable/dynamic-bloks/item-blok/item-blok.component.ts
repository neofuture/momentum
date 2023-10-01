import {Component, inject, Input} from "@angular/core";
import {NestableBlok, SbNestableBlok, StoryblokBlokDirective, StoryblokRenderDirective} from "@/storyblok";
import {ItemBlok} from "@/bloks/nestable/dynamic-bloks/item-blok/item-blok.interface";
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {LoadingComponent} from "@/components/loading";
import {dynamicRoutes} from "@/storyblok/dynamic-routes.routes";

@Component({
    selector: 'app-item-blok',
    templateUrl: './item-blok.component.html',
    styleUrls: ['./item-blok.component.css'],
    imports: [
        JsonPipe,
        StoryblokRenderDirective,
        NgForOf,
        HttpClientModule,
        NgIf,
        LoadingComponent
    ],
    hostDirectives: [{
        directive: StoryblokBlokDirective,
        inputs: ['blok']
    }],
    standalone: true
})
export class ItemBlokComponent implements NestableBlok<ItemBlok> {
    @Input({required: true}) blok!: SbNestableBlok<ItemBlok>;
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
        this.comp = this.slugs.shift();
        this.loaded = false;
        this.httpClient.get(environment.api + '/listing/' + this.slugs[0] + '?with[]=all').subscribe((data: any) => {
            this.json = data.data;
            this.title.setTitle(data.data.title.replace(/&amp;/ , '&'));
            this.loaded = true;
        });
    }

}