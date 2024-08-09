import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule]
})
export class AddUserModalComponent {
  userData: any = { name: '', workouts: [] };
  workoutTypes: string[] = ['Running', 'Cycling', 'Swimming', 'Yoga'];

  constructor(
    public dialogRef: MatDialogRef<AddUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  addWorkout() {
    this.userData.workouts.push({ type: '', minutes: 0 });
  }

  removeWorkout(index: number) {
    this.userData.workouts.splice(index, 1);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      // Check if user name is empty
      if (!this.userData.name.trim()) {
        alert('User name cannot be empty!');
        return;
      }

      // Check if any workout has empty type or zero minutes
      for (const workout of this.userData.workouts) {
        if (!workout.type.trim()) {
          alert('Workout type cannot be empty!');
          return;
        }
        if (workout.minutes <= 0) {
          alert('Workout minutes must be greater than zero!');
          return;
        }
      }

      // If all checks pass, close the dialog with user data
      this.dialogRef.close(this.userData);
    } else {
      alert('Please fill out the form correctly!');
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onAddUser(): void {
    // Call onSubmit method to close dialog with user data
    this.onSubmit({ valid: true } as NgForm);
  }
}
