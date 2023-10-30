import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopActivitiesComponent } from './top-activities.component';

describe('TopActivitiesComponent', () => {
  let component: TopActivitiesComponent;
  let fixture: ComponentFixture<TopActivitiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopActivitiesComponent]
    });
    fixture = TestBed.createComponent(TopActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
