import { Routes } from '@angular/router';

import { IntroComponent } from './pages/intro/intro';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';

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
    path: '',
    loadComponent: () => import('./layout/admin-layout/admin-layout').then((m) => m.AdminLayoutComponent),
    children: [
      { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard').then((m) => m.DashboardComponent) },
      { path: 'productos', loadComponent: () => import('./pages/products/products').then((m) => m.ProductsComponent) },
      { path: 'inventarios', loadComponent: () => import('./pages/inventory/inventory').then((m) => m.InventoryComponent) },
      { path: 'pedidos', loadComponent: () => import('./pages/orders/orders').then((m) => m.OrdersComponent) },
      { path: 'clientes', loadComponent: () => import('./pages/customers/customers').then((m) => m.CustomersComponent) },
      { path: 'ventas', loadComponent: () => import('./pages/sales/sales').then((m) => m.SalesComponent) },
      { path: 'reportes', loadComponent: () => import('./pages/reports/reports').then((m) => m.ReportsComponent) },
      { path: 'configuracion', loadComponent: () => import('./pages/settings/settings').then((m) => m.SettingsComponent) },
    ]
  },
  { path: '**', redirectTo: '' }

];
