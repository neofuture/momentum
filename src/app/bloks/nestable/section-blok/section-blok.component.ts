import {Component, Input} from "@angular/core";
import {SectionBlok} from "@/bloks/nestable/section-blok/section-blok.interface";
import {NestableBlok, SbNestableBlok, StoryblokBlokDirective, StoryblokRenderDirective} from "@/storyblok";
import {JsonPipe, NgForOf} from "@angular/common";

@Component({
    selector: 'app-section-blok',
    templateUrl: './section-blok.component.html',
    styleUrls: ['./section-blok.component.css'],
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
export class SectionBlokComponent implements NestableBlok<SectionBlok> {

    @Input({required: true}) blok!: SbNestableBlok<SectionBlok>;

}
