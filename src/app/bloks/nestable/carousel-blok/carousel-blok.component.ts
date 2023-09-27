import {
    AfterViewInit,
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
    ElementRef,
    HostBinding,
    Input,
    ViewChild
} from "@angular/core";
import {NestableBlok, SbNestableBlok, StoryblokBlokDirective, StoryblokRenderDirective} from "@/storyblok";
import {CarouselBlok} from "@/bloks/nestable/carousel-blok/carousel-blok.interface";
import {NgForOf, NgIf} from "@angular/common";
import {register, SwiperContainer} from 'swiper/element/bundle';

register();


@Component({
    selector: 'app-carousel-blok',
    templateUrl: './carousel-blok.component.html',
    styleUrls: ['./carousel-blok.component.css'],
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
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CarouselBlokComponent implements NestableBlok<CarouselBlok>, AfterViewInit {
    @Input({required: true}) blok!: SbNestableBlok<CarouselBlok>;
    @HostBinding('class.carousel')
    protected readonly hbClass = true;
    activeSlide: number = 0;

    @ViewChild('swiperContainer', {static: false}) swiperContainer?: ElementRef<SwiperContainer>;

    setActiveSlide(index: number) {
        this.swiperContainer?.nativeElement.swiper.slideTo(index);
    }

    setNextSlide() {
        this.swiperContainer?.nativeElement.swiper.slideNext();
    }

    setPreviousSlide() {
        this.swiperContainer?.nativeElement.swiper.slidePrev();
    }

    ngAfterViewInit(): void {
        this.swiperContainer?.nativeElement.swiper.on('slideChange', () => {
            if (this.swiperContainer?.nativeElement.swiper.activeIndex !== undefined) {
                this.activeSlide = this.swiperContainer?.nativeElement.swiper.activeIndex;
            }
        });
    }
}