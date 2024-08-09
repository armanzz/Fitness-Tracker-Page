import { Injectable } from '@angular/core';

export interface Workout {
  type: string;
  minutes: number;
}

export interface User {
  id: number;
  name: string;
  workouts: Workout[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [
    { id: 1, name: 'John Doe', workouts: [{ type: 'Running', minutes: 30 }, { type: 'Cycling', minutes: 45 }, { type: 'Swimming', minutes: 55 }] },
    { id: 2, name: 'Jane Smith', workouts: [{ type: 'Swimming', minutes: 60 }] },
    { id: 3, name: 'Mike Johnson', workouts: [{ type: 'Yoga', minutes: 50 }, { type: 'Cycling', minutes: 40 }] },
    { id: 4, name: 'Alice Brown', workouts: [{ type: 'Running', minutes: 25 }, { type: 'Swimming', minutes: 35 }, { type: 'Yoga', minutes: 40 }] },
    { id: 5, name: 'Bob Davis', workouts: [{ type: 'Yoga', minutes: 40 }, { type: 'Cycling', minutes: 60 }] },
    { id: 6, name: 'Charlie Green', workouts: [{ type: 'Running', minutes: 30 }, { type: 'Swimming', minutes: 50 }] },
    { id: 7, name: 'David Harris', workouts: [{ type: 'Cycling', minutes: 70 }, { type: 'Yoga', minutes: 20 }] },
    { id: 8, name: 'Eve Clark', workouts: [{ type: 'Swimming', minutes: 55 }, { type: 'Running', minutes: 45 }] }
  ];

  /**
   * Get the list of all users.
   */
  getUsers(): User[] {
    return this.users;
  }

  /**
   * Add a new user to the list.
   * Throws an error if a user with the same ID already exists.
   */
  addUser(user: User): void {
    // Check if a user with the same ID already exists
    const existingUser = this.users.find(u => u.id === user.id);
    if (existingUser) {
      throw new Error(`User with ID ${user.id} already exists.`);
    }
  
    // Validate the user's name
    if (!user.name || user.name.trim() === '') {
      throw new Error('Invalid user data. User must have a name.');
    }
  
    // Validate the workouts array
    if (!user.workouts || !Array.isArray(user.workouts) || user.workouts.length === 0) {
      throw new Error('Invalid user data. User must have a list of workouts.');
    }
  
    // Ensure that the workouts array is valid
    for (const workout of user.workouts) {
      if (!workout.type || workout.minutes < 0) {
        throw new Error('Invalid workout data. Each workout must have a type and a positive number of minutes.');
      }
    }
  
    // Add the user to the list
    this.users.push(user);
  }
}
