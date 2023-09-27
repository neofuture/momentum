import {Pipe, PipeTransform} from "@angular/core";
import {SbRichText} from "@/storyblok";

@Pipe({
    name: 'hasRichText',
    standalone: true
})
export class HasRichTextPipe implements PipeTransform {

    transform(value: SbRichText | undefined): boolean {
        if (!value) {
            return false;
        }

        if(!value.content?.length){
            return false;
        }

        const firstContent = value.content[0];

        if(!firstContent.content) {
            return false;
        }

        return true;
    }

}
