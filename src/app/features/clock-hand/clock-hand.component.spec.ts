import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockHandComponent } from './clock-hand.component';

describe('ClockHandComponent', () => {
  let component: ClockHandComponent;
  let fixture: ComponentFixture<ClockHandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClockHandComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClockHandComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
