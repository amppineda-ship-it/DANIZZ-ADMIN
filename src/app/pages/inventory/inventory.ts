import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InventoryItem, InventoryItemDraft, InventoryStatus, MovementType, getInventoryStatus } from './inventory.model';
import { InventoryRepository } from './inventory.repository';

@Component({ selector:'app-inventory', standalone:true, imports:[CommonModule,ReactiveFormsModule], templateUrl:'./inventory.html', styleUrl:'./inventory.scss' })
export class InventoryComponent {
  protected readonly repository = inject(InventoryRepository);
  private readonly fb = inject(FormBuilder).nonNullable;
  private readonly document = inject(DOCUMENT);
  protected readonly search = signal('');
  protected readonly category = signal('all');
  protected readonly status = signal<InventoryStatus | 'all'>('all');
  protected readonly editorOpen = signal(false);
  protected readonly movementOpen = signal(false);
  protected readonly editingId = signal<string | null>(null);
  protected readonly selectedItem = signal<InventoryItem | null>(null);
  protected readonly message = signal('');
  protected readonly error = signal('');
  protected readonly movementTypes: readonly { value:MovementType; label:string }[] = [{value:'entry',label:'Entrada'},{value:'exit',label:'Salida'},{value:'adjustment',label:'Ajuste de inventario'}];
  protected readonly statusLabels: Record<InventoryStatus,string> = { ok:'Disponible', low:'Stock bajo', out:'Agotado' };
  protected readonly categories = computed(() => [...new Set(this.repository.items().map((item) => item.category))].sort());
  protected readonly filteredItems = computed(() => {
    const query = this.search().trim().toLocaleLowerCase();
    return this.repository.items().filter((item) => (!query || `${item.name} ${item.sku} ${item.location}`.toLocaleLowerCase().includes(query)) && (this.category() === 'all' || item.category === this.category()) && (this.status() === 'all' || getInventoryStatus(item) === this.status()));
  });
  protected readonly totalUnits = computed(() => this.repository.items().reduce((total,item) => total + item.stock, 0));
  protected readonly lowStockCount = computed(() => this.repository.items().filter((item) => getInventoryStatus(item) === 'low').length);
  protected readonly outOfStockCount = computed(() => this.repository.items().filter((item) => getInventoryStatus(item) === 'out').length);
  protected readonly recentMovements = computed(() => this.repository.movements().slice(0, 5));

  protected readonly itemForm = this.fb.group({
    sku:['',[Validators.required,Validators.maxLength(20)]], name:['',[Validators.required,Validators.maxLength(80)]], category:['',[Validators.required,Validators.maxLength(40)]], unit:['unidades',Validators.required], location:['',[Validators.required,Validators.maxLength(20)]], stock:[0,[Validators.required,Validators.min(0)]], minimumStock:[0,[Validators.required,Validators.min(0)]],
  });
  protected readonly movementForm = this.fb.group({ type:['entry' as MovementType,Validators.required], quantity:[1,[Validators.required,Validators.min(0)]], reason:['',[Validators.required,Validators.maxLength(120)]] });

  protected getStatus(item: InventoryItem): InventoryStatus { return getInventoryStatus(item); }
  protected openCreate(): void { this.error.set(''); this.editingId.set(null); this.itemForm.reset({sku:'',name:'',category:'',unit:'unidades',location:'',stock:0,minimumStock:0}); this.editorOpen.set(true); }
  protected openEdit(item: InventoryItem): void { this.error.set(''); this.editingId.set(item.id); this.itemForm.reset({sku:item.sku,name:item.name,category:item.category,unit:item.unit,location:item.location,stock:item.stock,minimumStock:item.minimumStock}); this.editorOpen.set(true); }
  protected closeEditor(): void { this.editorOpen.set(false); this.error.set(''); this.itemForm.markAsUntouched(); }
  protected saveItem(): void {
    if (this.itemForm.invalid) { this.itemForm.markAllAsTouched(); return; }
    const draft: InventoryItemDraft = this.itemForm.getRawValue();
    const duplicate = this.repository.items().some((item) => item.sku.toLowerCase() === draft.sku.trim().toLowerCase() && item.id !== this.editingId());
    if (duplicate) { this.error.set('Ya existe un producto con ese SKU.'); return; }
    this.repository.save({ ...draft, sku:draft.sku.trim().toUpperCase(), name:draft.name.trim(), category:draft.category.trim(), location:draft.location.trim().toUpperCase() }, this.editingId() ?? undefined);
    this.closeEditor(); this.notify(this.editingId() ? 'Producto actualizado correctamente.' : 'Producto agregado al inventario.');
  }
  protected openMovement(item: InventoryItem): void { this.selectedItem.set(item); this.movementForm.reset({type:'entry',quantity:1,reason:''}); this.error.set(''); this.movementOpen.set(true); }
  protected closeMovement(): void { this.movementOpen.set(false); this.selectedItem.set(null); this.error.set(''); }
  protected saveMovement(): void {
    if (this.movementForm.invalid || !this.selectedItem()) { this.movementForm.markAllAsTouched(); return; }
    const value = this.movementForm.getRawValue();
    if (value.type !== 'adjustment' && value.quantity === 0) { this.error.set('La cantidad debe ser mayor que cero.'); return; }
    try { this.repository.registerMovement(this.selectedItem()!.id,value.type,value.quantity,value.reason.trim()); this.closeMovement(); this.notify('Movimiento registrado correctamente.'); } catch (err) { this.error.set(err instanceof Error ? err.message : 'No se pudo registrar el movimiento.'); }
  }
  protected deleteItem(item: InventoryItem): void { if (this.document.defaultView?.confirm(`¿Eliminar ${item.name} del inventario?`)) { this.repository.delete(item.id); this.notify('Producto eliminado del inventario.'); } }
  protected clearFilters(): void { this.search.set(''); this.category.set('all'); this.status.set('all'); }
  protected exportCsv(): void {
    const rows = [['SKU','Producto','Categoría','Ubicación','Stock','Unidad','Stock mínimo','Estado'],...this.filteredItems().map((item) => [item.sku,item.name,item.category,item.location,String(item.stock),item.unit,String(item.minimumStock),this.statusLabels[getInventoryStatus(item)]])];
    const csv = rows.map((row) => row.map((cell) => `"${cell.replaceAll('"','""')}"`).join(',')).join('\n');
    const url = URL.createObjectURL(new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8'})); const anchor=this.document.createElement('a'); anchor.href=url; anchor.download=`inventario-${new Date().toISOString().slice(0,10)}.csv`; anchor.click(); URL.revokeObjectURL(url); this.notify('Inventario exportado en formato CSV.');
  }
  protected setSearch(event: Event): void { this.search.set((event.target as HTMLInputElement).value); }
  protected setCategory(event: Event): void { this.category.set((event.target as HTMLSelectElement).value); }
  protected setStatus(event: Event): void { this.status.set((event.target as HTMLSelectElement).value as InventoryStatus|'all'); }
  private notify(text:string):void { this.error.set(''); this.message.set(text); setTimeout(() => this.message.set(''),3000); }
}
