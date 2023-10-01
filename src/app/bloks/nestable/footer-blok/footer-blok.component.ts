import {Component, HostBinding, Input} from "@angular/core";
import {SbNestableBlok, StoryblokBlokDirective, StoryblokRenderDirective} from "@/storyblok";
import {FooterBlok} from "@/bloks/nestable/footer-blok/footer-blok.interface";
import {JsonPipe, NgForOf} from "@angular/common";

@Component({
    selector: 'app-footer-blok',
    templateUrl: './footer-blok.component.html',
    styleUrls: ['./footer-blok.component.css'],
    imports: [
        JsonPipe,
        NgForOf,
        StoryblokRenderDirective
    ],
    hostDirectives: [{
        directive: StoryblokBlokDirective,
        inputs: ['blok']
    }],
    standalone: true
})

export class FooterBlokComponent {
    @HostBinding('class.footer')
    protected readonly hbClass = true;

    @Input({required: true}) blok!: SbNestableBlok<FooterBlok>;
    constructor() {
    }
}