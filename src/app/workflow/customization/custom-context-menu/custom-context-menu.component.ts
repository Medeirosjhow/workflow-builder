import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-context-menu',
  templateUrl: './custom-context-menu.component.html',
  styleUrls: ['./custom-context-menu.component.scss']
})
export class CustomContextMenuComponent {
  @Input() items: Array<{ label: string; icon: string; isNew?: boolean }> = [];
  @Input() position = { x: 0, y: 0 };
  @Input() title = 'Menu';

  @Output() itemSelected = new EventEmitter<string>();

  selectItem(item: any) {
    this.itemSelected.emit(item.label);
  }
}
