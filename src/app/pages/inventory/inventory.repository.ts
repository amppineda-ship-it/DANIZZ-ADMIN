import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { InventoryItem, InventoryItemDraft, InventoryMovement, MovementType } from './inventory.model';

const INITIAL_ITEMS: InventoryItem[] = [
  { id:'1', sku:'TAZ-001', name:'Taza blanca para sublimación', category:'Tazas', unit:'unidades', location:'A-01', stock:48, minimumStock:12, updatedAt:'2026-06-18T14:30:00.000Z' },
  { id:'2', sku:'CAM-014', name:'Camiseta poliéster talla M', category:'Textiles', unit:'unidades', location:'B-03', stock:8, minimumStock:10, updatedAt:'2026-06-19T10:15:00.000Z' },
  { id:'3', sku:'TER-008', name:'Termo acero inoxidable 500 ml', category:'Termos', unit:'unidades', location:'A-06', stock:0, minimumStock:6, updatedAt:'2026-06-17T16:45:00.000Z' },
  { id:'4', sku:'VIN-020', name:'Vinilo textil negro', category:'Insumos', unit:'metros', location:'C-02', stock:26, minimumStock:8, updatedAt:'2026-06-19T08:20:00.000Z' },
  { id:'5', sku:'LLA-005', name:'Llavero acrílico cuadrado', category:'Llaveros', unit:'unidades', location:'A-09', stock:11, minimumStock:15, updatedAt:'2026-06-16T12:00:00.000Z' },
  { id:'6', sku:'PAP-011', name:'Papel de sublimación A4', category:'Insumos', unit:'paquetes', location:'C-01', stock:19, minimumStock:5, updatedAt:'2026-06-18T09:10:00.000Z' },
];

@Injectable({ providedIn:'root' })
export class InventoryRepository {
  private readonly itemKey = 'danizz.inventory.items';
  private readonly movementKey = 'danizz.inventory.movements';
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly itemsState = signal<InventoryItem[]>(this.read(this.itemKey, INITIAL_ITEMS));
  private readonly movementsState = signal<InventoryMovement[]>(this.read(this.movementKey, []));
  readonly items = this.itemsState.asReadonly();
  readonly movements = this.movementsState.asReadonly();

  save(draft: InventoryItemDraft, id?: string): void {
    const now = new Date().toISOString();
    this.itemsState.update((items) => id
      ? items.map((item) => item.id === id ? { ...draft, id, updatedAt:now } : item)
      : [{ ...draft, id:crypto.randomUUID(), updatedAt:now }, ...items]);
    this.persistItems();
  }

  delete(id: string): void {
    this.itemsState.update((items) => items.filter((item) => item.id !== id));
    this.persistItems();
  }

  registerMovement(itemId: string, type: MovementType, quantity: number, reason: string): void {
    const item = this.itemsState().find((candidate) => candidate.id === itemId);
    if (!item) throw new Error('El producto ya no existe.');
    const resultingStock = type === 'entry' ? item.stock + quantity : type === 'exit' ? item.stock - quantity : quantity;
    if (resultingStock < 0) throw new Error('La salida supera el stock disponible.');
    const createdAt = new Date().toISOString();
    this.itemsState.update((items) => items.map((candidate) => candidate.id === itemId ? { ...candidate, stock:resultingStock, updatedAt:createdAt } : candidate));
    this.movementsState.update((movements) => [{ id:crypto.randomUUID(), itemId, itemName:item.name, type, quantity, previousStock:item.stock, resultingStock, reason, createdAt }, ...movements].slice(0, 100));
    this.persistItems();
    this.write(this.movementKey, this.movementsState());
  }

  private persistItems(): void { this.write(this.itemKey, this.itemsState()); }
  private read<T>(key: string, fallback: T): T {
    if (!this.browser) return fallback;
    try { const value = localStorage.getItem(key); return value ? JSON.parse(value) as T : fallback; } catch { return fallback; }
  }
  private write(key: string, value: unknown): void {
    if (this.browser) localStorage.setItem(key, JSON.stringify(value));
  }
}
