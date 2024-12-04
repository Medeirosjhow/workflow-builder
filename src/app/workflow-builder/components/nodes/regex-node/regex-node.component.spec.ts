import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegexNodeComponent } from './regex-node.component';

describe('RegexNodeComponent', () => {
  let component: RegexNodeComponent;
  let fixture: ComponentFixture<RegexNodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegexNodeComponent]
    });
    fixture = TestBed.createComponent(RegexNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
