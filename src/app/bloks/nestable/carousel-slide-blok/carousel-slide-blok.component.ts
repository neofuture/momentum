import {Component, HostBinding, Input} from "@angular/core";
import {NgForOf, NgIf} from "@angular/common";
import {NestableBlok, SbNestableBlok, StoryblokBlokDirective, StoryblokRenderDirective} from "@/storyblok";
import {CarouselSlideBlok} from "@/bloks/nestable/carousel-slide-blok/carousel-slide-blok.interface";

@Component({
    selector: 'app-carousel-slide-blok',
    templateUrl: './carousel-slide-blok.component.html',
    styleUrls: ['./carousel-slide-blok.component.css'],
    standalone: true,
    imports: [
        StoryblokBlokDirective,
        NgForOf,
        StoryblokRenderDirective,
        NgIf
    ],
    hostDirectives: [{
        directive: StoryblokBlokDirective,
        inputs: ['blok']
    }],
})

export class CarouselSlideBlokComponent implements NestableBlok<CarouselSlideBlok> {
    @Input({required: true}) blok!: SbNestableBlok<CarouselSlideBlok>;
}