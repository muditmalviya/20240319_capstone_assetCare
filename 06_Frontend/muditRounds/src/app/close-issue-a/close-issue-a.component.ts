import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importing CommonModule for NgIf, NgFor, etc.
import { RouterLink } from '@angular/router'; // Not required as it's used within templates directly
import { ActivatedRoute } from '@angular/router'; // ActivatedRoute is imported but not used
import { FormsModule } from '@angular/forms'; // Importing FormsModule for ngModel, etc.
import { forkJoin } from 'rxjs'; // Importing forkJoin for combining multiple observables

@Component({
  selector: 'app-close-issue-a',
  standalone: true, // Unsure of what standalone is meant for, typically not used here
  imports: [CommonModule, RouterLink], // Importing required modules
  templateUrl: './close-issue-a.component.html', // Template URL for HTML file
  styleUrl: './close-issue-a.component.css' // Style URL for CSS file
})
export class CloseIssueAComponent {
  closes: any[] = []; // Array to store closed issues

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute, // ActivatedRoute is imported but not used
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchClosed(); // Fetch closed issues when component initializes
  }

  fetchClosed() {
    const token = localStorage.getItem('token'); // Retrieve token from local storage

    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Setting authorization header

      // Fetch closed issues from API
      this.http.get<any[]>('http://localhost:3000/admin/close', { headers: headers })
        .subscribe(
          (response) => {
            this.closes = response; // Assign fetched issues to the component's closes array
          },
          (error) => {
            console.error('Error fetching data:', error); // Log error if fetching data fails
          }
        );
    } else {
      console.error('No token provided'); // Log error if no token is found in local storage
    }
  }
}
