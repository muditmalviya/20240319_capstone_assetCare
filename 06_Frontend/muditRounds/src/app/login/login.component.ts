import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'; 
import { NgModule } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'; 


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
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
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    // Initializing login form with form builder
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(15), this.noSpecialCharactersOrNumbers]], // Username field with required validation
      password: ['', Validators.required],
    });
  }
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
          const userRole = response.role; 
          this.authService.setToken(token);
          this.authService.setUser(userRole);
          // Only navigate to the profile page if login is successful
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
