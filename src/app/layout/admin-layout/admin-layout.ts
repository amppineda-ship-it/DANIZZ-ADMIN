import { Component, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { MENU_GROUPS, SETTINGS_ITEM } from './menu.config';

@Component({
  selector: 'app-admin-layout', standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './admin-layout.html', styleUrl: './admin-layout.scss',
})
export class AdminLayoutComponent {
  protected readonly menuGroups = MENU_GROUPS;
  protected readonly settingsItem = SETTINGS_ITEM;
  protected readonly drawerOpen = signal(false);
  protected readonly pageTitle = signal('Panel administrativo');
  protected readonly pageSection = signal('Dashboard');

  constructor(router: Router) {
    const updateTitle = (): void => {
      const item = [...MENU_GROUPS.flatMap((group) => group.items), SETTINGS_ITEM]
        .find((candidate) => router.url.split('?')[0] === candidate.route);
      this.pageSection.set(item?.label ?? 'Administración');
      this.pageTitle.set(item?.label === 'Dashboard' ? 'Panel administrativo' : (item?.label ?? 'Administración'));
      this.drawerOpen.set(false);
    };
    updateTitle();
    router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(updateTitle);
  }

  protected toggleDrawer(): void { this.drawerOpen.update((open) => !open); }
}
