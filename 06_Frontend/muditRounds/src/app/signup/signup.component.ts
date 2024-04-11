import { Component, OnInit } from '@angular/core';
import { UserServiceService } from './../services/user-service.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators, FormControl} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  signupForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,private userService: UserServiceService) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required, Validators.maxLength(20), this.noSpecialCharactersOrNumbers],
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
        (response)=>{
          console.log("YAAAY !!!");
          
        }
      )
      console.log('Form submitted:', this.signupForm.value);
      // You can now submit the form data to your service
    }
  }
  noSpecialCharactersOrNumbers(control: FormControl) {
    const username = control.value;
    if (!username) return null;
  
    if (username.length === 0) {
      return { required: true }; // Handle empty username
    } else if (username.length < 5) {
      return { minlength: true }; // Minimum length condition
    } else if (username.length > 20) {
      return { maxlength: true }; // Maximum length condition
    } else if (!/^[a-z]+$/.test(username)) {
      return { pattern: true }; // Only lowercase letters allowed
    } else if (/\s/.test(username)) {
      return { whitespace: true }; // Whitespace not allowed
    } else if (/[A-Z]/.test(username)) {
      return { uppercase: true }; // Uppercase letters not allowed
    } else if (!/\d/.test(username)) {
      return { noNumbers: true }; // Input without numbers not allowed
    }
    
    return null; // Username is valid
  }
  
  
}
