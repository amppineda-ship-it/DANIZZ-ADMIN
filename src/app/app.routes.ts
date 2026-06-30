import { Routes } from '@angular/router';

import { IntroComponent } from './pages/intro/intro';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';

export const routes: Routes = [

  {
    path: '',
    loadComponent: () => import('./pages/client-store/client-store').then((m) => m.ClientStoreComponent)
  },

  {
    path: 'bienvenida',
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
    path: 'categorias/tazas',
    loadComponent: () => import('./pages/client-store/category-page/category-page').then((m) => m.CategoryPageComponent),
    data: {
      category: 'Tazas Personalizadas',
      title: 'Tazas Personalizadas',
      subtitle: 'Tazas sublimadas con fotos, ilustraciones, frases y diseños especiales para regalos o marcas.'
    }
  },

  {
    path: 'categorias/camisetas',
    loadComponent: () => import('./pages/client-store/category-page/category-page').then((m) => m.CategoryPageComponent),
    data: {
      category: 'Camisetas del Mundial',
      title: 'Camisetas del Mundial',
      subtitle: 'Camisetas deportivas personalizadas con nombre, número y acabados listos para alentar.'
    }
  },

  {
    path: 'categorias/uniformes-futbol',
    loadComponent: () => import('./pages/client-store/category-page/category-page').then((m) => m.CategoryPageComponent),
    data: {
      category: 'Uniformes Completos de Futbol',
      title: 'Uniformes Completos de Fútbol',
      subtitle: 'Conjuntos completos para equipos, clubes, academias y torneos con sublimación resistente.'
    }
  },

  {
    path: 'categorias/calentadores',
    loadComponent: () => import('./pages/client-store/category-page/category-page').then((m) => m.CategoryPageComponent),
    data: {
      category: 'Calentadores Personalizados',
      title: 'Calentadores Personalizados',
      subtitle: 'Prendas cómodas para entrenamiento, viaje o presentación de equipo con identidad propia.'
    }
  },

  {
    path: 'personalizado',
    loadComponent: () => import('./pages/client-store/custom-order-page/custom-order-page').then((m) => m.CustomOrderPageComponent)
  },

  {
    path: 'contacto',
    loadComponent: () => import('./pages/client-store/contact-page/contact-page').then((m) => m.ContactPageComponent)
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
