import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnInit,
  viewChild,
} from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { CommonModule } from '@angular/common';
import { debounceTime, fromEvent, map } from 'rxjs';
import { HeaderService } from './services/header';

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
export class HeaderComponent implements OnInit, AfterViewInit {
  inputSearch = viewChild<ElementRef>('inputSearch');
  locationPathName: string = '';
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
      label: 'Home',
      icon: 'pi pi-home',
    },
    {
      label: 'Features',
      icon: 'pi pi-star',
    },
  ];

  headerService = inject(HeaderService);
  router = inject(Router);

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.locationPathName = event.url;
      }
    });
  }

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

  goBack(): void {
    this.router.navigate(['/']);
  }
}
