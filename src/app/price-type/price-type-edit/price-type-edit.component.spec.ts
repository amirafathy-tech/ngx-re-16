import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceTypeEditComponent } from './price-type-edit.component';

describe('PriceTypeEditComponent', () => {
  let component: PriceTypeEditComponent;
  let fixture: ComponentFixture<PriceTypeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PriceTypeEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PriceTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
