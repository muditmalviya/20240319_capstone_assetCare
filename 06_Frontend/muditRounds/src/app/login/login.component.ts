import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms'; // Importing ReactiveFormsModule for form handling
import { CommonModule } from '@angular/common'; // Importing CommonModule for NgIf, NgFor, etc.
import { HttpClient } from '@angular/common/http'; // Importing HttpClient for making HTTP requests
import { HttpClientModule } from '@angular/common/http'; // Importing HttpClientModule for HTTP requests
import { AuthService } from '../auth.service'; // Importing AuthService for authentication
import { Router } from '@angular/router'; // Importing Router for navigation
import { NgModule } from '@angular/core'; // Importing NgModule for NgModule decorator


@Component({
  selector: 'app-login',
  standalone: true, // Unsure of what standalone is meant for, typically not used here
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule], // Importing required modules
  templateUrl: './login.component.html', // Template URL for HTML file
  styleUrl: './login.component.css', // Style URL for CSS file
  providers: [AuthService] // Providing AuthService
})
export class LoginComponent {
  loginForm: FormGroup; // Form group for login form
  username: string = ''; // Variable to store username input
  password: string = ''; // Variable to store password input

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {
    // Initializing login form with form builder
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]], // Username field with required validation
      password: ['', Validators.required], // Password field with required validation
    });
  }

  // Function to handle form submission
  onSubmit() {
    console.log('submit button is press');
    console.log('Form submitted successfully!');
    const userData = {
      username: this.username,
      password: this.password,
    };
    
    // Making POST request to login endpoint
    this.http
      .post<any>('http://localhost:3000/auth/signin', userData)
      .subscribe({
        // Handling successful response
        next: async (response) => {
          console.log('Login Successful', response);
          const token = response.token;
          const userRole = response.role; // assuming you are returning userRole from your backend
          this.authService.setToken(token);
          this.authService.setUser(response.user);
          // Check if login was successful
          // switch (userRole) {
          //   case 'operator':
          //     this.router.navigate(['/operatorPage']);
          //     break;
          //   case 'technician':
          //     this.router.navigate(['/technicianPage']);
          //     break;
          //   case 'admin':
          //     this.router.navigate(['/adminPage']);
          //     break;
          // }
          this.router.navigate(['/profile']);
        },
        // Handling error response
        error: (error) => {
          console.error('Login failed:', error);
          // Handle unsuccessful login (e.g., display error message)
        }
      });
  }
  
  // Function to show alert if form is invalid
  showAlert() {
    if (this.loginForm.invalid) {
      alert('Please fill all the fields correctly.');
    }
  }
}
