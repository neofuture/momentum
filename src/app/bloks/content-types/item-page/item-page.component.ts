import {Component, HostBinding, Input} from "@angular/core";
import {ContentTypeBlok, SbContentTypeBlok, StoryblokRenderDirective} from "@/storyblok";
import {NgForOf} from "@angular/common";
import {ItemPageBlok} from "@/bloks/content-types/item-page/item-page.interface";

@Component({
    selector: 'app-standard-page',
    templateUrl: './item-page.component.html',
    styleUrls: ['./item-page.component.css'],
    imports: [
        NgForOf,
        StoryblokRenderDirective
    ],
    standalone: true
})
export class ItemPageComponent implements ContentTypeBlok<ItemPageBlok> {
    @HostBinding('class.page')
    protected readonly hbClass = true;
    @Input({required: true}) blok!: SbContentTypeBlok<ItemPageBlok>;
}
