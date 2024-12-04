import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActionScopeNode } from 'src/app/workflow-builder/models/action-scope-node';
import { ConditionScopeNode } from 'src/app/workflow-builder/models/condition-scope-node';

@Component({
  selector: 'app-scope',
  templateUrl: './scope.component.html',
  styleUrls: ['./scope.component.scss'],
  standalone: false
})
export class ScopeComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() data?: ConditionScopeNode | ActionScopeNode; // Permite que data seja undefined inicialmente
  @Input() emit?: (data: any) => void;
  @Input() rendered?: () => void;

  contentHeight = 'auto'; // Controla a altura dinâmica para a transição

  @ViewChild('content', { static: false }) contentElement?: ElementRef;

  ngOnInit(): void {
    // Inicialização do componente
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['data'].currentValue) {
      // Quando o data é atualizado via @Input(), atualiza o componente
      this.updateComponentWithData();
      console.log(this.data);

    }
  }

  ngAfterViewInit(): void {
    // Após a visualização ser inicializada, captura dimensões se data já está disponível
    if (this.data && this.contentElement) {
      this.updateComponentDimensions();
      this.notifyRendered();
    }
  }

  private updateComponentWithData(): void {
    if (this.contentElement) {
      this.updateComponentDimensions();
    }
    this.notifyRendered();
  }

  private updateComponentDimensions(): void {
    const element = this.contentElement?.nativeElement;
    if (element && this.data) {
      const { offsetWidth: width, offsetHeight: height } = element;
      this.data.width = width;
      this.data.height = height;
    }
  }

  private notifyRendered(): void {
    if (this.rendered) {
      this.rendered();
    }
  }

  toggleCollapse(): void {
    if (!this.data || !this.contentElement) {
      return;
    }

    if (this.data.isCollapsed) {
      // Expandindo: Define a altura real para ativar a transição
      this.contentHeight = `${this.contentElement.nativeElement.scrollHeight}px`;
      setTimeout(() => (this.data!.isCollapsed = false), 0);
    } else {
      // Recolhendo: Define a altura atual para ativar a transição
      this.contentHeight = `${this.contentElement.nativeElement.scrollHeight}px`;
      setTimeout(() => {
        this.contentHeight = '0px';
        this.data!.isCollapsed = true;
      }, 0);
    }
  }
}


