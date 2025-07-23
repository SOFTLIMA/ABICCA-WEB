import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-lideranca',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lideranca.component.html',
  styleUrl: './lideranca.component.css'
})
export class LiderancaComponent {

  lideres = [
    { name: "Marcos Antônio Picoli",
      cargo: "Presidente",
      text: "Advogado, Administrador de empresas, mestre em Administração, MBA em Gestão Empresarial, Logística e Supply Chain Management, especialista em Direito societário e Direito Público. É o atual gerente de operações da Metalúrgica São Raphael.",
      image: "Galeria/Lideranca/Marcos.jpg"
    },
    { name: "Rui Faria",
      cargo: "Vice-presidente",
      text: "Engenheiro, construiu sua carreira atuando no setor offshore, tendo profundo conhecimento em normas técnicas, correntes, cabos de aço, cabos de fibra, cabos CFRP e materiais para manutenção de estações offshore em geral.",
      image: "Galeria/Lideranca/Rui.jpg"
    },
    { name: " Ricardo Teles Araújo",
      cargo: "Secretário-executivo",
      text: "Graduado em Administração e Marketing, possui mais de 35 anos de experiência no setor industrial. É o principal responsável pela implantação e direção da Lankhorst Euronete Brasil. É reconhecido na indústria de cabos sintéticos, sendo referência em negociações e relacionamentos sólidos e duradouros. ",
      image: "Galeria/Lideranca/Ricardo.jpg"
    },
  ]

}
