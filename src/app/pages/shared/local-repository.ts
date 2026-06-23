import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject, signal } from '@angular/core';

export abstract class LocalRepository<T extends { readonly id: string }> {
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly state;
  readonly items;

  protected constructor(private readonly key: string, initial: T[]) {
    this.state = signal<T[]>(this.read(initial));
    this.items = this.state.asReadonly();
  }

  protected upsert(item: T): void {
    this.state.update((items) => items.some(({ id }) => id === item.id)
      ? items.map((current) => current.id === item.id ? item : current)
      : [item, ...items]);
    this.persist();
  }

  delete(id: string): void {
    this.state.update((items) => items.filter((item) => item.id !== id));
    this.persist();
  }

  protected replace(items: T[]): void { this.state.set(items); this.persist(); }

  private read(fallback: T[]): T[] {
    if (!this.browser) return fallback;
    try { const value = localStorage.getItem(this.key); return value ? JSON.parse(value) as T[] : fallback; }
    catch { return fallback; }
  }

  private persist(): void { if (this.browser) localStorage.setItem(this.key, JSON.stringify(this.state())); }
}
