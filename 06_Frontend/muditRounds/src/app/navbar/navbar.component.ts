import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private router: Router) {}
  onLoginClick() {
    // replace '/yourRoute' with the route you want to navigate to
    this.router.navigate(['/login']);
  }

  onSignupClick() {
    // replace '/yourRoute' with the route you want to navigate to
    this.router.navigate(['/signup']);
  }
}
