import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../interface/request';

@Component({
  selector: 'app-profile-a',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profile-a.component.html',
  styleUrl: './profile-a.component.css'
})
export class ProfileAComponent {
  user: User | null = null;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router : Router
  ) { }

  ngOnInit() {
    this.fetchUser();
  }

  fetchUser(): void{
    console.log('Fetching user...');
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    if(token)
    {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      this.http.get<any>('http://localhost:3000/api/profile', { headers: headers })
      .subscribe((item: User) => {
        console.log('Profile fetched:', item);
        this.user = item;
        // this.processWishlistItems();
      }, error => {
        console.error('Failed to fetch profile:', error);
      });
  } else {
    console.error('No token provided');
  }
    }
}
