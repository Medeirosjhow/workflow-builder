import {
  AfterViewInit,
  Component,
  ComponentRef,
  Injector,
  OnDestroy,
  Renderer2,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

import { RuleNode } from '../../models/rule-node';
import { CustomContextMenuComponent } from '../custom-context-menu/custom-context-menu.component';
import { EditorService } from './../../services/editor.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  standalone: false,
})
export class EditorComponent implements AfterViewInit, OnDestroy {
  @ViewChild('container', { static: true, read: ViewContainerRef })
  container!: ViewContainerRef;

  private contextMenuRef!: ComponentRef<CustomContextMenuComponent>;
  private clickListener!: () => void; // Listener para cliques fora do menu

  constructor(
    private injector: Injector,
    private editorService: EditorService,
    private renderer: Renderer2 // Renderer para lidar com eventos globais
  ) {}

  async ngAfterViewInit(): Promise<void> {
    try {
      // Inicializa o editor
      await this.editorService.initializeEditor(
        this.container.element.nativeElement,
        this.injector
      );

      // Cria e adiciona nós iniciais
      await this.addInitialNodes();

      // Organiza automaticamente os nós
      await this.editorService.autoArrangeNodes();
    } catch (error) {
      console.error('Erro ao inicializar o editor:', error);
    }
  }

  ngOnDestroy(): void {
    this.editorService.destroyEditor();
    // Remove o listener global ao destruir o componente
    if (this.clickListener) {
      this.clickListener();
    }
  }

  /**
   * Adiciona os nós iniciais ao editor e estabelece as conexões necessárias.
   */
  public async addInitialNodes(): Promise<void> {
    try {
      // 1. Criação dos nós
      const rootNode = new RuleNode('ruleNode');
      // 2. Adiciona os nós ao editor
      await this.editorService.addNode(rootNode);

      // 5. (Opcional) Autoarranjo dos nós para melhor visibilidade
      await this.editorService.autoArrangeNodes();
    } catch (error) {
      console.error('Erro ao adicionar ou conectar os nós iniciais:', error);
    }
  }

  openContextMenu(event: MouseEvent) {
    event.preventDefault();

    // Limpa menus contextuais abertos anteriormente
    this.container.clear();

    const items = [
      { label: 'Operator Node', icon: 'fa fa-database' },
      { label: 'Variable Node', icon: 'fa fa-code' },
      { label: 'Value Node', icon: 'fa fa-sitemap' },
      { label: 'Condition Node', icon: 'fa fa-magic' },
      { label: 'Regex Node', icon: 'fa fa-filter' },
      { label: 'Conuter Node', icon: 'fa fa-code-branch' },
      { label: 'Action Node', icon: 'fa fa-sync', isNew: true },
      { label: 'Command Node', icon: 'fa fa-reply' },
    ];

    // Criando o componente dinamicamente
    this.contextMenuRef = this.container.createComponent(
      CustomContextMenuComponent
    );

    // Configurando inputs do componente
    this.contextMenuRef.instance.items = items;
    this.contextMenuRef.instance.position = {
      x: event.clientX,
      y: event.clientY,
    };
    this.contextMenuRef.instance.title = 'Add block';

    // Adicionar listener para cliques fora do menu
    this.addOutsideClickListener();
  }
  private addOutsideClickListener() {
    // Remova listener anterior, se existir
    if (this.clickListener) {
      this.clickListener();
    }

    // Adicione novo listener
    this.clickListener = this.renderer.listen('document', 'click', (event: MouseEvent) => {
      if (
        this.contextMenuRef &&
        this.contextMenuRef.location.nativeElement &&
        !this.contextMenuRef.location.nativeElement.contains(event.target as Node)
      ) {
        this.closeContextMenu();
      }
    });
  }

  private closeContextMenu() {
    // Limpa o componente de menu contextual
    if (this.contextMenuRef) {
      this.contextMenuRef.destroy();
      this.contextMenuRef = null!;
    }

    // Remove o listener
    if (this.clickListener) {
      this.clickListener();
      this.clickListener = null!;
    }
  }
}
