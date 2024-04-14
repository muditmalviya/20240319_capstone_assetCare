import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-raise-issue',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './raise-issue.component.html',
  styleUrl: './raise-issue.component.css'
})
export class RaiseIssueComponent {
    // Define properties to store form field values
    assetName: string = '';
    energyConsumption: number = 0;
    hoursOfOperation: number = 0;
    noiseLevel: number = 0;
    temperature: number = 0;
    physicalCondition: string = '';
    vibration: number = 0;
    description: string = '';

    constructor(private http: HttpClient, private snackBar: MatSnackBar, private router: Router) {}

    submitForm() {
        const formData = {
            asset_name: this.assetName,
            energy_consumption: this.energyConsumption,
            hours_of_operation: this.hoursOfOperation,
            noise_level: this.noiseLevel,
            temperature: this.temperature,
            physical_condition: this.physicalCondition,
            vibration: this.vibration,
            description: this.description
        };

        const jsonData = JSON.stringify(formData);

        const token = localStorage.getItem('token');

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });

        // Open Snackbar confirmation dialog
        const snackBarRef: MatSnackBarRef<SimpleSnackBar> = this.snackBar.open(
            'Are you sure that you want to raise this issue?',
            'Yes, Raise',
            {
                duration: 30000 // 30 seconds
            }
        );

        snackBarRef.onAction().subscribe(() => {
            // User clicked 'Yes, Raise', make the HTTP request
            this.http.post('http://localhost:3000/api/issues', jsonData, { headers })
                .subscribe(
                    (response) => {
                        console.log('Form data submitted successfully:', response);
                        this.router.navigate(['/profile']);
                        this.snackBar.open('Issue successfully submitted!!', 'Close', { duration: 3000 });
                    },
                    (error) => {
                        console.error('Error occurred while submitting form data:', error);
                    }
                );
        });
    }
}
