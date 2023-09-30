import {Component, HostBinding} from "@angular/core";
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
import {StoryblokBlokDirective, StoryblokRenderDirective} from "@/storyblok";

@Component({
    selector: 'app-search-bar-blok',
    templateUrl: './search-bar-blok.component.html',
    styleUrls: ['./search-bar-blok.component.css'],
    standalone: true,
    imports: [
        JsonPipe,
        StoryblokRenderDirective,
        NgForOf,
        NgIf
    ],
    hostDirectives: [{
        directive: StoryblokBlokDirective,
        inputs: ['blok']
    }],
})
export class SearchBarBlokComponent {
    @HostBinding('class.search-bar')
    protected readonly hbClass = true;
    constructor() {
    }
}