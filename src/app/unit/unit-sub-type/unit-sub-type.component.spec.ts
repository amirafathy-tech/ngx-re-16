import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitSubTypeComponent } from './unit-sub-type.component';

describe('UnitSubTypeComponent', () => {
  let component: UnitSubTypeComponent;
  let fixture: ComponentFixture<UnitSubTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnitSubTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnitSubTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
