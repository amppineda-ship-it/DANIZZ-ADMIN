import { Injectable } from '@angular/core';
import { LocalRepository } from '../shared/local-repository';
import { Order, OrderDraft } from './order.model';
const INITIAL:Order[]=[
 {id:'o1',number:'PED-001',customer:'Juan Pérez',customerDocument:'0912345678',orderDate:'2026-06-17',deliveryDate:'2026-06-21',status:'produccion',paymentStatus:'parcial',channel:'WhatsApp',lines:[{product:'Taza personalizada',quantity:12,unitPrice:8.5}],subtotal:102,discount:5,taxRate:15,tax:14.55,shipping:3,total:114.55,notes:'Diseño aprobado',updatedAt:'2026-06-19T10:00:00Z'},
 {id:'o2',number:'PED-002',customer:'Eventos ML S.A.',customerDocument:'0991234567001',orderDate:'2026-06-18',deliveryDate:'2026-06-25',status:'confirmado',paymentStatus:'pagado',channel:'Tienda',lines:[{product:'Camiseta sublimada',quantity:20,unitPrice:16}],subtotal:320,discount:20,taxRate:15,tax:45,shipping:0,total:345,notes:'Entrega corporativa',updatedAt:'2026-06-19T12:00:00Z'}
];
@Injectable({providedIn:'root'}) export class OrderRepository extends LocalRepository<Order>{constructor(){super('danizz.orders',INITIAL)}save(d:OrderDraft,id?:string){const subtotal=d.lines.reduce((a,x)=>a+x.quantity*x.unitPrice,0),tax=Math.max(0,subtotal-d.discount)*((d.taxRate??15)/100),total=subtotal-d.discount+tax+d.shipping;this.upsert({...d,id:id??crypto.randomUUID(),subtotal,tax,total,updatedAt:new Date().toISOString()})}}
