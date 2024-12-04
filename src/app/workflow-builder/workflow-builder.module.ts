import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReteModule } from 'rete-angular-plugin/16';
import { EditorComponent } from './components/editor/editor.component';
import { ActionNodeComponent } from './components/nodes/action-node/action-node.component';
import { ChangeCounterComponent } from './components/nodes/change-counter/change-counter.component';
import { CommandNodeComponent } from './components/nodes/command-node/command-node.component';
import { ConditionNodeComponent } from './components/nodes/condition-node/condition-node.component';
import { OperatorNodeComponent } from './components/nodes/operator-node/operator-node.component';
import { ProvideCounterComponent } from './components/nodes/provide-counter/provide-counter.component';
import { RegexNodeComponent } from './components/nodes/regex-node/regex-node.component';
import { RuleNodeComponent } from './components/nodes/rule-node/rule-node.component';
import { ScriptNodeComponent } from './components/nodes/script-node/script-node.component';
import { ValueNodeComponent } from './components/nodes/value-node/value-node.component';
import { VariableNodeComponent } from './components/nodes/variable-node/variable-node.component';
import { CustomSocketComponent } from './components/custom-socket/custom-socket.component';
import { DefaultNodeComponent } from './components/nodes/default-node/default-node.component';
import { CustomContextMenuComponent } from './components/custom-context-menu/custom-context-menu.component';
import { ScopeComponent } from './components/nodes/scope/scope.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EditorComponent,
    ActionNodeComponent,
    ChangeCounterComponent,
    CommandNodeComponent,
    ConditionNodeComponent,
    OperatorNodeComponent,
    ProvideCounterComponent,
    RegexNodeComponent,
    RuleNodeComponent,
    ScriptNodeComponent,
    ValueNodeComponent,
    VariableNodeComponent,
    CustomSocketComponent,
    DefaultNodeComponent,
    CustomContextMenuComponent,
    ScopeComponent,
  ],
  imports: [CommonModule, ReteModule, FormsModule],
  exports: [EditorComponent],
})
export class WorkflowBuilderModule {}
