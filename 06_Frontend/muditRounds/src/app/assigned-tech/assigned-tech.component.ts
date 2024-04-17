import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs'; 

@Component({
  selector: 'app-assigned-tech',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule], 
  templateUrl: './assigned-tech.component.html',
  styleUrl: './assigned-tech.component.css'
})
export class AssignedTechComponent implements OnInit {
  assignedIssues: any[] = []; // Array to store assigned issues

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchAssigned();
  }

  fetchAssigned() {
    const token = localStorage.getItem('token'); // Retrieve token from local storage

    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      // Fetch assigned issues from API
      this.http.get<any[]>('http://localhost:3000/technician/assignedIssues', { headers: headers })
        .subscribe(
          (response) => {
            this.assignedIssues = response; // Assign fetched issues to the component's assignedIssues array
          },
          (error) => {
            console.error('Error fetching data:', error);
          }
        );
    } else {
      console.error('No token provided');
    }
  }

  changeStatus(issueId: string) {
    const requestBody = {
      issue_id: issueId // Issue ID to be changed
    };

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token provided');
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Change status of issue using PUT request to the API
    this.http.put<any>('http://localhost:3000/technician/changestatus', requestBody, { headers })
      .subscribe(
        (response) => {
          console.log('Issue assigned successfully:', response);
          window.location.reload(); //for page reload
        },
        (error) => {
          console.error('Error assigning technician:', error); 
        }
      );
  }
}
