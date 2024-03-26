import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { RaiseIssueComponent } from './raise-issue/raise-issue.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HomepageComponent } from './homepage/homepage.component';
import { ProfileAComponent } from './profile-a/profile-a.component';
import { ProfileOComponent } from './profile-o/profile-o.component';
import { ProfileTComponent } from './profile-t/profile-t.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, LoginComponent, SignupComponent, ProfileComponent,
            RaiseIssueComponent, HttpClientModule, FormsModule, HomepageComponent, ProfileAComponent,
          ProfileOComponent, ProfileTComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
