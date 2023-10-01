import {Component, HostBinding, Input} from "@angular/core";
import {ContentTypeBlok, SbContentTypeBlok, StoryblokRenderDirective} from "@/storyblok";
import {NgForOf} from "@angular/common";
import {CategoryPageBlok} from "@/bloks/content-types/category-page/category-page.interface";

@Component({
    selector: 'app-standard-page',
    templateUrl: './category-page.component.html',
    styleUrls: ['./category-page.component.css'],
    imports: [
        NgForOf,
        StoryblokRenderDirective
    ],
    standalone: true
})
export class CategoryPageComponent implements ContentTypeBlok<CategoryPageBlok>{
    @HostBinding('class.page')
    protected readonly hbClass = true;
    @Input({required: true}) blok!: SbContentTypeBlok<CategoryPageBlok>;
}
