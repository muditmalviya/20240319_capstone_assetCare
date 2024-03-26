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
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './open-issue-a.component.html',
  styleUrls: ['./open-issue-a.component.css']
})
export class OpenIssueAComponent implements OnInit {
  availtechs: any[] = [];
  issues: any[] = [];

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router : Router
     ) { }

  ngOnInit(): void {
    this.fetchAvailTech();
    this.fetchData();
  }

  fetchAvailTech(){
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      this.http.get<any[]>('http://localhost:3000/api/availtech', { headers: headers })
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


  fetchData() {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any[]>('http://localhost:3000/api/open', { headers: headers })
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

assignTechnician(issueId: string, technicianId: string) {
  
  const requestBody = {
    issue_id: issueId,
    user_id_tech: technicianId
  };
  console.log(requestBody);

  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No token provided');
    return;
  }

  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);


  this.http.put<any>('http://localhost:3000/api/assignIssue', requestBody, {headers})
    .subscribe(
      (response) => {
        console.log('Issue assigned successfully:', response);
        // You may want to update the UI or take further actions here
      },
      (error) => {
        console.error('Error assigning technician:', error);
        // Handle error scenario
      }
    );
}
}
