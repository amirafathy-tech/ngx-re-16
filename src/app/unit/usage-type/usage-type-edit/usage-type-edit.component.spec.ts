import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsageTypeEditComponent } from './usage-type-edit.component';

describe('UsageTypeEditComponent', () => {
  let component: UsageTypeEditComponent;
  let fixture: ComponentFixture<UsageTypeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsageTypeEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsageTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
