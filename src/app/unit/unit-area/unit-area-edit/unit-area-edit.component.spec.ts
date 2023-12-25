import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitAreaEditComponent } from './unit-area-edit.component';

describe('UnitAreaEditComponent', () => {
  let component: UnitAreaEditComponent;
  let fixture: ComponentFixture<UnitAreaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnitAreaEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnitAreaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
