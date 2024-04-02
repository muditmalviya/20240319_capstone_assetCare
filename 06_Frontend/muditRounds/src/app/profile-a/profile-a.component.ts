import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { User } from '../interface/request'; // Importing User interface from request file

@Component({
  selector: 'app-profile-a',
  standalone: true, // Unsure of what standalone is meant for, typically not used here
  imports: [CommonModule, RouterLink], // Importing required modules
  templateUrl: './profile-a.component.html', // Template URL for HTML file
  styleUrls: ['./profile-a.component.css'] // Style URLs for CSS file
})
export class ProfileAComponent implements OnInit {
  user: User | null = null; // Initializing user object with User interface or null

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router : Router
  ) { }

  // Navigation handler for opened issue
  onOpenedIssueClick() {
    this.router.navigate(['/openedIssue']);
  }

  // Navigation handler for closed issue
  onClosedIssueClick() {
    this.router.navigate(['/closedIssue']);
  }

  ngOnInit() {
    this.fetchUser(); // Fetching user details on component initialization
  }

  // Function to fetch user profile
  fetchUser(): void {
    console.log('Fetching user...');
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      this.http.get<any>('http://localhost:3000/user/profile', { headers: headers })
        .subscribe((item: User) => {
          console.log('Profile fetched:', item);
          this.user = item; // Assigning fetched user profile
          // Additional processing if needed
        }, error => {
          console.error('Failed to fetch profile:', error);
        });
    } else {
      console.error('No token provided');
    }
  }
}
