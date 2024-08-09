import { Component } from '@angular/core';

@Component({
  selector: 'app-splash-screen',
  template: `
    <div class="splash-container">
      <div class="content">
        <img src="fylelogo.png" alt="Logo" class="logo" />
        <h1 class="title">Health Challenge Tracker</h1>
        <img src="giphy123.webp" alt="Loading..." class="loading-gif" />
        <p class="quote">"Keep moving"</p>
      </div>
    </div>
  `,
  styles: [`
    .splash-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #2980B9; /* The same blue used in the navbar */
      color: #ffffff;
      font-family: 'Poppins', sans-serif;
      text-align: center;
    }
    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .logo {
      width: 100px; /* Smaller logo size */
      margin-bottom: 20px;
    }
    .title {
      font-size: 2rem;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .loading-gif {
      width: 300px; /* Bigger GIF size */
      max-width: 80%;
      margin-bottom: 20px;
    }
    .quote {
      font-size: 1.2rem;
      font-style: italic;
    }
  `],
  standalone: true,
})
export class SplashScreenComponent {}
