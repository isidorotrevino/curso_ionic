import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({
    name: 'domSanitizer'
})
export class DomSanitizerPipe implements PipeTransform {

    constructor(private domStr: DomSanitizer) {

    }


    transform(img: string): unknown {
        const domImg = `background-image: url('${img}')`;
        return this.domStr.bypassSecurityTrustStyle(domImg);
    }

}
