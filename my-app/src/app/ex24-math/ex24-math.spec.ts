import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ex24Math } from './ex24-math';

describe('Ex24Math', () => {
  let component: Ex24Math;
  let fixture: ComponentFixture<Ex24Math>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Ex24Math]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ex24Math);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
