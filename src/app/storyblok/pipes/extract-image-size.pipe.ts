import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: 'extractImageSize',
    standalone: true
})
export class ExtractImageSizePipe implements PipeTransform {

    transform(value: string, metric: 'height'|'width'): string|null {
        const matches = value.match(/(\d+x\d+)/);
        if (matches) {
            const [width, height] = matches[0].split('x');
            if (metric === 'width') {
                return width;
            }
            if (metric === 'height') {
                return height;
            }
        }
        return null;
    }
}