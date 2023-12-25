import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitOrientationComponent } from './unit-orientation.component';

describe('UnitOrientationComponent', () => {
  let component: UnitOrientationComponent;
  let fixture: ComponentFixture<UnitOrientationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnitOrientationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnitOrientationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
