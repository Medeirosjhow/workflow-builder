import { ChangeDetectorRef, Component, HostBinding, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-custom-socket',
  template: ``,
  styleUrls: ['./custom-socket.component.scss'],
  standalone: false
})
export class CustomSocketComponent implements OnChanges {
  @Input() data!: any;
  @Input() rendered!: any;


  constructor(private cdr: ChangeDetectorRef) {
    this.cdr.detach();
  }

  ngOnChanges(): void {

    this.cdr.detectChanges();
    requestAnimationFrame(() => this.rendered());
  }
}
