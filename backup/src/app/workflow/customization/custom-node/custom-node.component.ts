import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Node } from '../../editor/editor.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-custom-node',
  templateUrl: './custom-node.component.html',
  styleUrls: ['./custom-node.component.scss'],
})
export class CustomNodeComponent implements OnInit {
  @Input() data!: Node;
  @Input() emit!: (data: any) => void;
  @Input() rendered!: () => void;
  dynamicForm!: FormGroup; // Formulário dinâmico
  nodeTypes = [
    { label: 'Operator Node', value: 'operator' },
    { label: 'Variable Node', value: 'variable' },
    { label: 'Value Node', value: 'value' },
    { label: 'Condition Node', value: 'condition' },
    { label: 'Regex Node', value: 'regex' }
  ];

  constructor(private fb: FormBuilder) {
    this.dynamicForm = this.fb.group({});
  }

  contentHeight = 'auto'; // Controla a altura dinâmica para a transição

  @ViewChild('content', { static: false }) contentElement?: ElementRef;

  ngOnInit(): void {
    this.addSelects(); // Adiciona os selects dinamicamente

  }

  toggleCollapse(): void {
    if (this.data.isCollapsed) {
      // Expandindo: Define a altura real para ativar a transição
      this.contentHeight = `${this.contentElement?.nativeElement.scrollHeight}px`;
      setTimeout(() => (this.data.isCollapsed = false), 0); // Atualiza o estado após definir a altura
    } else {
      // Recolhendo: Define a altura atual para ativar a transição
      this.contentHeight = `${this.contentElement?.nativeElement.scrollHeight}px`;
      setTimeout(() => {
        this.contentHeight = '0px'; // Altera a altura para 0 após um ciclo de renderização
        this.data.isCollapsed = true;
      }, 0);
    }
  }

  // Função para adicionar selects ao formulário com base no tipo de node
  addSelects() {
    this.nodeTypes.forEach(node => {
      let validators = [];

      switch (node.value) {
        case 'value':
          validators = [Validators.required]; // Espera apenas texto
          break;
        case 'condition':
          validators = [Validators.required]; // Espera uma mistura de variáveis, operadores e valores
          break;
        case 'regex':
          validators = [Validators.required]; // Espera uma expressão regex
          break;
        default:
          validators = [Validators.required]; // Para os outros nodes
          break;
      }

      this.dynamicForm.addControl(node.value, this.fb.control('', validators)); // Adiciona o controle de formulário dinamicamente
    });
  }

  onSubmit() {
    console.log(this.dynamicForm.value); // Exibe os valores do formulário
  }
}
