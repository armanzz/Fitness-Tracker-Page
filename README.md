# Health Challenge Application

This Angular application is designed to manage and track users' workout routines. The application includes functionalities to view, filter, and add user data, including workouts and other relevant information.


## Features

User Management:     View and manage user profiles.
Workout Management:   Add and track different types of workouts for each user.
Filtering:      Filter users based on name and workout type.
Pagination:     Easily navigate through large sets of user data.
Responsive Design:   Optimized for different screen sizes.
Validation:        Alerts users when trying to add a user with missing or invalid data.


## Technologies Used

Frontend:
    Angular
    TypeScript
    HTML5/CSS3

UI Components:
    Angular Material
    FontAwesome

Testing:
    Jasmine
    Karma

Version Control:
    Git

## Installation
Prerequisites
    Node.js (version 14.x or higher)
    Angular CLI (version 12.x or higher)

# Steps

Clone the repository:
    1. git clone https://github.com/your-username/health-challenge.git
    2. cd health-challenge

Install dependencies:
    1. npm install

To Start Deployment Server:
    >> ng serve

# Test:
    >> ng test --code-coverage


## Coverage Report

Chrome 127.0.0.0 (Windows 10): Executed 28 of 28 SUCCESS (0.356 secs / 0.302 secs)
TOTAL: 28 SUCCESS

=============================== Coverage summary ===============================
Statements   : 72.85% ( 51/70 )
Branches     : 78.94% ( 15/19 )
Functions    : 76.19% ( 16/21 )
Lines        : 71.87% ( 46/64 )
================================================================================



# Directory Structure:

src/
├── app/
│   ├── components/
│   │   ├── user-table/
│   │   └── add-user-modal/
│   │   └── chart-modal/
│   │   └── navbar/
│   ├── services/
│   ├── splash-screen/
│   └── app.component.ts
├── environments/
│   └── ...
└── index.html



