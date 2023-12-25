import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingAreaComponent } from './building-area.component';

describe('BuildingAreaComponent', () => {
  let component: BuildingAreaComponent;
  let fixture: ComponentFixture<BuildingAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuildingAreaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuildingAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
