import { Component, signal } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-login',

  standalone: true,

  imports: [
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatFormFieldModule
  ],

  templateUrl: './login.html',
  styleUrl: './login.scss'
})

export class Login {

  hidePassword = signal(true);

  togglePassword(){
    this.hidePassword.update(v => !v);
  }

}