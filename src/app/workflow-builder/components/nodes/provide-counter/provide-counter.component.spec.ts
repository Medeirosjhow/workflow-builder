import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvideCounterComponent } from './provide-counter.component';

describe('ProvideCounterComponent', () => {
  let component: ProvideCounterComponent;
  let fixture: ComponentFixture<ProvideCounterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProvideCounterComponent]
    });
    fixture = TestBed.createComponent(ProvideCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
