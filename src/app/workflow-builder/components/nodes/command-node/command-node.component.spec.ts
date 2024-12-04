import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandNodeComponent } from './command-node.component';

describe('CommandNodeComponent', () => {
  let component: CommandNodeComponent;
  let fixture: ComponentFixture<CommandNodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommandNodeComponent]
    });
    fixture = TestBed.createComponent(CommandNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
