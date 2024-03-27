import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryOperatorComponent } from './history-operator.component';

describe('HistoryOperatorComponent', () => {
  let component: HistoryOperatorComponent;
  let fixture: ComponentFixture<HistoryOperatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryOperatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoryOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
