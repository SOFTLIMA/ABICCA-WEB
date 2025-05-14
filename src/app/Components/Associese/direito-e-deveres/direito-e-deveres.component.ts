import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-direito-e-deveres",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./direito-e-deveres.component.html",
  styleUrl: "./direito-e-deveres.component.css",
})
export class DireitoEDeveresComponent {
  // Os valores poderiam vir de um serviço para facilitar manutenção
  valores = [
    {
      titulo: "Defender as empresas associadas de competições desleais.",
      descricao:
        "Defender as empresas associadas de práticas comerciais injustas não só promove um campo de atuação mais equitativo para todos, mas também protege a integridade e a reputação do setor.",
      icone: "shield",
    },
    {
      titulo:
        "Representar os associados junto a órgãos do governo, para uniformizar as ações das empresas nas esferas governamentais.",
      descricao:
        "A ABICCA assume papel de porta-voz, buscando influenciar e uniformizar políticas e regulamentações para beneficiar os setores que representa, um compromisso com a liderança ativa, a defesa dos interesses do setor e o desenvolvimento de um ambiente de negócios favorável.",
      icone: "users",
    },
  ]
}
