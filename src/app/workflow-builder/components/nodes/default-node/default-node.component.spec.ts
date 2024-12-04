import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultNodeComponent } from './default-node.component';

describe('DefaultNodeComponent', () => {
  let component: DefaultNodeComponent;
  let fixture: ComponentFixture<DefaultNodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DefaultNodeComponent]
    });
    fixture = TestBed.createComponent(DefaultNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
