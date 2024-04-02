import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importing CommonModule for NgIf, NgFor, etc.
import { RouterLink } from '@angular/router'; // Not required as it's used within templates directly
import { ActivatedRoute } from '@angular/router'; // ActivatedRoute is imported but not used
import { FormsModule } from '@angular/forms'; // Importing FormsModule for ngModel, etc.
import { forkJoin } from 'rxjs'; // Importing forkJoin for combining multiple observables

@Component({
  selector: 'app-assigned-tech',
  standalone: true, // Unsure of what standalone is meant for, typically not used here
  imports: [CommonModule, RouterLink, FormsModule], // Importing required modules
  templateUrl: './assigned-tech.component.html', // Template URL for HTML file
  styleUrl: './assigned-tech.component.css' // Style URL for CSS file
})
export class AssignedTechComponent implements OnInit {
  assignedIssues: any[] = []; // Array to store assigned issues

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute, // ActivatedRoute is imported but not used
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchAssigned(); // Fetch assigned issues when component initializes
  }

  fetchAssigned() {
    const token = localStorage.getItem('token'); // Retrieve token from local storage

    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Setting authorization header

      // Fetch assigned issues from API
      this.http.get<any[]>('http://localhost:3000/technician/assignedIssues', { headers: headers })
        .subscribe(
          (response) => {
            this.assignedIssues = response; // Assign fetched issues to the component's assignedIssues array
          },
          (error) => {
            console.error('Error fetching data:', error); // Log error if fetching data fails
          }
        );
    } else {
      console.error('No token provided'); // Log error if no token is found in local storage
    }
  }

  changeStatus(issueId: string) {
    const requestBody = {
      issue_id: issueId // Issue ID to be changed
    };

    const token = localStorage.getItem('token'); // Retrieve token from local storage
    if (!token) {
      console.error('No token provided'); // Log error if no token is found in local storage
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Setting authorization header

    // Change status of issue using PUT request to the API
    this.http.put<any>('http://localhost:3000/technician/changestatus', requestBody, { headers })
      .subscribe(
        (response) => {
          console.log('Issue assigned successfully:', response); // Log success message if issue is assigned successfully
          // You may want to update the UI or take further actions here
          window.location.reload(); // Reload the page to reflect changes
        },
        (error) => {
          console.error('Error assigning technician:', error); // Log error if assigning technician fails
          // Handle error scenario
        }
      );
  }
}
