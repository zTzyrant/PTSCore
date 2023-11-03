import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginMerchantFormComponent } from './login-merchant-form.component';

describe('LoginMerchantFormComponent', () => {
  let component: LoginMerchantFormComponent;
  let fixture: ComponentFixture<LoginMerchantFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginMerchantFormComponent]
    });
    fixture = TestBed.createComponent(LoginMerchantFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
