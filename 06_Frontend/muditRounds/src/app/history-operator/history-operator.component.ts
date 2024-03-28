import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-history-operator',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './history-operator.component.html',
  styleUrl: './history-operator.component.css'
})
export class HistoryOperatorComponent implements OnInit{
  historys: any[] = [];

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router : Router
    ) { }

    ngOnInit(): void {
      this.fetchData();
    }
    fetchData(){
      const token = localStorage.getItem('token');

      if (token) {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
        this.http.get<any[]>('http://localhost:3000/api/issues', { headers: headers })
        .subscribe(
          (response) => {
            this.historys = response;
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
