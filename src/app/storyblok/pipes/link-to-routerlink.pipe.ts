import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: 'linkToRouterlink',
    standalone: true
})
export class LinkToRouterlinkPipe implements PipeTransform {

    transform(value: string): Array<string> {
        return ['/', ...value.split('/')];
    }

}
