import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserTableComponent } from './user-table.component';
import { MatDialogModule } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('UserTableComponent', () => {
  let component: UserTableComponent;
  let fixture: ComponentFixture<UserTableComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserTableComponent, MatDialogModule, FontAwesomeModule],
      providers: [UserService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTableComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);

    // Initialize with some users
    component.users = userService.getUsers();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should paginate users correctly', () => {
    component.itemsPerPage = 3;
    component.currentPage = 1;
    component.paginatedUsers = component.getPaginatedUsers();
    fixture.detectChanges();

    expect(component.paginatedUsers.length).toBe(3); // Should display 3 users per page
  });

  it('should reset pagination and apply search filter correctly', () => {
    component.currentPage = 2; // Simulate being on the second page
    component.searchTerm = 'John';
    component.applyFilter();
    fixture.detectChanges();
  
    expect(component.currentPage).toBe(1); // Pagination should reset
    expect(component.paginatedUsers.length).toBe(2); // Expect 2 users with "John" in their name (John Doe, Mike Johnson)
    expect(component.paginatedUsers[0].name).toBe('John Doe');
    expect(component.paginatedUsers[1].name).toBe('Mike Johnson');
  });

  it('should reset pagination and apply workout filter correctly', () => {
    component.currentPage = 2; // Simulate being on the second page
    component.filterType = 'Yoga';
    component.applyFilter();
    fixture.detectChanges();
  
    expect(component.currentPage).toBe(1); // Pagination should reset
    expect(component.paginatedUsers.length).toBe(4); // Expect 4 users with "Yoga" workouts
    expect(component.paginatedUsers.every(user => user.workouts.some(workout => workout.type === 'Yoga'))).toBe(true);
  });

  it('should calculate total workout minutes correctly', () => {
    const user = userService.getUsers()[0]; // John Doe
    const totalMinutes = component.getTotalMinutes(user);

    expect(totalMinutes).toBe(130); // 30 + 45 + 55
  });

  it('should navigate to next page correctly', () => {
    component.itemsPerPage = 3;
    component.currentPage = 1;
    component.nextPage();
    fixture.detectChanges();

    expect(component.currentPage).toBe(2);
    expect(component.paginatedUsers.length).toBe(3); // 3 users on the second page
  });

  it('should navigate to previous page correctly', () => {
    component.itemsPerPage = 3;
    component.currentPage = 2;
    component.previousPage();
    fixture.detectChanges();

    expect(component.currentPage).toBe(1);
    expect(component.paginatedUsers.length).toBe(3); // 3 users on the first page
  });

  it('should open chart modal when openChartModal is called', () => {
    spyOn(component.dialog, 'open');
    const user = userService.getUsers()[0];
    component.openChartModal(user);

    expect(component.dialog.open).toHaveBeenCalled();
  });

  it('should handle edge case for getTotalMinutes with no workouts', () => {
    const emptyUser = { id: 9, name: 'New User', workouts: [] };
    const totalMinutes = component.getTotalMinutes(emptyUser);

    expect(totalMinutes).toBe(0); // Total minutes should be 0 if there are no workouts
  });

  it('should handle empty users list correctly', () => {
    component.users = [];
    component.applyFilter();
    fixture.detectChanges();

    expect(component.paginatedUsers.length).toBe(0); // No users should match as the list is empty
  });

  it('should calculate total pages correctly', () => {
    component.itemsPerPage = 3;
    expect(component.totalPages).toBe(Math.ceil(component.users.length / 3)); // Should match the expected total pages
  });

  it('should apply search filter with no matches correctly', () => {
    component.searchTerm = 'Nonexistent';
    component.applyFilter();
    fixture.detectChanges();
  
    expect(component.paginatedUsers.length).toBe(0); // No users should match the search term
  });

  it('should apply workout filter with no matches correctly', () => {
    component.filterType = 'Boxing'; // A workout type that no user has
    component.applyFilter();
    fixture.detectChanges();
  
    expect(component.paginatedUsers.length).toBe(0); // No users should match the workout type "Boxing"
  });

  it('should not break if the filter type is null', () => {
    component.filterType = null;
    component.applyFilter();
    fixture.detectChanges();
  
    expect(component.paginatedUsers.length).toBe(5); // All users should be included
  });

  it('should reset pagination correctly when changing itemsPerPage', () => {
    component.itemsPerPage = 2;
    component.currentPage = 2;
    fixture.detectChanges();

    component.applyFilter();
    expect(component.currentPage).toBe(1); // Pagination should reset when changing itemsPerPage
    expect(component.paginatedUsers.length).toBe(2);
  });
});
