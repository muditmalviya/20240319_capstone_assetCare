import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryTechnicianComponent } from './history-technician.component';

describe('HistoryTechnicianComponent', () => {
  let component: HistoryTechnicianComponent;
  let fixture: ComponentFixture<HistoryTechnicianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryTechnicianComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoryTechnicianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
