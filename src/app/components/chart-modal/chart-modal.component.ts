import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';

interface Workout {
  type: string;
  minutes: number;
}

interface User {
  id: number;
  name: string;
  workouts: Workout[];
}

@Component({
  selector: 'app-chart-modal',
  templateUrl: './chart-modal.component.html',
  styleUrls: ['./chart-modal.component.css'],
  standalone: true,
  imports: [CommonModule, NgxChartsModule, MatDialogModule]
})
export class ChartModalComponent implements OnInit {
  barChartData: any[] = [];
  view: [number, number] = [600, 350];
  colorScheme: Color = { 
    name: 'custom', 
    selectable: true, 
    group: ScaleType.Ordinal, 
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'] 
  };
  yScaleMax = 100; // Set y-axis maximum value


  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Workout Type';
  showYAxisLabel = true;
  yAxisLabel = 'Minutes';

  constructor(
    public dialogRef: MatDialogRef<ChartModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {}

  ngOnInit() {
    this.barChartData = this.data.workouts.map(workout => ({
      name: workout.type,
      value: workout.minutes
    }));
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
