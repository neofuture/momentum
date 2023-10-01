import {Component, Input, OnInit} from "@angular/core";
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
import {NestableBlok, SbNestableBlok, StoryblokBlokDirective, StoryblokRenderDirective} from "@/storyblok";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {LoadingComponent} from "@/components/loading";
import {SearchBlok} from "@/bloks/nestable/dynamic-bloks/search-blok/search-blok.interface";
import {ActivatedRoute, ActivatedRouteSnapshot, Params} from "@angular/router";
import {environment} from "../../../../../environments/environment";

@Component({
    selector: 'app-search-blok',
    templateUrl: './search-blok.component.html',
    styleUrls: ['./search-blok.component.css'],
    imports: [
        JsonPipe,
        StoryblokRenderDirective,
        NgForOf,
        HttpClientModule,
        NgIf,
        LoadingComponent,
        JsonPipe,
        HttpClientModule
    ],
    hostDirectives: [{
        directive: StoryblokBlokDirective,
        inputs: ['blok']
    }],
    standalone: true
})

export class SearchBlokComponent  implements NestableBlok<SearchBlok>, OnInit {
    loaded = false;
    loadingText = 'Loading';
    @Input({required: true}) blok!: SbNestableBlok<SearchBlok>;
    params: Params;
    json: any;
    constructor(
        private activatedRoute: ActivatedRoute,
        private httpClient: HttpClient
    ) {
        this.params = this.activatedRoute.snapshot.queryParams;
    }

    ngOnInit() {
        if(this.params.search.length > 0){
            this.loaded = false;
            this.loadingText = 'Loading';
            setTimeout(() => {
                this.loadingText = 'Still loading';
            }, 3000);
            setTimeout(() => {
                this.loadingText = 'Please wait. Still loading';
            }, 8000);
            this.httpClient.get(environment.api + `/search?active_listings=1&cat_id=${this.params.cat_id}&category=${this.params.category}&page=1&results_per_page=20&search=` + this.params.search).subscribe((data: any) => {
                this.json = data.data;
                this.loaded = true;
            });
        }
    }
}