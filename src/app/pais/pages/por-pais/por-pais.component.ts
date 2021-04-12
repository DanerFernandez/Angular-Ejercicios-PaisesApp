import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `,
  ],
})
export class PorPaisComponent {
  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  mostrarSugerencias: boolean = false;

  constructor(private paisService: PaisService) {}

  buscar(termino: string): void {
    this.mostrarSugerencias = false;
    this.termino = termino;
    this.hayError = false;

    this.paisService.buscarPais(this.termino).subscribe(
      (paises) => {
        console.log(paises);
        this.paises = paises;
      },
      (err) => {
        this.hayError = true;
        this.paises = [];
      }
    );
  }

  sugerencias(termino: string): void {
    this.mostrarSugerencias = false;
    if (termino.trim() !== '') {
      this.mostrarSugerencias = true;
      this.termino = termino;
      this.hayError = false;
      this.paisService.buscarPais(termino).subscribe(
        (paises) => (this.paisesSugeridos = paises.splice(0, 5)),
        (err) => (this.paisesSugeridos = [])
      );
    }
  }
}
