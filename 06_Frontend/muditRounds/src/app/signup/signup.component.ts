import { Component, OnInit } from '@angular/core';
import { UserServiceService } from './../services/user-service.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators, FormControl, AsyncValidatorFn } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserServiceService, private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(20)], this.noSpecialCharactersOrNumbersAsync.bind(this)],
      email: ['', [Validators.required, Validators.email]],
      phoneno: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(10)]],
      role: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.userService.register(this.signupForm.value).subscribe(
        (response) => {
          console.log("YAAAY !!!");
          this.router.navigate(['/login']);
          this.snackBar.open('Sign-up successful', 'Close', { duration: 3000 });
        }
      )
      console.log('Form submitted:', this.signupForm.value);
      // You can now submit the form data to your service
    }
  }

  // Define an asynchronous validator function
  noSpecialCharactersOrNumbersAsync(control: FormControl): Promise<{ [key: string]: any } | null> | Observable<{ [key: string]: any } | null> {
    const username = control.value;

    return new Promise<{ [key: string]: any } | null>((resolve) => {
      if (!username) {
        resolve(null); // Handle empty username
      } else if (username.length < 5) {
        resolve({ minlength: true }); // Minimum length condition
      } else if (username.length > 20) {
        resolve({ maxlength: true }); // Maximum length condition
      } else if (!/^[a-z]+$/.test(username)) {
        resolve({ pattern: true }); // Only lowercase letters allowed
      } else if (/\s/.test(username)) {
        resolve({ whitespace: true }); // Whitespace not allowed
      } else if (/[A-Z]/.test(username)) {
        resolve({ uppercase: true }); // Uppercase letters not allowed
      } else if (/\d/.test(username)) {
        resolve({ noNumbers: true }); // Input with numbers not allowed
      } else {
        resolve(null); // Username is valid
      }
    });
  }
}
