import {Component, HostBinding, Input} from "@angular/core";
import {
    NestableBlok,
    SbNestableBlok,
    StoryblokBlokDirective,
    StoryblokRenderDirective,
    StoryblokRichTextPipe
} from "@/storyblok";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {ImageContentBlok} from "@/bloks/nestable/image-content-blok/image-content-blok.interface";
import {ExtractImageSizePipe} from "@/storyblok/pipes/extract-image-size.pipe";


@Component({
    selector: 'app-image-content-blok',
    templateUrl: './image-content-blok.component.html',
    styleUrls: ['./image-content-blok.component.css'],
    standalone: true,
    imports: [
        StoryblokRenderDirective,
        NgOptimizedImage,
        NgForOf,
        StoryblokRichTextPipe,
        NgIf,
        ExtractImageSizePipe
    ],
    hostDirectives: [{
        directive: StoryblokBlokDirective,
        inputs: ['blok']
    }]
})

export class ImageContentBlokComponent implements NestableBlok<ImageContentBlok> {
    @HostBinding('class.image-content-blok')
    protected readonly hbClass = true;

    @HostBinding('class.image-content-blok--content-leading')
    get hbClassContentLeading(): boolean {
        return this.blok.direction === 'content-leading';
    }

    @Input({required: true}) blok!: SbNestableBlok<ImageContentBlok>;
}