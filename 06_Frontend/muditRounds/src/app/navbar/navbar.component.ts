import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'; 

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  menuType: String = 'default'; // Variable to determine menu type (default/verified)

  constructor(private router: Router, private snackBar: MatSnackBar) {}

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
  analyze() {
    this.router.navigate(['/analyze']);
  }
  leaderboard(){
    this.router.navigate(['/leaderboard']);
  }
  // Function to handle logout
  logout() {
    localStorage.removeItem('token'); // Clear user token
    this.router.navigate(['/login']); // Redirect to login page
    this.snackBar.open('Logged Out!!', 'Close', { duration: 3000 });
  }
  // Function to handle back button click
  goBack() {
    const currentUrl = this.router.url;
  if (currentUrl === '/profile') {
    this.snackBar.open('Already on main Page', 'Close', { duration: 3000 });
  } else {
    this.router.navigate(['/profile']);
  }
  }

  // Function to check if the user is an admin
  isAdmin(): boolean {
    const userRole = localStorage.getItem('user');
    return userRole?.toLowerCase() === '"admin"';
  }
  
  
}
