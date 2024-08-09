import { TestBed } from '@angular/core/testing';
import { UserService, User } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of users', () => {
    const users: User[] = service.getUsers();
    expect(users.length).toBe(8); // Assuming there are 8 users in the initial array
  });

  it('should return an empty list if there are no users', () => {
    (service as any).users = []; // Empty users list
    const users: User[] = service.getUsers();
    expect(users.length).toBe(0); // The list should be empty
  });

  it('should add a new user', () => {
    const newUser: User = { id: 9, name: 'New User', workouts: [{ type: 'Running', minutes: 20 }] };
    service.addUser(newUser);
    const users: User[] = service.getUsers();
    expect(users).toContain(newUser);
    expect(users.length).toBe(9); // Now there should be 9 users
  });

  it('should throw an error if adding a user with a duplicate ID', () => {
    const duplicateUser: User = { id: 1, name: 'Duplicate User', workouts: [{ type: 'Yoga', minutes: 40 }] };
    expect(() => service.addUser(duplicateUser)).toThrowError(`User with ID 1 already exists.`);
  });

  it('should throw an error if adding a user with an invalid name', () => {
    const invalidUser: User = { id: 10, name: '', workouts: [{ type: 'Running', minutes: 20 }] };
    expect(() => service.addUser(invalidUser)).toThrowError('Invalid user data. User must have a name.');
  });

  it('should throw an error if adding a user with no workouts', () => {
    const invalidUser: User = { id: 11, name: 'Invalid User', workouts: [] };
    expect(() => service.addUser(invalidUser)).toThrowError('Invalid user data. User must have a list of workouts.');
  });

  it('should throw an error if adding a user with invalid workout data', () => {
    const invalidWorkoutUser1: User = { id: 12, name: 'Invalid Workout User', workouts: [{ type: '', minutes: 20 }] };
    const invalidWorkoutUser2: User = { id: 13, name: 'Invalid Workout User', workouts: [{ type: 'Running', minutes: -5 }] };

    expect(() => service.addUser(invalidWorkoutUser1)).toThrowError('Invalid workout data. Each workout must have a type and a positive number of minutes.');
    expect(() => service.addUser(invalidWorkoutUser2)).toThrowError('Invalid workout data. Each workout must have a type and a positive number of minutes.');
  });

  it('should handle adding multiple users', () => {
    const user1: User = { id: 14, name: 'User 1', workouts: [{ type: 'Cycling', minutes: 30 }] };
    const user2: User = { id: 15, name: 'User 2', workouts: [{ type: 'Yoga', minutes: 60 }] };
    
    service.addUser(user1);
    service.addUser(user2);
    
    const users: User[] = service.getUsers();
    expect(users).toContain(user1);
    expect(users).toContain(user2);
    expect(users.length).toBe(10);
  });

  it('should correctly add and retrieve users with identical names', () => {
    const user1: User = { id: 16, name: 'John Doe', workouts: [{ type: 'Running', minutes: 30 }] };
    const user2: User = { id: 17, name: 'John Doe', workouts: [{ type: 'Cycling', minutes: 45 }] };

    service.addUser(user1);
    service.addUser(user2);

    const users: User[] = service.getUsers().filter(user => user.name === 'John Doe');
    expect(users.length).toBe(3); // Should find 3 users named 'John Doe'
    expect(users).toContain(user1);
    expect(users).toContain(user2);
  });

  it('should handle adding a user with complex workout data', () => {
    const complexUser: User = {
      id: 18,
      name: 'Complex User',
      workouts: [
        { type: 'Running', minutes: 15 },
        { type: 'Cycling', minutes: 0 }, // Valid workout with 0 minutes
        { type: 'Swimming', minutes: 100 }
      ]
    };

    service.addUser(complexUser);
    const users: User[] = service.getUsers();
    expect(users).toContain(complexUser);
  });

  it('should handle adding a user with exactly one workout', () => {
    const singleWorkoutUser: User = { id: 19, name: 'Single Workout User', workouts: [{ type: 'Yoga', minutes: 30 }] };
    service.addUser(singleWorkoutUser);
    const users: User[] = service.getUsers();
    expect(users).toContain(singleWorkoutUser);
  });

  it('should not throw errors when adding a user with large workout minutes', () => {
    const largeWorkoutUser: User = { id: 20, name: 'Large Workout User', workouts: [{ type: 'Marathon', minutes: 300 }] };
    service.addUser(largeWorkoutUser);
    const users: User[] = service.getUsers();
    expect(users).toContain(largeWorkoutUser);
  });
});
