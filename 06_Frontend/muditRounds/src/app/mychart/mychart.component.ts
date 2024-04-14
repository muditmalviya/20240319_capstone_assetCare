import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import Chart from 'chart.js/auto';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-mychart',
  standalone: true,
  imports: [CommonModule,  FormsModule],
  templateUrl: './mychart.component.html',
  styleUrl: './mychart.component.css'
})
export class MychartComponent implements OnInit, OnDestroy {
  assetData: any[] = [];
  chart: Chart | undefined;
  fromDate: Date | undefined;
  toDate: Date | undefined;

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  onSubmit() {
    if (!this.fromDate || !this.toDate) {
      alert('Please select both from and to dates.');
      return;
    }
    // Clear existing data and destroy chart instance
  this.assetData = [];
  if (this.chart) {
    this.chart.destroy();
  }


    // Make API request to fetch data for the selected date range
    this.http.get<any[]>(`http://localhost:3000/api/issuesD?fromDate=${this.fromDate}&toDate=${this.toDate}`)
      .subscribe(data => {
        // Use a map to aggregate the number of issues raised for each asset name
        const assetMap = new Map<string, number>();
        data.forEach(issue => {
          const assetName = issue.asset_name;
          if (assetMap.has(assetName)) {
            assetMap.set(assetName, (assetMap.get(assetName) ?? 0) + 1);
          } else {
            assetMap.set(assetName, 1);
          }
        });

        // Convert the map to an array of objects
        this.assetData = Array.from(assetMap, ([name, num_issues_raised]) => ({ name, num_issues_raised }));

        // Render or update the chart
        this.renderChart();
      });
  }

  renderChart() {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.assetData.map(asset => asset.name),
          datasets: [{
            label: '# of Issues Raised',
            data: this.assetData.map(asset => asset.num_issues_raised),
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }
}