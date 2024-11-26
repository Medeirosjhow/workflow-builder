import {
  Component,
  Input,
  HostBinding,
  ChangeDetectorRef,
  OnChanges
} from "@angular/core";

@Component({
  template: ``,
  styleUrls: ["./custom-socket.component.scss"]
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
