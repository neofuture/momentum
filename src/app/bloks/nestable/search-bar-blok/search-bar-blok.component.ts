import {Component, HostBinding} from "@angular/core";
import {StoryblokBlokDirective, StoryblokRenderDirective} from "@/storyblok";
import {SearchBarComponent} from "@/components/search-bar/search-bar.component";

@Component({
    selector: 'app-search-bar-blok',
    templateUrl: './search-bar-blok.component.html',
    styleUrls: ['./search-bar-blok.component.css'],
    standalone: true,
    imports: [
        StoryblokRenderDirective,
        SearchBarComponent,
    ],
    hostDirectives: [{
        directive: StoryblokBlokDirective,
        inputs: ['blok']
    }],
})
export class SearchBarBlokComponent {
    @HostBinding('class.search-bar')
    protected readonly hbClass = true;
}