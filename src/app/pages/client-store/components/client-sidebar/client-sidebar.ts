import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, Output, inject, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription, filter } from 'rxjs';

import { CATEGORY_LINKS } from '../../catalog-data';

@Component({
  selector: 'app-client-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, MatExpansionModule, MatIconModule],
  templateUrl: './client-sidebar.html',
  styleUrl: './client-sidebar.scss',
})
export class ClientSidebarComponent implements OnDestroy {
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);
  private readonly subscription: Subscription;

  @Input() mobileOpen = false;
  @Output() closeMenu = new EventEmitter<void>();

  protected readonly categories = CATEGORY_LINKS;
  protected readonly categoriesOpen = signal(false);

  constructor() {
    this.subscription = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (!event.urlAfterRedirects.startsWith('/categorias')) {
          this.categoriesOpen.set(false);
        }
        this.closeMenu.emit();
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  protected collapse(): void {
    this.categoriesOpen.set(false);
    this.closeMenu.emit();
  }

  protected openWhatsApp(): void {
    this.document.defaultView?.open(
      'https://wa.me/593980674115?text=Hola%20DANIZZ,%20quiero%20informacion%20sobre%20un%20pedido',
      '_blank',
    );
  }
}
