import {Pipe, PipeTransform} from "@angular/core";
import {renderRichText} from "@storyblok/js";
import {SbRichText} from "@/storyblok";

@Pipe({
    name: 'richText',
    standalone: true,
})
export class StoryblokRichTextPipe implements PipeTransform {

    transform(data: SbRichText): string {
        return renderRichText(data);
    }

}
