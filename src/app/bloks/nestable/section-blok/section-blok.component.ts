import {Component, HostBinding, Input} from "@angular/core";
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
    @HostBinding('class.section__container')
    protected readonly hbClass = true;
    @HostBinding('class.section__container--row')
    get hbClassRow(): boolean {
        return this.blok.flexdirection === 'row';
    }
    @Input({required: true}) blok!: SbNestableBlok<SectionBlok>;
}
