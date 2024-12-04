import { ClassicPreset } from 'rete';

import { BaseNode } from './base-node';

export class ChangeCounter extends BaseNode {
  formData = {};

  constructor(type: string) {
    super('Root');
    this.type = type;

    this.addOutput(
      'output',
      new ClassicPreset.Output(
        new ClassicPreset.Socket('socket-otput'),
        undefined,
        true
      )
    );
  }
}
