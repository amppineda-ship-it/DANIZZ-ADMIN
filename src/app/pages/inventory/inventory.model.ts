export type InventoryStatus = 'ok' | 'low' | 'out';
export type MovementType = 'entry' | 'exit' | 'adjustment';

export interface InventoryItem {
  readonly id: string;
  readonly sku: string;
  readonly name: string;
  readonly category: string;
  readonly unit: string;
  readonly location: string;
  readonly stock: number;
  readonly minimumStock: number;
  readonly updatedAt: string;
}

export interface InventoryMovement {
  readonly id: string;
  readonly itemId: string;
  readonly itemName: string;
  readonly type: MovementType;
  readonly quantity: number;
  readonly previousStock: number;
  readonly resultingStock: number;
  readonly reason: string;
  readonly createdAt: string;
}

export type InventoryItemDraft = Omit<InventoryItem, 'id' | 'updatedAt'>;

export function getInventoryStatus(item: InventoryItem): InventoryStatus {
  if (item.stock === 0) return 'out';
  return item.stock <= item.minimumStock ? 'low' : 'ok';
}
