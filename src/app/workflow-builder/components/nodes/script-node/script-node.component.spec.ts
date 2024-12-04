import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScriptNodeComponent } from './script-node.component';

describe('ScriptNodeComponent', () => {
  let component: ScriptNodeComponent;
  let fixture: ComponentFixture<ScriptNodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScriptNodeComponent]
    });
    fixture = TestBed.createComponent(ScriptNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
