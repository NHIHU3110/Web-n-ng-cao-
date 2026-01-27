import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ex19Product } from './ex19-product';

describe('Ex19Product', () => {
  let component: Ex19Product;
  let fixture: ComponentFixture<Ex19Product>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Ex19Product]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ex19Product);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
