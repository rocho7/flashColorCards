import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { CommonModule } from '@angular/common';
import { debounceTime, fromEvent, map } from 'rxjs';
import { HeaderService } from './services/header';
import { AuthenticationService } from '../../../core/services/authentication.service';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    AvatarModule,
    BadgeModule,
    MenubarModule,
    InputTextModule,
    RippleModule,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent implements AfterViewInit {
  authenticationService = inject(AuthenticationService);

  inputSearch = viewChild<ElementRef>('inputSearch');
  items = [
    {
      label: 'Projects',
      icon: 'pi pi-search',
      badge: '3',
      items: [
        {
          label: 'Core',
          icon: 'pi pi-bolt',
          shortcut: '⌘+S',
        },
        {
          label: 'Blocks',
          icon: 'pi pi-server',
          shortcut: '⌘+B',
        },
        {
          separator: true,
        },
        {
          label: 'UI Kit',
          icon: 'pi pi-pencil',
          shortcut: '⌘+U',
        },
      ],
    },
  ];

  hambuguerMenu = [
    {
      label: 'Log out',
      command: () => {
        this.authenticationService.logout();
      },
    },
  ];

  headerService = inject(HeaderService);

  ngAfterViewInit(): void {
    const inputField$ = fromEvent<KeyboardEvent>(
      this.inputSearch()?.nativeElement,
      'keyup',
    );

    inputField$
      .pipe(
        map((i: any) => i.currentTarget.value),
        debounceTime(500),
      )
      .subscribe((res) => this.headerService.search$.set(res));
  }
}
