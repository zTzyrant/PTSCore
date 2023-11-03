import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginMinistryFormComponent } from './login-ministry-form.component';

describe('LoginMinistryFormComponent', () => {
  let component: LoginMinistryFormComponent;
  let fixture: ComponentFixture<LoginMinistryFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginMinistryFormComponent]
    });
    fixture = TestBed.createComponent(LoginMinistryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
