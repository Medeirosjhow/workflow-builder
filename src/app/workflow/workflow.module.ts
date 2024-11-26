import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor/editor.component';
import { CustomNodeComponent } from './customization/custom-node/custom-node.component';
import { CustomConnectionComponent } from './customization/custom-connection/custom-connection.component';
import { CustomSocketComponent } from './customization/custom-socket/custom-socket.component';
import { ReteModule } from 'rete-angular-plugin/16';
import { CustomContextMenuComponent } from './customization/custom-context-menu/custom-context-menu.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EditorComponent,
    CustomNodeComponent,
    CustomConnectionComponent,
    CustomSocketComponent,
    CustomContextMenuComponent
  ],
  imports: [
    CommonModule,
    ReteModule,
    ReactiveFormsModule
  ],
  exports: [
    EditorComponent,
    CustomNodeComponent,
    CustomConnectionComponent,
    CustomSocketComponent,
  ],
})
export class WorkflowModule { }
