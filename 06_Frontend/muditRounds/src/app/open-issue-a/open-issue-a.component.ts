import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-open-issue-a',
  standalone: true, // Unsure of what standalone is meant for, typically not used here
  imports: [CommonModule, RouterLink, FormsModule], // Importing required modules
  templateUrl: './open-issue-a.component.html', // Template URL for HTML file
  styleUrls: ['./open-issue-a.component.css'] // Style URLs for CSS file
})
export class OpenIssueAComponent implements OnInit {
  availtechs: any[] = []; // Array to store available technicians
  issues: any[] = []; // Array to store open issues

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router : Router
  ) { }

  ngOnInit(): void {
    // Fetch available technicians and open issues on component initialization
    this.fetchAvailTech();
    this.fetchData();
  }

  // Function to fetch available technicians
  fetchAvailTech() {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      this.http.get<any[]>('http://localhost:3000/admin/availtech', { headers: headers })
        .subscribe(
          (response) => {
            this.availtechs = response;
          },
          (error) => {
            console.error('Error fetching data:', error);
          }
        );
    } else {
      console.error('No token provided');
    }
  }

  // Function to fetch open issues
  fetchData() {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      this.http.get<any[]>('http://localhost:3000/admin/open', { headers: headers })
        .subscribe(
          (response) => {
            this.issues = response;
          },
          (error) => {
            console.error('Error fetching data:', error);
          }
        );
    } else {
      console.error('No token provided');
    }
  }

  // Function to assign technician to an issue
  assignTechnician(issueId: string, technicianId: string) {
    const requestBody = {
      issue_id: issueId,
      user_id_tech: technicianId
    };

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token provided');
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.put<any>('http://localhost:3000/admin/assignIssue', requestBody, { headers })
      .subscribe(
        (response) => {
          console.log('Issue assigned successfully:', response);
          // You may want to update the UI or take further actions here
          window.location.reload();
        },
        (error) => {
          console.error('Error assigning technician:', error);
          // Handle error scenario
        }
      );
  }
}
