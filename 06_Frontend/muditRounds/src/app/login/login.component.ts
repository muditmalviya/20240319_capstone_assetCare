import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'; // Importing ReactiveFormsModule for form handling
import { CommonModule } from '@angular/common'; // Importing CommonModule for NgIf, NgFor, etc.
import { HttpClient } from '@angular/common/http'; // Importing HttpClient for making HTTP requests
import { HttpClientModule } from '@angular/common/http'; // Importing HttpClientModule for HTTP requests
import { AuthService } from '../auth.service'; // Importing AuthService for authentication
import { Router } from '@angular/router'; // Importing Router for navigation
import { NgModule } from '@angular/core'; // Importing NgModule for NgModule decorator
import { MatSnackBar } from '@angular/material/snack-bar'; 


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
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    // Initializing login form with form builder
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(15), this.noSpecialCharactersOrNumbers]], // Username field with required validation
      password: ['', Validators.required], // Password field with required validation
    });
  }

  // Function to handle form submission
  // onSubmit() {
  //   console.log('submit button is press');
  //   console.log('Form submitted successfully!');
  //   const userData = {
  //     username: this.username,
  //     password: this.password,
  //   };
    
  //   // Making POST request to login endpoint
  //   this.http
  //     .post<any>('http://localhost:3000/auth/signin', userData)
  //     .subscribe({
  //       // Handling successful response
  //       next: async (response) => {
  //         console.log('Login Successful', response);
  //         const token = response.token;
  //         const userRole = response.role; // assuming you are returning userRole from your backend
  //         this.authService.setToken(token);
  //         this.authService.setUser(response.user);
  //         this.router.navigate(['/profile']);
  //         this.snackBar.open('Login successful', 'Close', { duration: 3000 });
  //       },
  //       // Handling error response
  //       error: (error) => {
  //         console.error('Login failed:', error);
  //         if (error.error && error.error.message === "passwords do not match") {
  //           this.snackBar.open('Invalid username or password', 'Close', { duration: 3000 });
  //         } else {
  //           this.snackBar.open('Login failed', 'Close', { duration: 3000 });
  //         }
  //       }
  //     });
  // }
  onSubmit() {
    console.log('submit button is pressed');
    console.log('Form submitted successfully!');
    const userData = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
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
          // Only navigate to the profile page if login was successful
          if (token) {
            this.router.navigate(['/profile']);
            this.snackBar.open('Login successful', 'Close', { duration: 3000 });
          } else {
            this.snackBar.open('Invalid username or password', 'Close', { duration: 3000 });
          }
        },
        // Handling error response
        error: (error) => {
          console.error('Login failed:', error);
          this.snackBar.open('Login failed', 'Close', { duration: 3000 });
        }
      });
  }
  
  
  // Function to show alert if form is invalid
  showAlert() {
    if (this.loginForm.invalid) {
      alert('Please fill all the fields correctly.');
    }
  }

  // Custom validator to check for special characters or numbers
  noSpecialCharactersOrNumbers(control: FormControl) {
    console.log('Control value:', control.value);
    // Validate for lowercase letters only and maximum length of 15 characters
    if (/^[a-z]{1,15}$/.test(control.value))
    {
        return null; // Username is valid (lowercase letters, 1-15 characters)
    } 
    else
     {
       return { noSpecialCharactersOrNumbers: true }; // Error: invalid characters or length
     }
  }
}
