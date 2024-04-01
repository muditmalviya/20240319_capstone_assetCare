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
export class AssignedTechComponent implements OnInit{
  assignedIssues: any[] = [];

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router : Router
     ) { }

     ngOnInit(): void {
       this.fetchAssigned();
     }

     fetchAssigned(){
      const token = localStorage.getItem('token');

      if (token) {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
        this.http.get<any[]>('http://localhost:3000/admin/assignedIssues', { headers: headers })
        .subscribe(
          (response) => {
            this.assignedIssues = response;
          },
          (error) => {
            console.error('Error fetching data:', error);
          }
        );
    } else {
      console.error('No token provided');
    }
}
changeStatus(issueId: string){
  const requestBody = {
    issue_id: issueId
  };

  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No token provided');
    return;
  }

  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  this.http.put<any>('http://localhost:3000/api/changestatus', requestBody, {headers})
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

