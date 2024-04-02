import { Component, OnInit } from '@angular/core';
import { UserServiceService } from './../services/user-service.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators} from '@angular/forms';
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
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneno: ['', Validators.required],
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
}
