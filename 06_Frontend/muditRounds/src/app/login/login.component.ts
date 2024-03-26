import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,HttpClientModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [AuthService]
})
export class LoginComponent {
  loginForm: FormGroup;
  username: string = '';
  password: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log('submit button is press');
    console.log('Form submitted successfully!');
    const userData = {
      username: this.username,
      password: this.password,
    };
    
    this.http.
    post<any>('http://localhost:3000/auth/signin', userData)
      .subscribe({
        // next:  async (response) => {
        //   console.log('Login Successful', response);
        //   const token = response.token;
        //   this.authService.setToken(token);
        //   // Check if login was successful
        //   // this.router.navigate(['/patinetProfile']);
         
        // },
        next:  async (response) => {
          console.log('Login Successful', response);
          const token = response.token;
          const userRole = response.role; // assuming you are returning userRole from your backend
          this.authService.setToken(token);
          // Check if login was successful
          switch(userRole) {
            case 'operator':
              this.router.navigate(['./operatorPage']);
              break;
            case 'technician':
              this.router.navigate(['/technicianPage']);
              break;
            case 'admin':
              this.router.navigate(['/adminPage']);
              break;
          }
        },
        error: (error) => {
          console.error('Login failed:', error);
          // Handle unsuccessful login (e.g., display error message)
        }
      });
  }
  
  showAlert() {
    if (this.loginForm.invalid) {
      alert('Please fill all the fields correctly.');
    }
  }
}
