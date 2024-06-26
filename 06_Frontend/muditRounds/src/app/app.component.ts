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
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenIssueAComponent } from './open-issue-a/open-issue-a.component';
import { HistoryOperatorComponent } from './history-operator/history-operator.component';
import { HistoryTechnicianComponent } from './history-technician/history-technician.component';
import { AssignedTechComponent } from './assigned-tech/assigned-tech.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { MychartComponent } from './mychart/mychart.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, LoginComponent, SignupComponent, ProfileComponent,
            RaiseIssueComponent, HttpClientModule, FormsModule, HomepageComponent, CommonModule, HistoryOperatorComponent, HistoryTechnicianComponent,
        AssignedTechComponent, ProfileInfoComponent, MychartComponent, LeaderboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
