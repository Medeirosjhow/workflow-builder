import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  variables = ['Idade', 'Salário', 'Nome', 'Status'];
  operators = ['==', '!=', '>', '<', '>=', '<='];
  currentCondition = {
    variable: '',
    operator: '',
    compareType: 'value',
    compareValue: '',
  };
  conditions: {
    variable: string;
    operator: string;
    compareType: string;
    compareValue: string;
  }[] = [];
  regexValid = true;
  testInput = '';
  matches: string[] = [];

  validateRegex(regex: string) {
    try {
      new RegExp(regex);
      this.regexValid = true;
      this.testRegex();
    } catch {
      this.regexValid = false;
      this.matches = [];
    }
  }

  testRegex() {
    if (!this.regexValid || !this.testInput || !this.currentCondition.compareValue) {
      this.matches = [];
      return;
    }
    const regex = new RegExp(this.currentCondition.compareValue, 'g');
    this.matches = Array.from(this.testInput.match(regex) || []);
  }

  addCondition() {
    if (this.isConditionValid()) {
      this.conditions.push({ ...this.currentCondition });
      this.resetCurrentCondition();
    }
  }

  removeCondition(condition: any) {
    this.conditions = this.conditions.filter((c) => c !== condition);
  }

  saveConditions() {
    console.log('Condições salvas:', this.conditions);
  }

  resetConditions() {
    this.conditions = [];
    this.resetCurrentCondition();
  }

  resetCurrentCondition() {
    this.currentCondition = { variable: '', operator: '', compareType: 'value', compareValue: '' };
    this.regexValid = true;
    this.testInput = '';
    this.matches = [];
  }

  isConditionValid() {
    return this.currentCondition.variable && this.currentCondition.operator &&
      (this.currentCondition.compareType !== 'regex' || this.regexValid);
  }
}
