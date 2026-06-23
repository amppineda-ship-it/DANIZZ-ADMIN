export interface MenuItem { readonly label: string; readonly icon: string; readonly route: string; readonly badge?: number; }
export interface MenuGroup { readonly label: string; readonly items: readonly MenuItem[]; }

export const MENU_GROUPS: readonly MenuGroup[] = [
  { label: 'Principal', items: [{ label: 'Dashboard', icon: 'dashboard', route: '/dashboard' }] },
  { label: 'Operación', items: [
    { label: 'Productos', icon: 'inventory_2', route: '/productos' },
    { label: 'Inventarios', icon: 'warehouse', route: '/inventarios' },
    { label: 'Pedidos', icon: 'shopping_bag', route: '/pedidos', badge: 5 },
  ] },
  { label: 'Comercial', items: [
    { label: 'Clientes', icon: 'groups', route: '/clientes' },
    { label: 'Ventas', icon: 'payments', route: '/ventas' },
  ] },
  { label: 'Análisis', items: [{ label: 'Reportes', icon: 'bar_chart', route: '/reportes' }] },
];

export const SETTINGS_ITEM: MenuItem = { label: 'Configuración', icon: 'settings', route: '/configuracion' };
