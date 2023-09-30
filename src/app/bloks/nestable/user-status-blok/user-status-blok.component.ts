import {Component, HostBinding} from "@angular/core";
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
import {StoryblokBlokDirective, StoryblokRenderDirective} from "@/storyblok";

@Component({
    selector: 'app-user-status-blok',
    templateUrl: './user-status-blok.component.html',
    styleUrls: ['./user-status-blok.component.css'],
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
export class UserStatusBlokComponent {
    @HostBinding('class.user-status')
    protected readonly hbClass = true;
    constructor() {
    }
}