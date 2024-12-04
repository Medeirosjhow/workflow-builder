import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleNodeComponent } from './rule-node.component';

describe('RuleNodeComponent', () => {
  let component: RuleNodeComponent;
  let fixture: ComponentFixture<RuleNodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RuleNodeComponent]
    });
    fixture = TestBed.createComponent(RuleNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
