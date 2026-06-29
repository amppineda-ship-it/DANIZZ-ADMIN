import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DEFAULT_SETTINGS, SettingsData, ThemeMode } from './settings.model';
import { SettingsRepository } from './settings.repository';

type ImageTarget = 'businessLogo' | 'adminPhoto' | 'panelLogo';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class SettingsComponent implements OnInit {
  protected readonly repository = inject(SettingsRepository);
  private readonly fb = inject(FormBuilder).nonNullable;
  private readonly document = inject(DOCUMENT);

  protected readonly settings = this.repository.settings;
  protected readonly section = signal('business');
  protected readonly message = signal('');
  protected readonly error = signal('');
  protected readonly accent = signal(DEFAULT_SETTINGS.appearance.primaryColor);
  protected readonly theme = signal<ThemeMode>(DEFAULT_SETTINGS.appearance.theme);
  protected readonly sections = [
    { id: 'business', icon: 'storefront', label: 'Negocio' },
    { id: 'admin', icon: 'account_circle', label: 'Administrador' },
    { id: 'sales', icon: 'point_of_sale', label: 'Ventas' },
    { id: 'orders', icon: 'shopping_bag', label: 'Pedidos' },
    { id: 'inventory', icon: 'inventory_2', label: 'Inventario' },
    { id: 'notifications', icon: 'notifications', label: 'Notificaciones' },
    { id: 'backup', icon: 'backup', label: 'Respaldos' },
    { id: 'appearance', icon: 'palette', label: 'Apariencia' },
    { id: 'security', icon: 'admin_panel_settings', label: 'Seguridad' },
    { id: 'system', icon: 'info', label: 'Sistema' },
  ] as const;

  protected readonly activeSection = computed(() => this.sections.find((item) => item.id === this.section()) ?? this.sections[0]);
  protected readonly activeNotifications = computed(() => Object.values(this.settings().notifications).filter(Boolean).length);
  protected readonly enabledStatuses = computed(() => this.settings().orders.statuses.filter((item) => item.enabled).length);

  protected readonly businessForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(80)]],
    logo: [''],
    ruc: ['', [Validators.required, Validators.pattern(/^\d{13}$/)]],
    address: ['', [Validators.required, Validators.maxLength(140)]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s()]{7,20}$/)]],
    email: ['', [Validators.required, Validators.email]],
    instagram: ['', Validators.maxLength(60)],
    facebook: ['', Validators.maxLength(60)],
    tiktok: ['', Validators.maxLength(60)],
    website: ['', Validators.maxLength(90)],
  });

  protected readonly adminForm = this.fb.group({
    photo: [''],
    name: ['', [Validators.required, Validators.maxLength(70)]],
    username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._-]{4,30}$/)]],
    email: ['', [Validators.required, Validators.email]],
  });

  protected readonly passwordForm = this.fb.group({
    currentPassword: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', Validators.required],
  });

  protected readonly salesForm = this.fb.group({
    currency: ['USD', Validators.required],
    iva: [15, [Validators.required, Validators.min(0), Validators.max(100)]],
    maxDiscount: [20, [Validators.required, Validators.min(0), Validators.max(100)]],
    automaticInvoices: [true],
    invoicePrefix: ['FAC', [Validators.required, Validators.maxLength(8), Validators.pattern(/^[A-Z0-9-]+$/)]],
    nextInvoiceNumber: [1, [Validators.required, Validators.min(1)]],
  });

  protected readonly ordersForm = this.fb.group({
    estimatedProductionDays: [4, [Validators.required, Validators.min(1), Validators.max(60)]],
    advancePercent: [50, [Validators.required, Validators.min(0), Validators.max(100)]],
    confirmation: ['', [Validators.required, Validators.maxLength(260)]],
    ready: ['', [Validators.required, Validators.maxLength(260)]],
    delivery: ['', [Validators.required, Validators.maxLength(260)]],
  });

  protected readonly inventoryForm = this.fb.group({
    minimumStockAlert: [5, [Validators.required, Validators.min(0), Validators.max(999)]],
    alertsEnabled: [true],
    defaultCategories: ['', [Validators.required, Validators.maxLength(400)]],
  });

  protected readonly notificationsForm = this.fb.group({
    orders: [true],
    lowStock: [true],
    deliveryReminders: [true],
    automaticEmails: [false],
  });

  protected readonly appearanceForm = this.fb.group({
    theme: ['light' as ThemeMode, Validators.required],
    primaryColor: ['#0b57d0', [Validators.required, Validators.pattern(/^#[0-9a-fA-F]{6}$/)]],
    panelLogo: [''],
  });

  protected readonly securityForm = this.fb.group({
    sessionTimeoutMinutes: [30, [Validators.required, Validators.min(5), Validators.max(480)]],
  });

  ngOnInit(): void {
    this.hydrateForms();
    this.applyAppearance(this.settings().appearance);
    this.appearanceForm.controls.theme.valueChanges.subscribe((value) => {
      this.theme.set(value);
      this.applyAppearance({ ...this.settings().appearance, theme: value });
    });
    this.appearanceForm.controls.primaryColor.valueChanges.subscribe((value) => {
      this.accent.set(value);
      this.applyAppearance({ ...this.settings().appearance, primaryColor: value });
    });
  }

  protected selectSection(id: string): void {
    this.section.set(id);
    this.error.set('');
  }

  protected saveBusiness(): void {
    if (this.businessForm.invalid) return this.invalid(this.businessForm);
    const value = this.businessForm.getRawValue();
    this.repository.patch('business', {
      name: value.name.trim(),
      logo: value.logo,
      ruc: value.ruc.trim(),
      address: value.address.trim(),
      phone: value.phone.trim(),
      email: value.email.trim().toLowerCase(),
      social: {
        instagram: value.instagram.trim(),
        facebook: value.facebook.trim(),
        tiktok: value.tiktok.trim(),
        website: value.website.trim(),
      },
    });
    this.notify('Informacion del negocio guardada.');
  }

  protected saveAdmin(): void {
    if (this.adminForm.invalid) return this.invalid(this.adminForm);
    const value = this.adminForm.getRawValue();
    this.repository.patch('admin', {
      photo: value.photo,
      name: value.name.trim(),
      username: value.username.trim(),
      email: value.email.trim().toLowerCase(),
    });
    this.notify('Perfil del administrador actualizado.');
  }

  protected changePassword(): void {
    if (this.passwordForm.invalid) return this.invalid(this.passwordForm);
    const value = this.passwordForm.getRawValue();
    if (value.newPassword !== value.confirmPassword) {
      this.error.set('La confirmacion no coincide con la nueva contrasena.');
      return;
    }
    if (value.currentPassword.length < 4) {
      this.error.set('Ingresa la contrasena actual para continuar.');
      return;
    }
    this.repository.patch('security', {
      ...this.settings().security,
      passwordUpdatedAt: new Date().toISOString(),
    });
    this.passwordForm.reset({ currentPassword: '', newPassword: '', confirmPassword: '' });
    this.notify('Contrasena actualizada correctamente.');
  }

  protected saveSales(): void {
    if (this.salesForm.invalid) return this.invalid(this.salesForm);
    const value = this.salesForm.getRawValue();
    if (value.maxDiscount > 80 && !this.document.defaultView?.confirm('El descuento maximo supera el 80%. Deseas guardarlo?')) return;
    this.repository.patch('sales', {
      ...value,
      invoicePrefix: value.invoicePrefix.trim().toUpperCase(),
    });
    this.notify('Configuracion de ventas guardada.');
  }

  protected saveOrders(): void {
    if (this.ordersForm.invalid) return this.invalid(this.ordersForm);
    const value = this.ordersForm.getRawValue();
    this.repository.patch('orders', {
      ...this.settings().orders,
      estimatedProductionDays: value.estimatedProductionDays,
      advancePercent: value.advancePercent,
      templates: {
        confirmation: value.confirmation.trim(),
        ready: value.ready.trim(),
        delivery: value.delivery.trim(),
      },
    });
    this.notify('Configuracion de pedidos guardada.');
  }

  protected toggleOrderStatus(key: string): void {
    const statuses = this.settings().orders.statuses.map((status) => status.key === key ? { ...status, enabled: !status.enabled } : status);
    if (!statuses.some((status) => status.enabled)) {
      this.error.set('Debe quedar al menos un estado de pedido activo.');
      return;
    }
    this.repository.patch('orders', { ...this.settings().orders, statuses });
    this.notify('Estados de pedidos actualizados.');
  }

  protected saveInventory(): void {
    if (this.inventoryForm.invalid) return this.invalid(this.inventoryForm);
    const value = this.inventoryForm.getRawValue();
    const categories = value.defaultCategories.split('\n').map((item) => item.trim()).filter(Boolean);
    if (!categories.length) {
      this.error.set('Agrega al menos una categoria predeterminada.');
      return;
    }
    this.repository.patch('inventory', {
      minimumStockAlert: value.minimumStockAlert,
      alertsEnabled: value.alertsEnabled,
      defaultCategories: [...new Set(categories)],
    });
    this.notify('Configuracion de inventario guardada.');
  }

  protected saveNotifications(): void {
    this.repository.patch('notifications', this.notificationsForm.getRawValue());
    this.notify('Preferencias de notificaciones guardadas.');
  }

  protected saveAppearance(): void {
    if (this.appearanceForm.invalid) return this.invalid(this.appearanceForm);
    const value = this.appearanceForm.getRawValue();
    this.repository.patch('appearance', value);
    this.applyAppearance(value);
    this.notify('Apariencia actualizada.');
  }

  protected saveSecurity(): void {
    if (this.securityForm.invalid) return this.invalid(this.securityForm);
    this.repository.patch('security', {
      ...this.settings().security,
      sessionTimeoutMinutes: this.securityForm.controls.sessionTimeoutMinutes.value,
    });
    this.notify('Configuracion de seguridad guardada.');
  }

  protected closeAllSessions(): void {
    if (!this.document.defaultView?.confirm('Deseas cerrar todas las sesiones activas?')) return;
    this.repository.patch('security', { ...this.settings().security, activeSessions: 0 });
    this.notify('Sesiones activas cerradas.');
  }

  protected cancel(): void {
    this.hydrateForms();
    this.error.set('');
    this.notify('Cambios descartados.');
  }

  protected createBackup(download = false): void {
    const name = `danizz-respaldo-${new Date().toISOString().slice(0, 10)}.json`;
    const backup = this.repository.markBackup(name);
    if (download) this.downloadJson(name, backup);
    this.hydrateForms();
    this.notify(download ? 'Respaldo creado y descargado.' : 'Respaldo creado correctamente.');
  }

  protected downloadBackup(): void {
    const name = this.settings().backup.lastBackupName ?? `danizz-respaldo-${new Date().toISOString().slice(0, 10)}.json`;
    this.downloadJson(name, this.settings());
    this.notify('Respaldo descargado.');
  }

  protected restoreBackup(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    if (!this.document.defaultView?.confirm('Restaurar el respaldo reemplazara la configuracion actual. Continuar?')) {
      input.value = '';
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      try {
        this.repository.restore(JSON.parse(String(reader.result)));
        this.hydrateForms();
        this.applyAppearance(this.settings().appearance);
        this.notify('Respaldo restaurado correctamente.');
      } catch (err) {
        this.error.set(err instanceof Error ? err.message : 'No se pudo restaurar el respaldo.');
      } finally {
        input.value = '';
      }
    };
    reader.readAsText(file);
  }

  protected loadImage(event: Event, target: ImageTarget): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      this.error.set('Selecciona un archivo de imagen valido.');
      return;
    }
    if (file.size > 1_500_000) {
      this.error.set('La imagen no debe superar 1.5 MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result);
      if (target === 'businessLogo') this.businessForm.controls.logo.setValue(result);
      if (target === 'adminPhoto') this.adminForm.controls.photo.setValue(result);
      if (target === 'panelLogo') this.appearanceForm.controls.panelLogo.setValue(result);
    };
    reader.readAsDataURL(file);
  }

  protected initials(name: string): string {
    return name.split(' ').filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join('') || 'D';
  }

  protected trackByKey(_: number, item: { readonly key: string }): string {
    return item.key;
  }

  private hydrateForms(): void {
    const current = this.settings();
    this.businessForm.reset({
      ...current.business,
      instagram: current.business.social.instagram,
      facebook: current.business.social.facebook,
      tiktok: current.business.social.tiktok,
      website: current.business.social.website,
    });
    this.adminForm.reset(current.admin);
    this.salesForm.reset(current.sales);
    this.ordersForm.reset({
      estimatedProductionDays: current.orders.estimatedProductionDays,
      advancePercent: current.orders.advancePercent,
      confirmation: current.orders.templates.confirmation,
      ready: current.orders.templates.ready,
      delivery: current.orders.templates.delivery,
    });
    this.inventoryForm.reset({
      minimumStockAlert: current.inventory.minimumStockAlert,
      alertsEnabled: current.inventory.alertsEnabled,
      defaultCategories: current.inventory.defaultCategories.join('\n'),
    });
    this.notificationsForm.reset(current.notifications);
    this.appearanceForm.reset(current.appearance);
    this.securityForm.reset({ sessionTimeoutMinutes: current.security.sessionTimeoutMinutes });
    this.accent.set(current.appearance.primaryColor);
    this.theme.set(current.appearance.theme);
  }

  private applyAppearance(value: SettingsData['appearance']): void {
    this.accent.set(value.primaryColor);
    this.theme.set(value.theme);
    this.document.body.classList.toggle('danizz-dark', value.theme === 'dark');
    this.document.documentElement.style.setProperty('--danizz-primary', value.primaryColor);
  }

  private downloadJson(name: string, settings: SettingsData): void {
    const url = URL.createObjectURL(new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' }));
    const anchor = this.document.createElement('a');
    anchor.href = url;
    anchor.download = name;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  private invalid(form: { markAllAsTouched: () => void }): void {
    form.markAllAsTouched();
    this.error.set('Revisa los campos marcados antes de guardar.');
  }

  private notify(text: string): void {
    this.error.set('');
    this.message.set(text);
    setTimeout(() => this.message.set(''), 2800);
  }
}
