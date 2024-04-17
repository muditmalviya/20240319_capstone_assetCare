import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Chart from 'chart.js/auto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.css'
})
export class LeaderboardComponent implements OnInit {
  @ViewChild('myChart') myChartRef: ElementRef | undefined;
  selectedOption: string | null = null;
  chart: Chart | null = null;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.selectedOption = null;
  }

  onSelectChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedOption = target.value;
    this.fetchDataAndRenderChart();
  }

  fetchDataAndRenderChart(): void {
    if (!this.selectedOption) {
      return;
    }

    let apiUrl = '';
    if (this.selectedOption === 'Technician') {
      apiUrl = 'http://localhost:3000/admin/techniciansB';
    } else if (this.selectedOption === 'Operators') {
      apiUrl = 'http://localhost:3000/admin/operatorsB';
    }

    this.http.get<any[]>(apiUrl)
      .subscribe(
        data => {
          const usernames = data.map(entry => entry.username);
          const rewards = data.map(entry => entry.rewards);
          this.renderChart(usernames, rewards);
        },
        error => {
          console.error('Error fetching data:', error);
        }
      );
  }

  renderChart(usernames: string[], rewards: number[]): void {
    if (!this.myChartRef) {
      return;
    }

    if (this.chart) {
      this.chart.destroy(); // Destroy the previous chart if it exists
    }

    const ctx = this.myChartRef.nativeElement.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: usernames,
        datasets: [{
          label: 'Rewards',
          data: rewards,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }



}
