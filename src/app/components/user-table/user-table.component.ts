import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ChartModalComponent } from '../chart-modal/chart-modal.component';
import { FormsModule } from '@angular/forms';
import { UserService, User } from '../../services/user.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChartBar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule]
})
export class UserTableComponent implements OnInit, OnChanges {
  @Input() users: User[] = [];
  @Input() searchTerm: string = '';
  @Input() filterType: string | null = null;

  currentPage: number = 1;
  itemsPerPage: number = 5;
  paginatedUsers: User[] = [];
  faChartBar = faChartBar;

  constructor(private userService: UserService, public dialog: MatDialog) {}

  ngOnInit() {
    this.paginatedUsers = this.getPaginatedUsers();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['users'] || changes['searchTerm'] || changes['filterType']) {
      this.applyFilter();
    }
  }

  getPaginatedUsers(): User[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.users.slice(startIndex, endIndex);
  }

  applyFilter() {
    this.currentPage = 1; // Reset pagination when a filter is applied
  
    let filteredUsers = this.users;
  
    if (this.searchTerm) {
      filteredUsers = filteredUsers.filter(user =>
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  
    if (this.filterType) {
      filteredUsers = filteredUsers.filter(user =>
        user.workouts.some(workout => workout.type === this.filterType)
      );
    }
  
    this.paginatedUsers = filteredUsers.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );
  }

  getTotalMinutes(user: User): number {
    return user.workouts.reduce((total, workout) => total + workout.minutes, 0);
  }

  openChartModal(user: User): void {
    this.dialog.open(ChartModalComponent, {
      width: '700px',
      data: user
    });
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginatedUsers = this.getPaginatedUsers();
    }
  }

  nextPage() {
    if (this.currentPage < Math.ceil(this.users.length / this.itemsPerPage)) {
      this.currentPage++;
      this.paginatedUsers = this.getPaginatedUsers();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.users.length / this.itemsPerPage);
  }
}
