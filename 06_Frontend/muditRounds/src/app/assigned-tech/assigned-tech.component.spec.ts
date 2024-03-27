import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedTechComponent } from './assigned-tech.component';

describe('AssignedTechComponent', () => {
  let component: AssignedTechComponent;
  let fixture: ComponentFixture<AssignedTechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignedTechComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignedTechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
