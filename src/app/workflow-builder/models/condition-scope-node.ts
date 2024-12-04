import { ClassicPreset } from 'rete';

import { BaseNode } from './base-node';

export class ConditionScopeNode extends BaseNode {
  constructor(type: string) {
    super('conditions');
    this.type = type;

    this.addInput(
      'conditions',
      new ClassicPreset.Input(
        new ClassicPreset.Socket('condition')
      )
    );
  }
}
