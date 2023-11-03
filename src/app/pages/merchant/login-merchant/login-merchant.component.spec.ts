import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginMerchantComponent } from './login-merchant.component';

describe('LoginMerchantComponent', () => {
  let component: LoginMerchantComponent;
  let fixture: ComponentFixture<LoginMerchantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginMerchantComponent]
    });
    fixture = TestBed.createComponent(LoginMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
