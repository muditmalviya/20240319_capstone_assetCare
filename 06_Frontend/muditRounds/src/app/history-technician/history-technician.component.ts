import { Component, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-history-technician',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './history-technician.component.html',
  styleUrl: './history-technician.component.css'
})
export class HistoryTechnicianComponent implements OnInit{
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
    
          this.http.get<any[]>('http://localhost:3000/technician/history', { headers: headers })
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
