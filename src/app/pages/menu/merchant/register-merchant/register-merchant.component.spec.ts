import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterMerchantComponent } from './register-merchant.component';

describe('RegisterMerchantComponent', () => {
  let component: RegisterMerchantComponent;
  let fixture: ComponentFixture<RegisterMerchantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterMerchantComponent]
    });
    fixture = TestBed.createComponent(RegisterMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
