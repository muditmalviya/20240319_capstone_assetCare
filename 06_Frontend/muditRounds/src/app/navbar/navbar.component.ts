import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  menuType: String = 'default';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      if (val instanceof NavigationEnd) {
        if (localStorage.getItem('token')) {
          console.log("User verified");
          this.menuType = 'verified';
        } else {
          console.log("User not verified");
          this.menuType = 'default';
        }
      }
    });
  }
  
  onLogoClick(){
    this.router.navigate(['/']);
  }
  onLoginClick() {
    this.router.navigate(['/login']);
  }

  onSignupClick() {
    this.router.navigate(['/signup']);
  }

  logout() {
    localStorage.removeItem('token'); // Clear user token
    this.router.navigate(['/login']); // Redirect to login page
  }
}
