import {
  Component,
  ElementRef,
  Input,
  OnInit,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { RuleNode } from '../../../models/rule-node';

@Component({
  selector: 'app-rule-node',
  templateUrl: './rule-node.component.html',
  styleUrls: ['./rule-node.component.scss'],
  standalone: false
})
export class RuleNodeComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() data?: RuleNode;
  @Input() emit?: (data: any) => void;
  @Input() rendered?: () => void;

  @ViewChild('contentSection') contentSection?: ElementRef;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    // Inicialização adicional se necessário
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['data'].currentValue) {
      this.updateComponentWithData();
      console.log(this.data);
    }
  }

  ngAfterViewInit(): void {
    if (this.data && this.contentSection) {
      this.updateComponentDimensions();
      this.notifyRendered();
    }
  }

  private updateComponentWithData(): void {
    if (this.contentSection) {
      this.updateComponentDimensions();
    }
    this.notifyRendered();
  }

  private updateComponentDimensions(): void {
    const element = this.contentSection?.nativeElement as HTMLElement;
    if (element && this.data) {
      this.data.width = element.offsetWidth;
      this.data.height = element.offsetHeight;
    }
  }

  private notifyRendered(): void {
    if (this.rendered) {
      this.rendered();
    }
  }

  toggleCollapse(): void {
    if (!this.data) {
      return;
    }

    this.data.isCollapsed = !this.data.isCollapsed;
  }

  // Métodos Placeholder para os botões
  addComment(): void {
    // Implementar lógica para adicionar comentário
    console.log('Adicionar comentário');
  }

  save(): void {
    // Implementar lógica para salvar
    console.log('Salvar');
  }

  openTools(): void {
    // Implementar lógica para abrir ferramentas
    console.log('Abrir ferramentas');
  }
}
