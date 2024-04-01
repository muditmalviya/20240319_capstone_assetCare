import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-close-issue-a',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './close-issue-a.component.html',
  styleUrl: './close-issue-a.component.css'
})
export class CloseIssueAComponent {
  closes: any[] = [];

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router : Router
     ) { }

     ngOnInit(): void {
      this.fetchClosed();
    }

    fetchClosed(){
      const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      this.http.get<any[]>('http://localhost:3000/admin/close', { headers: headers })
      .subscribe(
        (response) => {
          this.closes = response;
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
  } else {
    console.error('No token provided');
  }
    }
}
