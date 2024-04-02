import { CommonModule } from '@angular/common'; // Importing CommonModule for NgIf, NgFor, etc.
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true, // Unsure of what standalone is meant for, typically not used here
  imports: [CommonModule], // Importing CommonModule
  templateUrl: './navbar.component.html', // Template URL for HTML file
  styleUrl: './navbar.component.css' // Style URL for CSS file
})
export class NavbarComponent implements OnInit {
  menuType: String = 'default'; // Variable to determine menu type (default/verified)

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Subscribe to router events to update menuType based on user verification
    this.router.events.subscribe((val: any) => {
      if (val instanceof NavigationEnd) {
        if (localStorage.getItem('token')) {
          console.log("User verified");
          this.menuType = 'verified'; // Set menuType to verified if user is logged in
        } else {
          console.log("User not verified");
          this.menuType = 'default'; // Set menuType to default if user is not logged in
        }
      }
    });
  }
  
  // Function to handle logo click
  onLogoClick() {
    this.router.navigate(['/']);
  }
  
  // Function to handle login click
  onLoginClick() {
    this.router.navigate(['/login']);
  }

  // Function to handle signup click
  onSignupClick() {
    this.router.navigate(['/signup']);
  }

  // Function to handle logout
  logout() {
    localStorage.removeItem('token'); // Clear user token from local storage
    this.router.navigate(['/login']); // Redirect to login page
  }
}
