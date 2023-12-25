import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAreaEditComponent } from './project-area-edit.component';

describe('ProjectAreaEditComponent', () => {
  let component: ProjectAreaEditComponent;
  let fixture: ComponentFixture<ProjectAreaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectAreaEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectAreaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
