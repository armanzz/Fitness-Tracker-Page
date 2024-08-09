import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';

export const routes: Routes = [
  { path: '', component: SplashScreenComponent }, // Show the splash screen first
  { path: 'home', component: AppComponent },  
  { path: '**', redirectTo: '', pathMatch: 'full' }   
];
