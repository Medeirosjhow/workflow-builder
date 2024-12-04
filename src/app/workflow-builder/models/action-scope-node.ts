import { ClassicPreset } from 'rete';

import { BaseNode } from './base-node';

export class ActionScopeNode extends BaseNode{

  constructor(type: string) {
    super('actions');
    this.type = type;

    this.addInput(
      'actions',
      new ClassicPreset.Input(
        new ClassicPreset.Socket('action')
      )
    );
  }
}
