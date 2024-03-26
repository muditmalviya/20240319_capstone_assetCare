import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenIssueAComponent } from './open-issue-a.component';

describe('OpenIssueAComponent', () => {
  let component: OpenIssueAComponent;
  let fixture: ComponentFixture<OpenIssueAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenIssueAComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OpenIssueAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
