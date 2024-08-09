import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplashScreenComponent } from './splash-screen.component';

@NgModule({
  declarations: [SplashScreenComponent], // Declare the SplashScreenComponent
  imports: [CommonModule],               // Import CommonModule for common directives like *ngIf, *ngFor, etc.
  exports: [SplashScreenComponent]       // Export SplashScreenComponent so it can be used in other modules
})
export class SplashScreenModule {}
