import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

import { ClientFooterComponent } from './components/client-footer/client-footer';
import { ClientSidebarComponent } from './components/client-sidebar/client-sidebar';
import { pageFade } from './client-animations';
import { CartItem, PRODUCT_CATEGORIES, PRODUCTS, Product, SLIDES } from './catalog-data';

@Component({
  selector: 'app-client-store',
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
  templateUrl: './client-store.html',
  styleUrl: './client-store.scss',
  animations: [pageFade],
})
export class ClientStoreComponent implements OnInit, OnDestroy {
  private readonly document = inject(DOCUMENT);
  private timer: ReturnType<typeof setInterval> | null = null;

  protected readonly query = signal('');
  protected readonly selectedCategory = signal('Todos');
  protected readonly activeSlide = signal(0);
  protected readonly sidebarOpen = signal(false);
  protected readonly cartOpen = signal(false);
  protected readonly selectedProduct = signal<Product | null>(null);
  protected readonly cart = signal<CartItem[]>([]);
  protected readonly success = signal('');

  protected readonly slides = SLIDES;
  protected readonly categories = PRODUCT_CATEGORIES;
  protected readonly products = PRODUCTS;

  protected readonly filteredProducts = computed(() => {
    const text = this.query().trim().toLowerCase();
    const category = this.selectedCategory();

    return this.products.filter((product) => {
      const matchesText =
        !text ||
        `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(text);
      const matchesCategory = category === 'Todos' || product.category === category;
      return matchesText && matchesCategory;
    });
  });

  protected readonly cartCount = computed(() => this.cart().reduce((total, item) => total + item.quantity, 0));
  protected readonly cartTotal = computed(() => this.cart().reduce((total, item) => total + item.price * item.quantity, 0));

  ngOnInit(): void {
    this.timer = setInterval(() => this.nextSlide(), 5200);
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
  }

  protected setSearch(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
  }

  protected selectCategory(category: string): void {
    this.selectedCategory.set(category);
    this.document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  protected nextSlide(): void {
    this.activeSlide.update((index) => (index + 1) % this.slides.length);
  }

  protected previousSlide(): void {
    this.activeSlide.update((index) => (index + this.slides.length - 1) % this.slides.length);
  }

  protected goToSlide(index: number): void {
    this.activeSlide.set(index);
  }

  protected addToCart(product: Product): void {
    this.cart.update((items) => {
      const found = items.find((item) => item.id === product.id);
      return found
        ? items.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
        : [...items, { ...product, quantity: 1 }];
    });
    this.showSuccess(`${product.name} agregado al carrito.`);
  }

  protected removeFromCart(product: Product): void {
    this.cart.update((items) =>
      items.flatMap((item) =>
        item.id !== product.id ? [item] : item.quantity > 1 ? [{ ...item, quantity: item.quantity - 1 }] : [],
      ),
    );
  }

  protected openDetails(product: Product): void {
    this.selectedProduct.set(product);
  }

  protected closeDetails(): void {
    this.selectedProduct.set(null);
  }

  protected checkout(): void {
    this.cartOpen.set(false);
    this.showSuccess('Pedido preparado. Completa los datos en Pedido Personalizado.');
  }

  private showSuccess(message: string): void {
    this.success.set(message);
    setTimeout(() => this.success.set(''), 2600);
  }
}
