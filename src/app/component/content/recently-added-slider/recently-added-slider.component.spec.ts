import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentlyAddedSliderComponent } from './recently-added-slider.component';

describe('RecentlyAddedSliderComponent', () => {
  let component: RecentlyAddedSliderComponent;
  let fixture: ComponentFixture<RecentlyAddedSliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecentlyAddedSliderComponent]
    });
    fixture = TestBed.createComponent(RecentlyAddedSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
