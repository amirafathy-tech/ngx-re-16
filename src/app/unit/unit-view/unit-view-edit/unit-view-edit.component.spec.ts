import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitViewEditComponent } from './unit-view-edit.component';

describe('UnitViewEditComponent', () => {
  let component: UnitViewEditComponent;
  let fixture: ComponentFixture<UnitViewEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnitViewEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnitViewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
