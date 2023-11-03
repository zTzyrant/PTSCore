import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripPlanComponent } from './trip-plan.component';

describe('TripPlanComponent', () => {
  let component: TripPlanComponent;
  let fixture: ComponentFixture<TripPlanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TripPlanComponent]
    });
    fixture = TestBed.createComponent(TripPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
