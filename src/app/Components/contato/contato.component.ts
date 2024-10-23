import { Component } from '@angular/core';
import { FormularioComponent } from "../Associese/formulario/formulario.component";
import { EntreEmContatoComponent } from "./entre-em-contato/entre-em-contato.component";
import { MapaComponent } from "./mapa/mapa.component";

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [FormularioComponent, EntreEmContatoComponent, MapaComponent],
  templateUrl: './contato.component.html',
  styleUrl: './contato.component.css'
})
export class ContatoComponent {

}
