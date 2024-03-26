import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseIssueAComponent } from './close-issue-a.component';

describe('CloseIssueAComponent', () => {
  let component: CloseIssueAComponent;
  let fixture: ComponentFixture<CloseIssueAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CloseIssueAComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CloseIssueAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
