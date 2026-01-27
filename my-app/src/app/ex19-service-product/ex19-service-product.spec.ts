import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ex19ServiceProduct } from './ex19-service-product';

describe('Ex19ServiceProduct', () => {
  let component: Ex19ServiceProduct;
  let fixture: ComponentFixture<Ex19ServiceProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Ex19ServiceProduct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ex19ServiceProduct);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
