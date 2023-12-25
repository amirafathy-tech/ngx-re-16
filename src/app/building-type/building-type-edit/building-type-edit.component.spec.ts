import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingTypeEditComponent } from './building-type-edit.component';

describe('BuildingTypeEditComponent', () => {
  let component: BuildingTypeEditComponent;
  let fixture: ComponentFixture<BuildingTypeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuildingTypeEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuildingTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
