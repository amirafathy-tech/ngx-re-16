import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MethodOfCalcComponent } from './method-of-calc.component';

describe('MethodOfCalcComponent', () => {
  let component: MethodOfCalcComponent;
  let fixture: ComponentFixture<MethodOfCalcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MethodOfCalcComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MethodOfCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
