import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitEditComponent } from './profit-edit.component';

describe('ProfitEditComponent', () => {
  let component: ProfitEditComponent;
  let fixture: ComponentFixture<ProfitEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfitEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfitEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
