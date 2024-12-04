import { ClassicPreset } from 'rete';
import { BaseNode } from './base-node';

export class RuleNode extends BaseNode {
  formData = {
    id: '',
    name: '',
    channel: {
      id: '',
      name: '',
      descrition: '',
      estateId: '',
      creationDate: '',
      creatorId: '',
      updateDate: '',
      updateUserId: '',
    },
    description: '',
    status: '',
    version: '',
    priority: '',
    domain: {
      id: '',
      name: '',
      descrition: '',
      estateId: '',
      creationDate: '',
      creatorId: '',
      updateDate: '',
      updateUserId: '',
    },
  };

  constructor(type: string) {
    super('Root');
    this.type = type;

    // Output para condições
    this.addOutput(
      'output',
      new ClassicPreset.Output(
        new ClassicPreset.Socket('output-socket'),
        'output',
        true
      )
    );
  }
}
