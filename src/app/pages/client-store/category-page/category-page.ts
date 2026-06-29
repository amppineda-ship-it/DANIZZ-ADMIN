import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { pageFade } from '../client-animations';
import { ClientFooterComponent } from '../components/client-footer/client-footer';
import { ClientSidebarComponent } from '../components/client-sidebar/client-sidebar';
import { PRODUCTS } from '../catalog-data';

@Component({
  selector: 'app-category-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    ClientSidebarComponent,
    ClientFooterComponent,
  ],
  templateUrl: './category-page.html',
  styleUrl: './category-page.scss',
  animations: [pageFade],
})
export class CategoryPageComponent {
  private readonly route = inject(ActivatedRoute);

  protected readonly sidebarOpen = signal(false);
  protected readonly query = signal('');
  protected readonly category = this.route.snapshot.data['category'] as string;
  protected readonly title = this.route.snapshot.data['title'] as string;
  protected readonly subtitle = this.route.snapshot.data['subtitle'] as string;

  protected readonly products = computed(() => {
    const text = this.query().trim().toLowerCase();
    return PRODUCTS.filter((product) => {
      const matchesCategory = product.category === this.category;
      const matchesText =
        !text ||
        `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(text);
      return matchesCategory && matchesText;
    });
  });

  protected setSearch(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
  }

}
