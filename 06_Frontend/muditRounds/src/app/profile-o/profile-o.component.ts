import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { User } from '../interface/request'; // Importing User interface from request file

@Component({
  selector: 'app-profile-o',
  standalone: true, // Not sure about the standalone property, typically not used here
  imports: [CommonModule, RouterLink], // Importing required modules
  templateUrl: './profile-o.component.html', // Template URL for HTML file
  styleUrls: ['./profile-o.component.css'] // Style URLs for CSS file
})
export class ProfileOComponent implements OnInit {
  user: User | null = null; // Initializing user object with User interface or null

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router : Router
  ) { }

  // Navigation handler for raising issue
  onRaiseIssueClick() {
    this.router.navigate(['/raiseIssue']);
  }

  // Navigation handler for viewing issue history
  onHistoryIssueClick() {
    this.router.navigate(['/historyIssue']);
  }

  ngOnInit() {
    this.fetchUser(); // Fetching user details on component initialization
  }

  // Function to fetch user profile
  fetchUser(): void {
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
