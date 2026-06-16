import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './intro.html',
  styleUrl: './intro.scss'
})
export class IntroComponent {

  constructor(private router: Router) {}

  irLogin() {
    this.router.navigate(['/login']);
  }
}