import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { RouterLink } from '@angular/router';
import { trigger, transition, style, animate } from "@angular/animations"

@Component({
  selector: 'app-associados',
  standalone: true,
  imports: [MatButtonModule, RouterLink, CommonModule],
  templateUrl: './associados.component.html',
  styleUrl: './associados.component.css',
  animations: [
    trigger("fadeIn", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(10px)" }),
        animate("0.3s ease-out", style({ opacity: 1, transform: "translateY(0)" })),
      ]),
    ]),
  ],
})
export class AssociadosComponent {
  partners = [
    { name: "BRASILAMARRAS", image: "assets/BRASiLAMARRAS.png" },
    { name: "CSL", image: "assets/CSL.png" },
    { name: "Lankhorst Euronete Brasil", image: "assets/lankhorst_euronete_brasil_logo.png" },
    { name: "VAN BEEST", image: "assets/VAN_BEEST.png" },
    { name: "TEIJIN", image: "assets/TEIJIN.png" },
    { name: "SR ABICCA", image: "assets/SAORAPHAEL.png" },
    { name: "GERDAU", image: "assets/Gerdau.png" },
  ]

  benefits = [
    "Participação ativa nas decisões estratégicas e comissões temáticas do setor",
    "Acesso exclusivo a informações de mercado e tendências da indústria",
    "Suporte em ações contra concorrência desleal e importações prejudiciais",
    "Representatividade junto a órgãos governamentais e entidades reguladoras",
  ]
}
