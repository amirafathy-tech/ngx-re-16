import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitFixtureEditComponent } from './unit-fixture-edit.component';

describe('UnitFixtureEditComponent', () => {
  let component: UnitFixtureEditComponent;
  let fixture: ComponentFixture<UnitFixtureEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnitFixtureEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnitFixtureEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
