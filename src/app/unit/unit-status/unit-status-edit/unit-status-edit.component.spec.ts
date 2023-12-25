import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitStatusEditComponent } from './unit-status-edit.component';

describe('UnitStatusEditComponent', () => {
  let component: UnitStatusEditComponent;
  let fixture: ComponentFixture<UnitStatusEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnitStatusEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnitStatusEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
