import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitSubTypeEditComponent } from './unit-sub-type-edit.component';

describe('UnitSubTypeEditComponent', () => {
  let component: UnitSubTypeEditComponent;
  let fixture: ComponentFixture<UnitSubTypeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnitSubTypeEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnitSubTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
