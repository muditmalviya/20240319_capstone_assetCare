import { Routes } from '@angular/router';
import { ProfileAComponent } from './profile-a/profile-a.component';
import { ProfileOComponent } from './profile-o/profile-o.component';
import { ProfileTComponent } from './profile-t/profile-t.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';


export const routes: Routes = [
    { path: '', component: HomepageComponent },
    { path: 'login', component: LoginComponent},
    { path: 'signup', component: SignupComponent},
    { path: 'operatorPage', component: ProfileOComponent},
    { path: 'adminPage', component: ProfileAComponent},
    { path: 'technicianPage', component: ProfileTComponent}
];
