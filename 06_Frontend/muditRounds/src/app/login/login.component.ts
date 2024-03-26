import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  // imports: [HttpClient],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  // username!: string;
  // password!: string;

  // constructor(private http: HttpClient) { }

  // login() {
  //   this.http.post('http://localhost:3000/auth/signin', {
  //     username: this.username,
  //     password: this.password
  //   }).subscribe(response => {
  //     // handle your response here
  //     console.log(response);
  //   });
  // }
}
