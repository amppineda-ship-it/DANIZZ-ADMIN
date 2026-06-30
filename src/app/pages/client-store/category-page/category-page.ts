import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

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
  private readonly router = inject(Router);

  protected readonly sidebarOpen = signal(false);
  protected readonly query = signal(this.route.snapshot.queryParamMap.get('q') ?? '');
  protected readonly category = this.route.snapshot.data['category'] as string;
  protected readonly title = this.route.snapshot.data['title'] as string;
  protected readonly subtitle = this.route.snapshot.data['subtitle'] as string;

  protected readonly products = computed(() => {
    const text = this.query().trim().toLowerCase();
    const matches = PRODUCTS.filter((product) => {
      const matchesCategory = product.category === this.category;
      const matchesText =
        !text ||
        `${product.name} ${product.category} ${product.description} ${product.specs.join(' ')}`
          .toLowerCase()
          .includes(text);
      return matchesCategory && matchesText;
    });

    return matches;
  });

  protected setSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.query.set(value);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { q: value.trim() || null },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }
}
