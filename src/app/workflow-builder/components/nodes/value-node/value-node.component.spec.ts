import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueNodeComponent } from './value-node.component';

describe('ValueNodeComponent', () => {
  let component: ValueNodeComponent;
  let fixture: ComponentFixture<ValueNodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValueNodeComponent]
    });
    fixture = TestBed.createComponent(ValueNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
