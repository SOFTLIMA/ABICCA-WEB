import { Component } from '@angular/core';
import { SejaUmAssociadoComponent } from "../seja-um-associado/seja-um-associado.component";
import { QuemPodeSeAssociarComponent } from "../quem-pode-se-associar/quem-pode-se-associar.component";
import { DireitoEDeveresComponent } from "../direito-e-deveres/direito-e-deveres.component";

@Component({
  selector: 'app-associe-se',
  standalone: true,
  imports: [SejaUmAssociadoComponent, QuemPodeSeAssociarComponent, DireitoEDeveresComponent],
  templateUrl: './associe-se.component.html',
  styleUrl: './associe-se.component.css'
})
export class AssocieSeComponent {

}
