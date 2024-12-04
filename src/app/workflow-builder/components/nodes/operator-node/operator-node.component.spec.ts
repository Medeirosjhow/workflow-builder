import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorNodeComponent } from './operator-node.component';

describe('OperatorNodeComponent', () => {
  let component: OperatorNodeComponent;
  let fixture: ComponentFixture<OperatorNodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OperatorNodeComponent]
    });
    fixture = TestBed.createComponent(OperatorNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
