import { Routes } from '@angular/router';
import { Intro } from './pages/intro/intro';
import { Login } from './pages/login/login';

export const routes: Routes = [
  { path: '', component: Intro },
  { path: 'login', component: Login }
];