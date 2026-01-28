import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ex22Course } from './ex22-course';

describe('Ex22Course', () => {
  let component: Ex22Course;
  let fixture: ComponentFixture<Ex22Course>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Ex22Course]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ex22Course);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
