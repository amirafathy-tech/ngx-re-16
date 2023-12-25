import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitOrientationEditComponent } from './unit-orientation-edit.component';

describe('UnitOrientationEditComponent', () => {
  let component: UnitOrientationEditComponent;
  let fixture: ComponentFixture<UnitOrientationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnitOrientationEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnitOrientationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
