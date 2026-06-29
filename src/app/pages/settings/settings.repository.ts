import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { DEFAULT_SETTINGS, SettingsData } from './settings.model';

@Injectable({ providedIn: 'root' })
export class SettingsRepository {
  private readonly key = 'danizz.settings';
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly state = signal<SettingsData>(this.read());
  readonly settings = this.state.asReadonly();

  save(settings: SettingsData): void {
    this.state.set(settings);
    this.persist();
  }

  patch<K extends keyof SettingsData>(section: K, value: SettingsData[K]): void {
    this.save({ ...this.state(), [section]: value });
  }

  markBackup(name: string): SettingsData {
    const updated: SettingsData = {
      ...this.state(),
      backup: { lastBackupAt: new Date().toISOString(), lastBackupName: name },
    };
    this.save(updated);
    return updated;
  }

  restore(value: unknown): void {
    if (!this.isSettingsData(value)) throw new Error('El archivo no contiene una configuracion valida.');
    this.save(value);
  }

  private read(): SettingsData {
    if (!this.browser) return DEFAULT_SETTINGS;
    try {
      const value = localStorage.getItem(this.key);
      return value ? { ...DEFAULT_SETTINGS, ...JSON.parse(value) as SettingsData } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  }

  private persist(): void {
    if (this.browser) localStorage.setItem(this.key, JSON.stringify(this.state()));
  }

  private isSettingsData(value: unknown): value is SettingsData {
    if (!value || typeof value !== 'object') return false;
    const candidate = value as Partial<SettingsData>;
    return Boolean(
      candidate.business &&
      candidate.admin &&
      candidate.sales &&
      candidate.orders &&
      candidate.inventory &&
      candidate.notifications &&
      candidate.appearance &&
      candidate.security &&
      candidate.system &&
      candidate.loginHistory,
    );
  }
}
