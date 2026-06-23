import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Customer, CustomerDraft, CustomerType } from './customer.model';
import { CustomerRepository } from './customer.repository';

@Component({ selector:'app-customers', standalone:true, imports:[CommonModule,ReactiveFormsModule], templateUrl:'./customers.html', styleUrls:['../shared/crud.scss'] })
export class CustomersComponent {
  protected readonly repo=inject(CustomerRepository); private readonly fb=inject(FormBuilder).nonNullable; private readonly doc=inject(DOCUMENT);
  protected readonly search=signal(''); protected readonly type=signal('all'); protected readonly editor=signal(false); protected readonly editing=signal<string|null>(null); protected readonly message=signal('');
  protected readonly filtered=computed(()=>{const q=this.search().toLowerCase();return this.repo.items().filter(x=>(!q||`${x.name} ${x.document} ${x.email} ${x.businessName}`.toLowerCase().includes(q))&&(this.type()==='all'||x.type===this.type()))});
  protected readonly companies=computed(()=>this.repo.items().filter(x=>x.type==='empresa').length); protected readonly active=computed(()=>this.repo.items().filter(x=>x.active).length);
  protected readonly form=this.fb.group({type:['persona' as CustomerType,Validators.required],document:['',[Validators.required,Validators.pattern(/^\d{10}(\d{3})?$/)]],name:['',[Validators.required,Validators.maxLength(100)]],businessName:['',Validators.maxLength(120)],email:['',[Validators.required,Validators.email]],phone:['',[Validators.required,Validators.pattern(/^[0-9+() -]{7,20}$/)]],address:['',Validators.required],city:['',Validators.required],birthDate:[''],notes:['',Validators.maxLength(300)],active:[true]});
  protected open(x?:Customer){this.editing.set(x?.id??null);this.form.reset(x?{...x}:{type:'persona',document:'',name:'',businessName:'',email:'',phone:'',address:'',city:'',birthDate:'',notes:'',active:true});this.editor.set(true)}
  protected close(){this.editor.set(false)}
  protected save(){if(this.form.invalid){this.form.markAllAsTouched();return}const v=this.form.getRawValue();if(v.type==='empresa'&&!v.businessName.trim()){this.form.controls.businessName.setErrors({required:true});this.form.controls.businessName.markAsTouched();return}if(this.repo.items().some(x=>x.document===v.document&&x.id!==this.editing()))return void alert('El documento ya está registrado.');this.repo.save(v as CustomerDraft,this.editing()??undefined);this.close();this.notify('Cliente guardado correctamente.')}
  protected remove(x:Customer){if(this.doc.defaultView?.confirm(`¿Eliminar a ${x.name}?`)){this.repo.delete(x.id);this.notify('Cliente eliminado.')}} protected setSearch(e:Event){this.search.set((e.target as HTMLInputElement).value)} protected setType(e:Event){this.type.set((e.target as HTMLSelectElement).value)} private notify(x:string){this.message.set(x);setTimeout(()=>this.message.set(''),2500)}
}
