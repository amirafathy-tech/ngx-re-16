import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitAreaComponent } from './unit-area.component';

describe('UnitAreaComponent', () => {
  let component: UnitAreaComponent;
  let fixture: ComponentFixture<UnitAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnitAreaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnitAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
