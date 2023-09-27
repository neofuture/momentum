import {Directive, ElementRef, inject, Input, OnInit} from '@angular/core';
import {SbContentTypeBlok, SbNestableBlok} from "@/storyblok";

@Directive({
    selector: '[appStoryblokBlok]',
    standalone: true
})
export class StoryblokBlokDirective implements OnInit {

    el = inject(ElementRef);

    @Input({required: true}) blok!: SbNestableBlok | SbContentTypeBlok;

    get _editable() {
        return this.blok.hasOwnProperty('uuid')
            ? (this.blok as SbContentTypeBlok).content._editable
            : (this.blok as SbNestableBlok)._editable
    }

    ngOnInit() {

        const editableData = this._editable;

        if (!editableData) {
            return;
        }

        const editable = editableData
            .replace('<!--#storyblok#', '')
            .replace('-->', '');

        const options = JSON.parse(editable);

        this.el.nativeElement.setAttribute('data-blok-c', editable);
        this.el.nativeElement.setAttribute('data-blok-uid', options.id + '-' + options.uid);
        this.el.nativeElement.classList.add("storyblok__outline");
    }


}
