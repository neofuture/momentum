import {Directive, inject, Input, OnChanges, ViewContainerRef} from "@angular/core";

import {BlokComponent, BlokLoadType, SbContentTypeBlok, SbNestableBlok, STORYBLOK_BLOKS} from "@/storyblok";
import {StoryblokComponentService} from "@/storyblok/service/storyblok-component.service";

@Directive({
    selector: 'ng-container[appStoryblokRender]',
    standalone: true
})
export class StoryblokRenderDirective implements OnChanges {
    storyblokComponentService = inject(StoryblokComponentService);
    viewContainerRef = inject(ViewContainerRef);

    @Input({required: true})
    appStoryblokRender!: SbContentTypeBlok | SbNestableBlok;

    getBlokType() {
        return this.appStoryblokRender.hasOwnProperty('component')
            ? 'nestable-blok'
            : 'content-type-blok';
    }

    ngOnChanges() {
        const blokType = this.getBlokType();

        if (blokType === 'nestable-blok') {
            return this.renderNestableBlok();
        }

        if (blokType === 'content-type-blok') {
            return this.renderContentTypeBlok();
        }

    }

    renderNestableBlok() {
        const blok = this.appStoryblokRender as SbNestableBlok;
        const component = blok.component;
        this.renderBlok(component!);
    }

    renderContentTypeBlok() {
        const blok = this.appStoryblokRender as SbContentTypeBlok;
        const component = blok.content.component;
        this.renderBlok(component!);
    }

    async renderBlok(component: string) {
        try {
            const Component: BlokComponent = await this.storyblokComponentService.getComponent(component);
            this.viewContainerRef.clear();
            const ref = this.viewContainerRef.createComponent(Component);
            ref.setInput('blok', this.appStoryblokRender);
        } catch (e) {
            console.error(e);
        }
    }
}
