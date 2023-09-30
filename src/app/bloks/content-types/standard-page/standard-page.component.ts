import {Component, HostBinding, inject, Input, OnInit} from "@angular/core";
import {ContentTypeBlok, SbContentTypeBlok, StoryblokRenderDirective} from "@/storyblok";
import {StandardPageBlok} from "@/bloks/content-types/standard-page/standard-page.interface";
import {JsonPipe, NgForOf} from "@angular/common";
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'app-standard-page',
    templateUrl: './standard-page.component.html',
    styleUrls: ['./standard-page.component.css'],
    imports: [
        JsonPipe,
        NgForOf,
        StoryblokRenderDirective
    ],
    standalone: true
})
export class StandardPageComponent implements ContentTypeBlok<StandardPageBlok>, OnInit {
    @HostBinding('class.page')
    protected readonly hbClass = true;
    private title = inject(Title);
    @Input({required: true}) blok!: SbContentTypeBlok<StandardPageBlok>;

    ngOnInit() {
        this.title.setTitle(this.blok.name);
    }

}
