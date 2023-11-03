import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginMinistryComponent } from './login-ministry.component';

describe('LoginMinistryComponent', () => {
  let component: LoginMinistryComponent;
  let fixture: ComponentFixture<LoginMinistryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginMinistryComponent]
    });
    fixture = TestBed.createComponent(LoginMinistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
