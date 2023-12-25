import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MethodOfCalcEditComponent } from './method-of-calc-edit.component';

describe('MethodOfCalcEditComponent', () => {
  let component: MethodOfCalcEditComponent;
  let fixture: ComponentFixture<MethodOfCalcEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MethodOfCalcEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MethodOfCalcEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
