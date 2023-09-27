import {Component, computed, inject, OnInit, PLATFORM_ID, signal} from "@angular/core";
import {ISbStoryData, useStoryblokBridge} from "@storyblok/js";
import {isPlatformBrowser, NgForOf, NgIf} from "@angular/common";
import {toSignal} from "@angular/core/rxjs-interop";
import {ActivatedRoute} from "@angular/router";

import {
    SbContentTypeBlok,
    StoryblokBlokDirective,
    StoryblokRenderDirective,
    StoryblokRichTextPipe
} from "../index";

@Component({
    selector: 'app-storyblok',
    templateUrl: './storyblok.component.html',
    styleUrls: ['./storyblok.component.css'],
    imports: [
        StoryblokBlokDirective,
        StoryblokRichTextPipe,
        NgForOf,
        StoryblokRenderDirective,
        NgIf,
    ],
    standalone: true
})
export class StoryblokComponent implements OnInit {

    PLATFORM_ID = inject(PLATFORM_ID);

    data = toSignal(inject(ActivatedRoute).data);
    bridgeStory = signal<ISbStoryData | undefined>(undefined);

    story = computed<SbContentTypeBlok>(() => {
        const {storyblok} = this.data()!;
        const bridgeStory = this.bridgeStory();
        return bridgeStory
            ? bridgeStory
            : storyblok.story;
    });

    ngOnInit() {
        const {id} = this.story();

        if (isPlatformBrowser(this.PLATFORM_ID)) {
            useStoryblokBridge(id, (story) => this.bridgeStory.set(story))
        }
    }

}
