import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { UserService, User } from './services/user.service';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, NavbarComponent, UserTableComponent, SplashScreenComponent]
})
export class AppComponent implements OnInit {
  users: User[] = [];
  searchTerm: string = '';
  filterType: string = '';
  showSplashScreen = true; // Control the visibility of the splash screen

  constructor(private userService: UserService) {
    this.users = this.userService.getUsers();
  }

  ngOnInit(): void {
    // Hide the splash screen after 3 seconds
    setTimeout(() => {
      this.showSplashScreen = false;
    }, 5000);
  }

  onSearchTermChange(searchTerm: string) {
    this.searchTerm = searchTerm;
  }

  onFilterTypeChange(filterType: string) {
    this.filterType = filterType;
  }

  addUser(newUser: User) {
    this.userService.addUser(newUser);
    this.users = this.userService.getUsers(); // Refresh the users list
  }
}
