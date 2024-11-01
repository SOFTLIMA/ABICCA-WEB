import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-associados',
  standalone: true,
  imports: [MatButtonModule, RouterLink, CommonModule],
  templateUrl: './associados.component.html',
  styleUrl: './associados.component.css'
})
export class AssociadosComponent {

}
