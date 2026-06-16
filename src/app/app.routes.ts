import { Routes } from '@angular/router';

import { IntroComponent } from './pages/intro/intro';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { DashboardComponent } from './pages/dashboard/dashboard';

export const routes: Routes = [

  {
    path: '',
    component: IntroComponent
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'register',
    component: RegisterComponent
  },

  {
    path: 'dashboard',
    component: DashboardComponent
  }

];