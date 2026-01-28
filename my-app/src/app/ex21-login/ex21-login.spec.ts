import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ex21Login } from './ex21-login';

describe('Ex21Login', () => {
  let component: Ex21Login;
  let fixture: ComponentFixture<Ex21Login>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Ex21Login]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ex21Login);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
