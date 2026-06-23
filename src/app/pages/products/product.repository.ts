import { Injectable } from '@angular/core';
import { LocalRepository } from '../shared/local-repository';
import { Product, ProductDraft } from './product.model';
const INITIAL: Product[]=[
 {id:'p1',sku:'TAZ-001',name:'Taza blanca para sublimación',description:'Taza cerámica de 11 oz',category:'Tazas',salePrice:8.5,cost:3.2,taxRate:15,unit:'unidad',barcode:'786100000001',supplier:'Sublima EC',active:true,createdAt:'2026-05-02T10:00:00Z',updatedAt:'2026-06-18T14:30:00Z'},
 {id:'p2',sku:'CAM-014',name:'Camiseta poliéster talla M',description:'Camiseta blanca para sublimación',category:'Textiles',salePrice:16,cost:7.5,taxRate:15,unit:'unidad',barcode:'786100000014',supplier:'Textiles Andinos',active:true,createdAt:'2026-05-10T10:00:00Z',updatedAt:'2026-06-19T10:15:00Z'},
 {id:'p3',sku:'TER-008',name:'Termo acero inoxidable 500 ml',description:'Termo doble pared',category:'Termos',salePrice:22,cost:11,taxRate:15,unit:'unidad',barcode:'786100000008',supplier:'Importadora Sur',active:false,createdAt:'2026-05-15T10:00:00Z',updatedAt:'2026-06-17T16:45:00Z'}];
@Injectable({providedIn:'root'}) export class ProductRepository extends LocalRepository<Product>{constructor(){super('danizz.products',INITIAL)} save(draft:ProductDraft,id?:string){const previous=this.items().find(x=>x.id===id);const now=new Date().toISOString();this.upsert({...draft,id:id??crypto.randomUUID(),createdAt:previous?.createdAt??now,updatedAt:now});}}
