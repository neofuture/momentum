import {Component, inject, Input, OnInit} from "@angular/core";
import {NestableBlok, SbNestableBlok, StoryblokBlokDirective, StoryblokRenderDirective} from "@/storyblok";
import {ItemBlok} from "@/bloks/nestable/item-blok/item-blok.interface";
import {JsonPipe, NgForOf} from "@angular/common";
import {ActivatedRoute, RouterStateSnapshot} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'app-item-blok',
    templateUrl: './item-blok.component.html',
    styleUrls: ['./item-blok.component.css'],
    imports: [
        JsonPipe,
        StoryblokRenderDirective,
        NgForOf
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
    constructor(
        route: ActivatedRoute
    ) {
        this.slugs = route.snapshot.url.map(({path}) => path);
        this.comp = this.slugs.shift();

        fetch('https://jsonplaceholder.typicode.com/todos/2')
            .then(response => response.json())
            .then(json => {
                this.json = json;
                this.title.setTitle(json.title);
            });
    }

}