import {
  AfterViewInit,
  Component,
  ComponentRef,
  ElementRef,
  Injector,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {
  ClassicPreset as Classic,
  ClassicPreset,
  GetSchemes,
  NodeEditor,
} from 'rete';
import {
  AngularArea2D,
  AngularPlugin,
  Presets as AngularPresets,
} from 'rete-angular-plugin/16';
import { Area2D, AreaExtensions, AreaPlugin } from 'rete-area-plugin';
import {
  ConnectionPlugin,
  Presets as ConnectionPresets,
} from 'rete-connection-plugin';
import { RerouteExtra, ReroutePlugin } from 'rete-connection-reroute-plugin';
import {
  ContextMenuExtra,
  ContextMenuPlugin,
  Presets,
} from 'rete-context-menu-plugin';
import { MinimapExtra, MinimapPlugin } from 'rete-minimap-plugin';

import { CustomNodeComponent } from '../customization/custom-node/custom-node.component';
import { CustomSocketComponent } from '../customization/custom-socket/custom-socket.component';
import { CustomContextMenuComponent } from '../customization/custom-context-menu/custom-context-menu.component';

type Schemes = GetSchemes<
  Node,
  ClassicPreset.Connection<ClassicPreset.Node, ClassicPreset.Node>
>;
type AreaExtra =
  | Area2D<Schemes>
  | AngularArea2D<Schemes>
  | ContextMenuExtra
  | MinimapExtra
  | RerouteExtra;

type Conn = Connection<Node, Node>;

class Connection<
  A extends Node,
  B extends Node
> extends ClassicPreset.Connection<A, B> {}

export class Node extends ClassicPreset.Node {
  width: number = 384;
  height: number = 400;
  isCollapsed: boolean = false;

  constructor(label: string) {
    super(label);
    this.addOutput(
      'b',
      new ClassicPreset.Output(new ClassicPreset.Socket('b'))
    );
    this.addInput('a', new ClassicPreset.Input(new ClassicPreset.Socket('a')));
  }
}

@Component({
  selector: 'app-rete-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements AfterViewInit, OnDestroy {
  @ViewChild('container', { static: true, read: ViewContainerRef })
  containerRef!: ViewContainerRef;

  private contextMenuRef!: ComponentRef<CustomContextMenuComponent>;

  zoomPercentage: number = 100; // Zoom inicial em %
  zoomInEnabled = true;
  zoomOutEnabled = true;

  private editor!: NodeEditor<Schemes>;
  private area!: AreaPlugin<Schemes, AreaExtra>;

  constructor(private injector: Injector) {}

  async ngAfterViewInit() {
    // Configuração inicial do editor
    const container = this.containerRef.element.nativeElement;  // Acessando o elemento HTML corretamente
    this.editor = new NodeEditor<Schemes>();
    this.area = new AreaPlugin<Schemes, AreaExtra>(container);
    const connectionPlugin = new ConnectionPlugin<Schemes, AreaExtra>();
    const minimap = new MinimapPlugin<Schemes>();
    const reroutePlugin = new ReroutePlugin<Schemes>();
    const angularRender = new AngularPlugin<Schemes, AreaExtra>({
      injector: this.injector,
    });
    const contextMenu = new ContextMenuPlugin<Schemes>({
      items: Presets.classic.setup([
        ['Operator', () => new Node('Operator')],
        ['Variable', () => new Node('Variable')],
        ['Condition', () => new Node('Condition')],
        ['Counter', () => new Node('Counter')],
        ['regex', () => new Node('Regex')],
        ['Value', () => new Node('Value')],
      ]),
    });

    // Use os plugins
    this.editor.use(this.area);
    this.area.use(angularRender);
    this.area.use(connectionPlugin);
    this.area.use(minimap);
    angularRender.use(reroutePlugin);

    // Configuração dos presets
    connectionPlugin.addPreset(ConnectionPresets.classic.setup());
    angularRender.addPreset(
      AngularPresets.classic.setup({
        customize: {
          node() {
            return CustomNodeComponent;
          },
          socket() {
            return CustomSocketComponent;
          },
        },
      })
    );

    angularRender.addPreset(AngularPresets.contextMenu.setup());
    angularRender.addPreset(AngularPresets.minimap.setup());
    angularRender.addPreset(
      AngularPresets.reroute.setup({
        contextMenu(id) {
          reroutePlugin.remove(id);
        },
        translate(id, dx, dy) {
          reroutePlugin.translate(id, dx, dy);
        },
        pointerdown(id) {
          reroutePlugin.unselect(id);
          reroutePlugin.select(id);
        },
      })
    );
  }

  ngOnDestroy() {
    // Limpa o editor para evitar vazamentos de memória
    if (this.editor) {
      this.editor.clear();
    }
  }

  checkZoomLimits() {
    if (this.area) {
      const zoomLevel = this.area.area.transform.k;

      // Atualiza o percentual de zoom
      this.zoomPercentage = Math.round(zoomLevel * 100);

      // Limites de Zoom
      this.zoomInEnabled = zoomLevel < 1; // Habilita Zoom In se menor que 100%
      this.zoomOutEnabled = zoomLevel > 0.5; // Habilita Zoom Out se maior que 50%
    }
  }
  zoomIn() {
    if (this.area) {
      const currentZoom = this.area.area.transform.k;
      const newZoom = Math.min(currentZoom + 0.05, 1); // Incrementa o zoom com passos menores
      console.log('new Zoom in', newZoom);

      this.area.area.zoom(newZoom);
      this.updateZoom(); // Atualiza estado e percentual
    }
  }

  zoomOut() {
    if (this.area) {
      const currentZoom = this.area.area.transform.k;
      const newZoom = Math.max(currentZoom - 0.05, 0.5); // Decrementa o zoom com passos menores
      console.log('new Zoom out', newZoom);
      this.area.area.zoom(newZoom);
      this.updateZoom(); // Atualiza estado e percentual
    }
  }

  zoomTo100() {
    if (this.area) {
      this.area.area.zoom(1); // Define o zoom para 100%
      this.updateZoom(); // Atualiza estado e percentual
    }
  }

  fitView() {
    if (this.area && this.editor) {
      const nodes = this.editor.getNodes();
      if (nodes.length > 0) {
        AreaExtensions.zoomAt(this.area, nodes); // Ajusta o zoom para exibir todos os nós
        this.updateZoom(); // Atualiza estado e percentual após o ajuste
      }
    }
  }

  updateZoom() {
    if (this.area) {
      const zoomLevel = this.area.area.transform.k;

      // Atualiza o percentual de zoom e os limites dos botões
      this.zoomPercentage = Math.round(zoomLevel * 100);
      this.zoomInEnabled = zoomLevel < 1; // Habilita Zoom In se menor que 100%
      this.zoomOutEnabled = zoomLevel > 0.5; // Habilita Zoom Out se maior que 50%
    }
  }

  openContextMenu(event: MouseEvent) {
    event.preventDefault();

    // Limpa menus contextuais abertos anteriormente
    this.containerRef.clear();

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
    this.contextMenuRef = this.containerRef.createComponent(CustomContextMenuComponent);

    // Configurando inputs do componente
    this.contextMenuRef.instance.items = items;
    this.contextMenuRef.instance.position = { x: event.clientX, y: event.clientY };
    this.contextMenuRef.instance.title = 'Add block';

    // Lidar com seleção de itens
    this.contextMenuRef.instance.itemSelected.subscribe((selectedItem: string) => {
      this.editor.addNode(new Node(selectedItem));
      this.closeContextMenu();
    });
  }

  closeContextMenu() {
    if (this.contextMenuRef) {
      this.contextMenuRef.destroy();
    }
  }

}
