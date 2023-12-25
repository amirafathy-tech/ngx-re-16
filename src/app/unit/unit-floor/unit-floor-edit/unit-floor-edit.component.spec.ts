import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitFloorEditComponent } from './unit-floor-edit.component';

describe('UnitFloorEditComponent', () => {
  let component: UnitFloorEditComponent;
  let fixture: ComponentFixture<UnitFloorEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnitFloorEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnitFloorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
