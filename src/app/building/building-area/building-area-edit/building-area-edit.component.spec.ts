import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingAreaEditComponent } from './building-area-edit.component';

describe('BuildingAreaEditComponent', () => {
  let component: BuildingAreaEditComponent;
  let fixture: ComponentFixture<BuildingAreaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuildingAreaEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuildingAreaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
