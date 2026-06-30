import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';

import { ClientFooterComponent } from './components/client-footer/client-footer';
import { ClientSidebarComponent } from './components/client-sidebar/client-sidebar';
import { pageFade } from './client-animations';
import {
  CartItem,
  CATEGORY_LINKS,
  FEATURED_PRODUCTS,
  PRODUCT_CATEGORIES,
  PRODUCTS,
  Product,
  SLIDES,
  uniqueProductsByImage,
} from './catalog-data';

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
  private static readonly promoSeenKey = 'danizz-world-cup-promo-seen';

  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  private timer: ReturnType<typeof setInterval> | null = null;

  protected readonly query = signal('');
  protected readonly selectedCategory = signal('Todos');
  protected readonly activeSlide = signal(0);
  protected readonly sidebarOpen = signal(false);
  protected readonly cartOpen = signal(false);
  protected readonly promoOpen = signal(false);
  protected readonly selectedProduct = signal<Product | null>(null);
  protected readonly cart = signal<CartItem[]>([]);
  protected readonly success = signal('');

  protected readonly slides = SLIDES;
  protected readonly categories = PRODUCT_CATEGORIES;
  protected readonly products = PRODUCTS;

  protected readonly displayedProducts = computed(() => {
    const text = this.query().trim().toLowerCase();
    const category = this.selectedCategory();
    const source = !text && category === 'Todos' ? FEATURED_PRODUCTS : PRODUCTS;

    const matches = source.filter((product) => {
      const matchesText =
        !text ||
        `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(text);
      const matchesCategory = category === 'Todos' || product.category === category;
      return matchesText && matchesCategory;
    });

    return uniqueProductsByImage(matches).slice(0, 9);
  });

  protected readonly cartCount = computed(() => this.cart().reduce((total, item) => total + item.quantity, 0));
  protected readonly cartTotal = computed(() => this.cart().reduce((total, item) => total + item.price * item.quantity, 0));

  ngOnInit(): void {
    this.timer = setInterval(() => this.nextSlide(), 5200);

    if (!this.hasSeenPromo()) {
      setTimeout(() => {
        this.promoOpen.set(true);
        this.markPromoSeen();
      }, 450);
    }
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
  }

  protected setSearch(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
  }

  protected submitSearch(): void {
    const value = this.query().trim();
    const text = this.normalize(value);

    if (!text) {
      this.selectedCategory.set('Todos');
      this.document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    const categoryMatch = CATEGORY_LINKS.find((item) =>
      this.normalize(`${item.label} ${item.category}`).includes(text),
    );
    const productMatch = PRODUCTS.find((product) =>
      this.normalize(
        `${product.name} ${product.category} ${product.description} ${product.specs.join(' ')}`,
      ).includes(text),
    );
    const productCategoryRoute = CATEGORY_LINKS.find((item) => item.category === productMatch?.category);
    const target = categoryMatch ?? productCategoryRoute;

    if (target) {
      this.router.navigate([target.route], { queryParams: { q: value } });
      return;
    }

    this.selectedCategory.set('Todos');
    this.document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  protected closePromo(): void {
    this.promoOpen.set(false);
    this.markPromoSeen();
  }

  protected checkout(): void {
    this.cartOpen.set(false);
    this.showSuccess('Pedido preparado. Completa los datos en Pedido Personalizado.');
  }

  private showSuccess(message: string): void {
    this.success.set(message);
    setTimeout(() => this.success.set(''), 2600);
  }

  private normalize(value: string): string {
    return value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  private hasSeenPromo(): boolean {
    return this.document.defaultView?.sessionStorage?.getItem(ClientStoreComponent.promoSeenKey) === 'true';
  }

  private markPromoSeen(): void {
    this.document.defaultView?.sessionStorage?.setItem(ClientStoreComponent.promoSeenKey, 'true');
  }
}
