import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

    transform(arreglo: any[], texto: string, columna: string): any {
        // console.log(arreglo);
        if (texto === '') {
            return arreglo;
        }
        const nuevoArreglo = arreglo.filter(item => {
            return item[columna].toLowerCase().includes(texto.toLowerCase());
        });
        return nuevoArreglo;
    }

}
