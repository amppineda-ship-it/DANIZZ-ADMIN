export type ThemeMode = 'light' | 'dark';

export interface OrderStatusSetting {
  readonly key: string;
  readonly label: string;
  readonly enabled: boolean;
}

export interface LoginHistoryEntry {
  readonly id: string;
  readonly user: string;
  readonly date: string;
  readonly ip: string;
  readonly device: string;
  readonly status: 'success' | 'blocked';
}

export interface SettingsData {
  readonly business: {
    readonly name: string;
    readonly logo: string;
    readonly ruc: string;
    readonly address: string;
    readonly phone: string;
    readonly email: string;
    readonly social: {
      readonly instagram: string;
      readonly facebook: string;
      readonly tiktok: string;
      readonly website: string;
    };
  };
  readonly admin: {
    readonly photo: string;
    readonly name: string;
    readonly username: string;
    readonly email: string;
  };
  readonly sales: {
    readonly currency: string;
    readonly iva: number;
    readonly maxDiscount: number;
    readonly automaticInvoices: boolean;
    readonly invoicePrefix: string;
    readonly nextInvoiceNumber: number;
  };
  readonly orders: {
    readonly statuses: readonly OrderStatusSetting[];
    readonly estimatedProductionDays: number;
    readonly advancePercent: number;
    readonly templates: {
      readonly confirmation: string;
      readonly ready: string;
      readonly delivery: string;
    };
  };
  readonly inventory: {
    readonly minimumStockAlert: number;
    readonly alertsEnabled: boolean;
    readonly defaultCategories: readonly string[];
  };
  readonly notifications: {
    readonly orders: boolean;
    readonly lowStock: boolean;
    readonly deliveryReminders: boolean;
    readonly automaticEmails: boolean;
  };
  readonly backup: {
    readonly lastBackupAt: string | null;
    readonly lastBackupName: string | null;
  };
  readonly appearance: {
    readonly theme: ThemeMode;
    readonly primaryColor: string;
    readonly panelLogo: string;
  };
  readonly security: {
    readonly sessionTimeoutMinutes: number;
    readonly passwordUpdatedAt: string;
    readonly activeSessions: number;
  };
  readonly system: {
    readonly version: string;
    readonly lastUpdate: string;
    readonly databaseStatus: string;
    readonly developers: readonly string[];
  };
  readonly loginHistory: readonly LoginHistoryEntry[];
}

export const DEFAULT_SETTINGS: SettingsData = {
  business: {
    name: 'DANIZZ Detalles Personalizados',
    logo: 'assets/Logo.png',
    ruc: '0999999999001',
    address: 'Guayaquil, Ecuador',
    phone: '+593 99 000 0000',
    email: 'ventas@danizz.com',
    social: {
      instagram: '@danizz.ec',
      facebook: 'DANIZZ Personalizados',
      tiktok: '@danizz.ec',
      website: 'https://danizz.ec',
    },
  },
  admin: {
    photo: '',
    name: 'Administrador DANIZZ',
    username: 'admin',
    email: 'admin@danizz.com',
  },
  sales: {
    currency: 'USD',
    iva: 15,
    maxDiscount: 20,
    automaticInvoices: true,
    invoicePrefix: 'FAC',
    nextInvoiceNumber: 128,
  },
  orders: {
    statuses: [
      { key: 'pendiente', label: 'Pendiente', enabled: true },
      { key: 'produccion', label: 'En produccion', enabled: true },
      { key: 'listo', label: 'Listo para entregar', enabled: true },
      { key: 'entregado', label: 'Entregado', enabled: true },
      { key: 'cancelado', label: 'Cancelado', enabled: true },
    ],
    estimatedProductionDays: 4,
    advancePercent: 50,
    templates: {
      confirmation: 'Hola {cliente}, recibimos tu pedido {pedido}. Te avisaremos cuando entre a produccion.',
      ready: 'Hola {cliente}, tu pedido {pedido} esta listo para entregar.',
      delivery: 'Hola {cliente}, confirmamos la entrega de tu pedido {pedido}. Gracias por confiar en DANIZZ.',
    },
  },
  inventory: {
    minimumStockAlert: 5,
    alertsEnabled: true,
    defaultCategories: ['Tazas', 'Textiles', 'Sublimacion', 'Papeleria', 'Vinilos'],
  },
  notifications: {
    orders: true,
    lowStock: true,
    deliveryReminders: true,
    automaticEmails: false,
  },
  backup: {
    lastBackupAt: null,
    lastBackupName: null,
  },
  appearance: {
    theme: 'light',
    primaryColor: '#0b57d0',
    panelLogo: 'assets/Logo.png',
  },
  security: {
    sessionTimeoutMinutes: 30,
    passwordUpdatedAt: '2026-06-19T14:00:00.000Z',
    activeSessions: 3,
  },
  system: {
    version: '1.0.0',
    lastUpdate: '2026-06-18',
    databaseStatus: 'Operativa',
    developers: ['Equipo DANIZZ', 'OpenAI Codex'],
  },
  loginHistory: [
    {
      id: 'login-1',
      user: 'admin',
      date: '2026-06-23T13:34:00.000Z',
      ip: '192.168.1.24',
      device: 'Chrome en Windows',
      status: 'success',
    },
    {
      id: 'login-2',
      user: 'admin',
      date: '2026-06-22T21:10:00.000Z',
      ip: '192.168.1.24',
      device: 'Edge en Windows',
      status: 'success',
    },
    {
      id: 'login-3',
      user: 'admin',
      date: '2026-06-21T04:12:00.000Z',
      ip: '181.198.12.44',
      device: 'Firefox en Linux',
      status: 'blocked',
    },
  ],
};
