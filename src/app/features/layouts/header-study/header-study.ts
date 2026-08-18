import { Component, inject, input, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event, ActivatedRoute } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-header-study',
  imports: [MenubarModule],
  templateUrl: './header-study.html',
  styleUrl: './header-study.scss',
})
export class HeaderStudyComponent implements OnInit {
  isEditCard = input();
  locationPathName: string = '';

  router = inject(Router);
  route = inject(ActivatedRoute);

  items: any[] = [];

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.locationPathName = event.url;
      }
    });

    let idSet: number = 0;
    this.route.queryParams.subscribe((params) => (idSet = params['id']));
    console.log('%cidSet ', 'color: red; display: block; width: 100%;', idSet);

    const labelCard = this.isEditCard() ? 'Edit card' : 'Create card';

    this.items = [
      {
        label: labelCard,
        icon: 'pi pi-plus-circle',
        command: () =>
          this.router.navigate(['home', 'new-card'], {
            queryParams: { id: idSet },
          }),
      },
    ];
    if (!this.isEditCard()) {
      this.items.push({
        label: 'Create subset',
        icon: 'pi pi-folder-plus',
      });
    }
  }

  goBack(): void {
    const navigateTo = this.isEditCard() ? ['/study'] : ['/home'];
    this.router.navigate(navigateTo);
  }
}
