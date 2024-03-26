import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileOComponent } from './profile-o.component';

describe('ProfileOComponent', () => {
  let component: ProfileOComponent;
  let fixture: ComponentFixture<ProfileOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileOComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
