import { Component, OnInit, SimpleChanges } from '@angular/core';
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
  showTableOne: boolean = false;
  openedIssuesCount: number = 0;
  assignedIssuesCount: number = 0;
  selectedStatus: string = 'All';
  filteredIssues: any[] = [];
  selectedIssue: string = ''; // Added property for selected issue
  selectedTechnician: { [key: string]: string } = {};

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router : Router
  ) { }



  toggleTableOne() {
    this.showTableOne = !this.showTableOne;
  }

  ngOnInit(): void {
    // Fetch available technicians and open issues on component initialization
    console.log("Selected Status:", this.selectedStatus);
    this.fetchAvailTech();
    this.fetchData();
    console.log(this.issues)
    this.fetchIssueCounts();
    this.selectedStatus = 'All';
    this.filterIssues();
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
            this.issues = response.map(issue=> ({
              ...issue,
              formattedTimestamp: this.formatTimestamp(issue.timestamp)
            }));
            this.filteredIssues=this.issues
          },
          (error) => {
            console.error('Error fetching data:', error);
          }
        );
    } else {
      console.error('No token provided');
    }
  }
  // Function to fetch issue counts
  fetchIssueCounts() {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      this.http.get<any>('http://localhost:3000/admin/countIssues', { headers: headers })
        .subscribe(
          (response) => {
            this.openedIssuesCount = response.openedCount;
            this.assignedIssuesCount = response.assignedCount;
          },
          (error) => {
            console.error('Error fetching issue counts:', error);
          }
        );
    } else {
      console.error('No token provided');
    }
  }

  // Function to assign technician to an issue
  assignTechnician(issueId: string, technicianUsername: string) {
    const technicianUsernamee = this.selectedTechnician[issueId];
    const requestBody = {
      issue_id: issueId,
      username: technicianUsername // Change technicianId to technicianUsername
    };

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token provided');
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Make a GET request to fetch the technician's ID based on their username
    this.http.get<any>(`http://localhost:3000/admin/users/?username=${technicianUsername}`, { headers })
      .subscribe(
        (response) => {
          // Extract the technician's ID from the response
          const technicianId = response.user._id;

          // Make a PUT request to assign the technician
          this.http.put<any>('http://localhost:3000/admin/assignIssue', { ...requestBody, user_id_tech: technicianId }, { headers })
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
        },
        (error) => {
          console.error('Error fetching technician ID:', error);
          // Handle error scenario
        }
      );
  }
  formatTimestamp(timestamp: string): string {
    const date = new Date(timestamp);
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true, // Use 12-hour format
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }
  filterIssues() {
    console.log("Filtering issues based on status:", this.selectedStatus);
    if (this.selectedStatus === 'All') {
        this.filteredIssues = this.issues;
        console.log("Issues", this.issues);
        return this.filterIssues
    } else {
      this.filteredIssues = this.issues.filter(issue => issue.status === this.selectedStatus);
      return this.filterIssues
    }
    console.log("Filtered issues:", this.filteredIssues);
}
}
