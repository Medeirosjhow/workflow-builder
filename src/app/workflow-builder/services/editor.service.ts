import { Injectable, Injector } from '@angular/core';
import { ClassicPreset as Classic, GetSchemes, NodeEditor } from 'rete';
import { AngularArea2D, AngularPlugin, Presets as AngularPresets } from 'rete-angular-plugin/16';
import { Area2D, AreaExtensions, AreaPlugin } from 'rete-area-plugin';
import { AutoArrangePlugin, Presets as ArrangePresets } from 'rete-auto-arrange-plugin';
import { ConnectionPlugin, Presets as ConnectionPresets } from 'rete-connection-plugin';
import { RerouteExtra, ReroutePlugin } from 'rete-connection-reroute-plugin';
import { ContextMenuExtra, ContextMenuPlugin, Presets as ContextMenuPresets } from 'rete-context-menu-plugin';
import { MinimapExtra, MinimapPlugin } from 'rete-minimap-plugin';

import { CustomConnectionComponent } from '../components/custom-connection/custom-connection.component';
import { CustomSocketComponent } from '../components/custom-socket/custom-socket.component';
import { ActionNodeComponent } from '../components/nodes/action-node/action-node.component';
import { ChangeCounterComponent } from '../components/nodes/change-counter/change-counter.component';
import { CommandNodeComponent } from '../components/nodes/command-node/command-node.component';
import { ConditionNodeComponent } from '../components/nodes/condition-node/condition-node.component';
import { DefaultNodeComponent } from '../components/nodes/default-node/default-node.component';
import { OperatorNodeComponent } from '../components/nodes/operator-node/operator-node.component';
import { ProvideCounterComponent } from '../components/nodes/provide-counter/provide-counter.component';
import { RegexNodeComponent } from '../components/nodes/regex-node/regex-node.component';
import { RuleNodeComponent } from '../components/nodes/rule-node/rule-node.component';
import { ScriptNodeComponent } from '../components/nodes/script-node/script-node.component';
import { ValueNodeComponent } from '../components/nodes/value-node/value-node.component';
import { VariableNodeComponent } from '../components/nodes/variable-node/variable-node.component';
import { RuleNode } from '../models/rule-node';
import { ScopeComponent } from '../components/nodes/scope/scope.component';
import { Node } from 'rete/_types/presets/classic';

// Define os tipos de nós e conexões que serão usados no editor
type Schemes = GetSchemes<RuleNode, Conn>;
type Conn = Connection<RuleNode, RuleNode>;

type AreaExtra =
  | Area2D<Schemes>
  | AngularArea2D<Schemes>
  | ContextMenuExtra
  | MinimapExtra
  | RerouteExtra;

// Define a classe de conexão personalizada entre os nós
class Connection<
  A extends RuleNode,
  B extends RuleNode
> extends Classic.Connection<A, B> {}

@Injectable({
  providedIn: 'root',
})
export class EditorService {
  private editor!: NodeEditor<Schemes>;
  private area!: AreaPlugin<Schemes, AreaExtra>;
  private connection!: ConnectionPlugin<Schemes, AreaExtra>;
  private angularRender!: AngularPlugin<Schemes, AreaExtra>;
  private minimap!: MinimapPlugin<Schemes>;
  private reroutePlugin!: ReroutePlugin<Schemes>;
  private arrange!: AutoArrangePlugin<Schemes>;

  constructor() {}

  /**
   * Inicializa o editor de nós com os plugins configurados.
   * @param container Elemento HTML onde o editor será renderizado.
   * @param injector Injetor Angular necessário para o Angular Plugin.
   */
  async initializeEditor(
    container: HTMLElement,
    injector: Injector
  ): Promise<void> {
    // Configura os componentes principais do editor
    this.editor = new NodeEditor<Schemes>();
    this.area = new AreaPlugin<Schemes, AreaExtra>(container);
    this.connection = new ConnectionPlugin<Schemes, AreaExtra>();
    this.angularRender = new AngularPlugin<Schemes, AreaExtra>({ injector });
    this.minimap = new MinimapPlugin<Schemes>();
    this.reroutePlugin = new ReroutePlugin<Schemes>();
    this.arrange = new AutoArrangePlugin<Schemes>();

    // Ativa os plugins no editor
    this.editor.use(this.area);
    this.area.use(this.angularRender);
    this.area.use(this.connection);
    this.area.use(this.minimap);
    this.area.use(this.arrange);
    this.angularRender.use(this.reroutePlugin);

    // Configura os presets para os plugins
    this.configurePlugins();
  }

  /**
   * Configura os presets para os plugins registrados.
   */
  private configurePlugins(): void {
    // Preset de conexões
    this.connection.addPreset(ConnectionPresets.classic.setup());

    // Preset de renderização Angular
    this.angularRender.addPreset(
      AngularPresets.classic.setup({
        customize: {
          node(node: any) {
            // Alterei de 'unknown' para 'any' para facilitar o acesso à propriedade 'type'

            switch (node.payload.type) {
              case 'actionNode':
                return ActionNodeComponent;
              case 'changeCounterNode':
                return ChangeCounterComponent;
              case 'commandNode':
                return CommandNodeComponent;
              case 'conditionNode':
                return ConditionNodeComponent;
              case 'operatorNode':
                return OperatorNodeComponent;
              case 'provideCounterNode':
                return ProvideCounterComponent;
              case 'regexNode':
                return RegexNodeComponent;
              case 'ruleNode':
                return RuleNodeComponent;
              case 'scriptNode':
                return ScriptNodeComponent;
              case 'valueNode':
                return ValueNodeComponent;
              case 'variableNode':
                return VariableNodeComponent;
              default:
                return DefaultNodeComponent; // Opcional: Retorna um componente padrão para tipos não mapeados
            }
          },
          connection() {
            return CustomConnectionComponent;
          },
          socket() {
            return CustomSocketComponent;
          },
        },
      })
    );
    this.angularRender.addPreset(AngularPresets.minimap.setup());
    this.angularRender.addPreset(
      AngularPresets.reroute.setup({
        contextMenu: (id) => {
          this.reroutePlugin.remove(id);
        },
        translate: (id, dx, dy) => {
          this.reroutePlugin.translate(id, dx, dy);
        },
        pointerdown: (id) => {
          this.reroutePlugin.unselect(id);
          this.reroutePlugin.select(id);
        },
      })
    );

    // Preset de autoarranjo
    this.arrange.addPreset(ArrangePresets.classic.setup());
  }

  /**
   * Organiza automaticamente os nós no editor.
   */
  async autoArrangeNodes(): Promise<void> {
    // Realiza o layout automático
    await this.arrange.layout();

    // Ajusta o zoom para que todos os nós fiquem visíveis
    AreaExtensions.zoomAt(this.area, this.editor.getNodes());
  }

  /**
   * Adiciona um novo nó ao editor.
   * @param node Nó a ser adicionado.
   */
  async addNode(node: any): Promise<void> {
    await this.editor.addNode(node);
  }

  /**
   * Adiciona uma conexão entre dois nós.
   * @param from Nó de origem.
   * @param fromOutput Saída do nó de origem.
   * @param to Nó de destino.
   * @param toInput Entrada do nó de destino.
   */
  async addConnection(
    from: any,
    fromOutput: string,
    to: any,
    toInput: string
  ): Promise<void> {
    const connection = new Connection(from, fromOutput, to, toInput);
    await this.editor.addConnection(connection);
  }

  /**
   * Remove um nó do editor.
   * @param node Nó a ser removido.
   */
  async removeNode(node: RuleNode): Promise<void> {
    this.editor.removeNode(node.id);
  }

  /**
   * Destrói o editor e seus plugins associados.
   */
  destroyEditor(): void {
    if (this.area) {
      this.area.destroy();
    }
  }

  /**
   * Retorna a instância do editor para interações avançadas.
   * @returns Instância do NodeEditor.
   */
  getEditor(): NodeEditor<Schemes> {
    return this.editor;
  }
}
