import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-client-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule],
  templateUrl: './client-footer.html',
  styleUrl: './client-footer.scss',
})
export class ClientFooterComponent {
  private readonly document = inject(DOCUMENT);

  protected openWhatsApp(): void {
    this.document.defaultView?.open('https://wa.me/593980674115', '_blank');
  }
}
