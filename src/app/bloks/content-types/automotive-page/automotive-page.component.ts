import {Component, HostBinding, Input} from "@angular/core";
import {ContentTypeBlok, SbContentTypeBlok, StoryblokRenderDirective} from "@/storyblok";
import {NgForOf} from "@angular/common";
import {AutomotivePageBlok} from "@/bloks/content-types/automotive-page/automotive-page.interface";

@Component({
    selector: 'app-standard-page',
    templateUrl: './automotive-page.component.html',
    styleUrls: ['./automotive-page.component.css'],
    imports: [
        NgForOf,
        StoryblokRenderDirective
    ],
    standalone: true
})
export class AutomotivePageComponent implements ContentTypeBlok<AutomotivePageBlok> {
    @HostBinding('class.page')
    protected readonly hbClass = true;
    @Input({required: true}) blok!: SbContentTypeBlok<AutomotivePageBlok>;
}
