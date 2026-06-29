import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { pageFade } from '../client-animations';
import { ClientFooterComponent } from '../components/client-footer/client-footer';
import { ClientSidebarComponent } from '../components/client-sidebar/client-sidebar';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule, ClientSidebarComponent, ClientFooterComponent],
  templateUrl: './contact-page.html',
  styleUrl: './contact-page.scss',
  animations: [pageFade],
})
export class ContactPageComponent {
  private readonly document = inject(DOCUMENT);

  protected readonly sidebarOpen = signal(false);

  protected openWhatsApp(): void {
    this.document.defaultView?.open(
      'https://wa.me/593980674115?text=Hola%20DANIZZ,%20quiero%20informacion%20sobre%20sus%20productos',
      '_blank',
    );
  }
}
