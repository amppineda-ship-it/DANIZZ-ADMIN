import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';

import { pageFade } from '../client-animations';
import { PRODUCT_CATEGORIES } from '../catalog-data';
import { ClientFooterComponent } from '../components/client-footer/client-footer';
import { ClientSidebarComponent } from '../components/client-sidebar/client-sidebar';

interface Review {
  readonly name: string;
  readonly rating: number;
  readonly comment: string;
}

@Component({
  selector: 'app-custom-order-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    ClientSidebarComponent,
    ClientFooterComponent,
  ],
  templateUrl: './custom-order-page.html',
  styleUrl: './custom-order-page.scss',
  animations: [pageFade],
})
export class CustomOrderPageComponent {
  private readonly fb = inject(FormBuilder).nonNullable;
  private readonly route = inject(ActivatedRoute);
  private readonly document = inject(DOCUMENT);

  protected readonly sidebarOpen = signal(false);
  protected readonly sent = signal('');
  protected readonly reviews = signal<Review[]>([
    { name: 'María C.', rating: 5, comment: 'El uniforme quedó nítido y entregaron a tiempo.' },
    { name: 'Carlos P.', rating: 5, comment: 'Muy buena atención para definir colores y tallas.' },
  ]);

  protected readonly productTypes = PRODUCT_CATEGORIES.slice(1);
  protected readonly stars = [1, 2, 3, 4, 5];

  protected readonly form = this.fb.group({
    productType: [this.route.snapshot.queryParamMap.get('producto') || '', Validators.required],
    quantity: [1, [Validators.required, Validators.min(1)]],
    description: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(700)]],
    fullName: ['', [Validators.required, Validators.maxLength(80)]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9\s-]{7,16}$/)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required, Validators.maxLength(120)]],
  });

  protected readonly reviewForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(60)]],
    rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
    comment: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(240)]],
  });

  protected readonly averageRating = computed(() => {
    const list = this.reviews();
    return list.reduce((total, review) => total + review.rating, 0) / list.length;
  });

  protected sendOrder(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.sent.set('Pedido enviado correctamente. Te contactaremos por WhatsApp o correo.');
    this.form.reset({ productType: '', quantity: 1, description: '', fullName: '', phone: '', email: '', subject: '' });
  }

  protected addReview(): void {
    if (this.reviewForm.invalid) {
      this.reviewForm.markAllAsTouched();
      return;
    }

    this.reviews.update((items) => [this.reviewForm.getRawValue(), ...items]);
    this.reviewForm.reset({ name: '', rating: 5, comment: '' });
  }

  protected openMaps(): void {
    this.document.defaultView?.open('https://www.google.com/maps/search/?api=1&query=-0.33075,-78.53306', '_blank');
  }
}
