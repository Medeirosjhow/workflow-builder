import { ClassicPreset } from "rete";

export class BaseNode extends ClassicPreset.Node {
  width = 0;
  height = 0;
  isCollapsed = false;
  type!: string;
  parent?: string;

  constructor(label: string){
    super(label);
  }
  getInputs(): string[]{
    return Object.keys(this.inputs);
  }

  getOutputs(): string[]{
    return Object.keys(this.outputs);
  }
}
