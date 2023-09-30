import {Component, Input} from "@angular/core";
import {
    NestableBlok,
    SbNestableBlok,
    StoryblokBlokDirective,
    StoryblokRenderDirective,
    StoryblokRichTextPipe
} from "@/storyblok";
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
import {TextBlok} from "@/bloks/nestable/text-blok/text-blok.interface";

@Component({
    selector: 'app-text-blok',
    templateUrl: './text-blok.component.html',
    styleUrls: ['./text-blok.component.css'],
    imports: [
        JsonPipe,
        StoryblokRenderDirective,
        NgForOf,
        StoryblokRichTextPipe,
        NgIf
    ],
    hostDirectives: [{
        directive: StoryblokBlokDirective,
        inputs: ['blok']
    }],
    standalone: true
})
export class TextBlokComponent implements NestableBlok<TextBlok> {
    @Input({required: true}) blok!: SbNestableBlok<TextBlok>;
}