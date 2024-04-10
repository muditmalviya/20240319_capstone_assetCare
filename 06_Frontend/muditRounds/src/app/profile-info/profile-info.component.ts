import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../interface/request';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-info.component.html',
  styleUrl: './profile-info.component.css'
})
export class ProfileInfoComponent implements OnInit{
  user: User = {
    username: '',
    email: '',
    password: '',
    phoneno: 0,
    role: 'technician',
    isAvailable: true
  };

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.fetchUser();
  }

  fetchUser(): void {
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      this.http.get<any>('http://localhost:3000/user/profile', { headers: headers })
        .subscribe((item: User) => {
          console.log('Profile fetched:', item);
          this.user = item;
        }, error => {
          console.error('Failed to fetch profile:', error);
        });
    } else {
      console.error('No token provided');
    }
  }

  onButtonClick(action: string): void {
    if(!this.user) return
    switch(action) {
      case 'assigned':
        if (this.user.role === 'admin') {
          this.router.navigate(['/openedIssue']);
        } else if (this.user.role === 'operator') {
          this.router.navigate(['/raiseIssue']);
        } else if (this.user.role === 'technician') {
          this.router.navigate(['/assignedTech']);
        }
        break;
      case 'history':
        if (this.user.role === 'admin') {
          this.router.navigate(['/closedIssue']);
        } else if (this.user.role === 'operator') {
          this.router.navigate(['/historyIssue']);
        } else if (this.user.role === 'technician') {
          this.router.navigate(['/historyIssueTech']);
        }
        break;
      default:
        break;
    }
  }
}
