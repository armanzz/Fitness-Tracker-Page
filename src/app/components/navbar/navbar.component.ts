import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUserModalComponent } from '../add-user-modal/add-user-modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class NavbarComponent {
  @Output() searchTermChange = new EventEmitter<string>();
  @Output() filterTypeChange = new EventEmitter<string>();
  @Output() userAdded = new EventEmitter<any>();

  searchTerm: string = '';
  filterType: string = '';

  constructor(public dialog: MatDialog) {}

  applySearch() {
    this.searchTermChange.emit(this.searchTerm);
    this.filterTypeChange.emit(this.filterType);
  }

  openAddUserModal(): void {
    const dialogRef = this.dialog.open(AddUserModalComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('User data:', result);
        this.userAdded.emit(result);
      }
    });
  }
}
