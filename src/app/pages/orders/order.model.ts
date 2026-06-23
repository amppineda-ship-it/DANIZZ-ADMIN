export type OrderStatus = 'pendiente'|'confirmado'|'produccion'|'listo'|'entregado'|'cancelado';
export type PaymentStatus = 'pendiente'|'parcial'|'pagado';
export interface OrderLine { readonly product:string; readonly quantity:number; readonly unitPrice:number; }
export interface Order { readonly id:string; readonly number:string; readonly customer:string; readonly customerDocument:string; readonly orderDate:string; readonly deliveryDate:string; readonly status:OrderStatus; readonly paymentStatus:PaymentStatus; readonly channel:string; readonly lines:readonly OrderLine[]; readonly subtotal:number; readonly discount:number; readonly taxRate?:number; readonly tax:number; readonly shipping:number; readonly total:number; readonly notes:string; readonly updatedAt:string; }
export type OrderDraft = Omit<Order,'id'|'updatedAt'|'subtotal'|'tax'|'total'>;
