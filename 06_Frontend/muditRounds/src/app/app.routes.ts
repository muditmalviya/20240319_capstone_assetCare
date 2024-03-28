import { Routes } from '@angular/router';
import { ProfileAComponent } from './profile-a/profile-a.component';
import { ProfileOComponent } from './profile-o/profile-o.component';
import { ProfileTComponent } from './profile-t/profile-t.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RaiseIssueComponent } from './raise-issue/raise-issue.component';
import { OpenIssueAComponent } from './open-issue-a/open-issue-a.component';
import { CloseIssueAComponent } from './close-issue-a/close-issue-a.component';
import { HistoryTechnicianComponent } from './history-technician/history-technician.component';
import { AssignedTechComponent } from './assigned-tech/assigned-tech.component';
import { HistoryOperatorComponent } from './history-operator/history-operator.component';


export const routes: Routes = [
    { path: '', component: HomepageComponent },
    { path: 'login', component: LoginComponent},
    { path: 'signup', component: SignupComponent},
    { path: 'operatorPage', component: ProfileOComponent},
    { path: 'adminPage', component: ProfileAComponent},
    { path: 'technicianPage', component: ProfileTComponent},
    { path: 'raiseIssue', component: RaiseIssueComponent},
    { path: 'openedIssue', component: OpenIssueAComponent},
    { path: 'closedIssue', component: CloseIssueAComponent},
    { path: 'assignedTech', component:AssignedTechComponent},
    { path: 'historyIssueTech', component:HistoryTechnicianComponent},
    {path: 'historyIssue', component: HistoryOperatorComponent}
];
