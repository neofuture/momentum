import {Component, Input} from "@angular/core";
import {SbNestableBlok, StoryblokBlokDirective} from "@/storyblok";
import {JsonPipe, NgIf, NgOptimizedImage} from "@angular/common";
import {ImageBlok} from "@/bloks/nestable/image-blok/image-blok.interface";
import {ExtractImageSizePipe} from "@/storyblok/pipes/extract-image-size.pipe";

@Component(
    {
        selector: 'app-image-blok',
        templateUrl: './image-blok.component.html',
        styleUrls: ['./image-blok.component.css'],
        standalone: true,
        hostDirectives: [{
            directive: StoryblokBlokDirective,
            inputs: ['blok']
        }],
        imports: [
            ExtractImageSizePipe,
            NgOptimizedImage,
            NgIf,
            JsonPipe
        ],
    })
export class ImageBlokComponent {
    @Input({required: true}) blok!: SbNestableBlok<ImageBlok>;
    constructor() {
    }
}
