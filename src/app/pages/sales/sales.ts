import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { downloadPdf } from '../shared/pdf-export';
import { PaymentMethod, Sale, SaleDraft, SaleStatus } from './sale.model';
import { SaleRepository } from './sale.repository';

@Component({ selector:'app-sales', standalone:true, imports:[CommonModule,ReactiveFormsModule], templateUrl:'./sales.html', styleUrls:['../shared/crud.scss'] })
export class SalesComponent {
  protected readonly repo=inject(SaleRepository); private readonly fb=inject(FormBuilder).nonNullable; private readonly doc=inject(DOCUMENT);
  protected readonly search=signal(''); protected readonly status=signal('all'); protected readonly editor=signal(false); protected readonly editing=signal<string|null>(null); protected readonly message=signal('');
  protected readonly labels:Record<string,string>={borrador:'Borrador',emitida:'Emitida',pagada:'Pagada',anulada:'Anulada'};
  protected readonly filtered=computed(()=>{const q=this.search().toLowerCase();return this.repo.items().filter(x=>(!q||`${x.invoiceNumber} ${x.customer} ${x.orderNumber}`.toLowerCase().includes(q))&&(this.status()==='all'||x.status===this.status()))});
  protected readonly income=computed(()=>this.repo.items().filter(x=>x.status==='pagada').reduce((a,x)=>a+x.total,0));
  protected readonly receivable=computed(()=>this.repo.items().filter(x=>x.status==='emitida').reduce((a,x)=>a+x.total,0));
  protected readonly issued=computed(()=>this.repo.items().filter(x=>x.status==='emitida'||x.status==='pagada'));
  protected readonly form=this.fb.group({invoiceNumber:['',Validators.required],orderNumber:[''],customer:['',Validators.required],customerDocument:['',[Validators.required,Validators.pattern(/^\d{10}(\d{3})?$/)]],issueDate:['',Validators.required],dueDate:['',Validators.required],paymentMethod:['efectivo' as PaymentMethod,Validators.required],status:['emitida' as SaleStatus,Validators.required],description:['',Validators.required],quantity:[1,[Validators.required,Validators.min(1)]],unitPrice:[0,[Validators.required,Validators.min(.01)]],discount:[0,[Validators.required,Validators.min(0)]],taxRate:[15,[Validators.required,Validators.min(0),Validators.max(100)]],notes:['',Validators.maxLength(300)]});
  protected readonly estimate=computed(()=>{const v=this.form.getRawValue(),s=v.quantity*v.unitPrice;return s-v.discount+Math.max(0,s-v.discount)*(v.taxRate/100)});

  protected open(x?:Sale){this.editing.set(x?.id??null);this.form.reset(x?{...x,taxRate:x.taxRate??15}:{invoiceNumber:`FAC-001-001-${String(this.repo.items().length+1).padStart(9,'0')}`,orderNumber:'',customer:'',customerDocument:'',issueDate:new Date().toISOString().slice(0,10),dueDate:new Date().toISOString().slice(0,10),paymentMethod:'efectivo',status:'emitida',description:'',quantity:1,unitPrice:0,discount:0,taxRate:15,notes:''});this.editor.set(true)}
  protected close(){this.editor.set(false)}
  protected save(){if(this.form.invalid){this.form.markAllAsTouched();return}const v=this.form.getRawValue();if(v.dueDate<v.issueDate)return void alert('El vencimiento no puede ser anterior a la emision.');if(this.repo.items().some(x=>x.invoiceNumber===v.invoiceNumber&&x.id!==this.editing()))return void alert('El numero de comprobante ya existe.');this.repo.save(v as SaleDraft,this.editing()??undefined);this.close();this.notify('Venta guardada correctamente.')}
  protected remove(x:Sale){if(this.doc.defaultView?.confirm(`Eliminar ${x.invoiceNumber}?`)){this.repo.delete(x.id);this.notify('Venta eliminada.')}}
  protected downloadInvoice(x:Sale){downloadPdf(this.doc,`${this.slug(x.invoiceNumber)}.pdf`,{title:`Factura ${x.invoiceNumber}`,subtitle:`Emitida el ${x.issueDate} - Estado ${this.labels[x.status]}`,sections:[{heading:'Cliente',lines:[`Cliente: ${x.customer}`,`Cedula / RUC: ${x.customerDocument}`,`Pedido asociado: ${x.orderNumber||'Sin pedido asociado'}`,`Forma de pago: ${x.paymentMethod}`,`Vencimiento: ${x.dueDate}`]},{heading:'Detalle',table:{headers:['Descripcion','Cantidad','P. unitario','Descuento','IVA','Total'],rows:[[x.description,x.quantity,this.money(x.unitPrice),this.money(x.discount),`${x.taxRate??15}%`,this.money(x.total)]]}},{heading:'Resumen',lines:[`Subtotal: ${this.money(x.subtotal)}`,`Impuesto: ${this.money(x.tax)}`,`Total: ${this.money(x.total)}`,`Notas: ${x.notes||'Sin notas'}`]}]});this.notify('Factura descargada en PDF.')}
  protected downloadIssuedInvoices(){const invoices=this.issued();if(!invoices.length){this.notify('No hay facturas emitidas para descargar.');return}downloadPdf(this.doc,'facturas-emitidas.pdf',{title:'Facturas emitidas',subtitle:`Total de comprobantes: ${invoices.length}`,sections:[{heading:'Resumen',table:{headers:['Factura','Cliente','Emision','Estado','Total'],rows:invoices.map(x=>[x.invoiceNumber,x.customer,x.issueDate,this.labels[x.status],this.money(x.total)])}}]});this.notify('Facturas emitidas descargadas en PDF.')}
  protected setSearch(e:Event){this.search.set((e.target as HTMLInputElement).value)}
  protected setStatus(e:Event){this.status.set((e.target as HTMLSelectElement).value)}
  protected badge(s:SaleStatus){return s==='anulada'?'danger':s==='borrador'?'neutral':s==='emitida'?'warn':''}
  private money(x:number){return `$${x.toFixed(2)}`}
  private slug(x:string){return x.toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')||'factura'}
  private notify(x:string){this.message.set(x);setTimeout(()=>this.message.set(''),2500)}
}
