import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
    // Inject HttpClient into the constructor
    constructor(private http: HttpClient) {}

    submitForm() {
      const formData = {
        asset_name: this.assetName,
        status: true,
        energy_consumption: this.energyConsumption,
        hours_of_operation: this.hoursOfOperation,
        noise_level: this.noiseLevel,
        temperature: this.temperature,
        physical_condition: this.physicalCondition,
        vibration: this.vibration,
        description: this.description
      };

        // Convert formData to JSON
      const jsonData = JSON.stringify(formData);
  
      // Get the token from wherever you store it (e.g., localStorage)
      const token = localStorage.getItem('token');
      console.log(jsonData);
      // Set headers with the token
      const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': `Bearer ${token}`
      });
  
      // Make the HTTP POST request with headers
      this.http.post('http://localhost:3000/api/issues', jsonData, { headers })
        .subscribe(
          (response) => {
            console.log('Form data submitted successfully:', response);
            this.assetName = '';
            this.energyConsumption = 0;
            this.hoursOfOperation = 0;
            this.noiseLevel = 0;
            this.temperature = 0;
            this.physicalCondition = '';
            this.vibration = 0;
            this.description = '';
            // Reset the form after successful submission
            // issueForm.resetForm(); // Uncomment if you have a reference to the form in your template
          },
          (error) => {
            console.error('Error occurred while submitting form data:', error);
          }
        );
    }
}
