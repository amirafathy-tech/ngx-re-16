import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitFloorComponent } from './unit-floor.component';

describe('UnitFloorComponent', () => {
  let component: UnitFloorComponent;
  let fixture: ComponentFixture<UnitFloorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnitFloorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnitFloorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
