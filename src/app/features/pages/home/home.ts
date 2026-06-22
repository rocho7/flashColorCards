import { Component } from '@angular/core';
import { FooterComponent } from '../../layouts/footer/footer';
import { HeaderComponent } from '../../layouts/header/header';
import { CardComponent } from '../../layouts/card/card';
import { CommonModule } from '@angular/common';
import { ICard } from '../../layouts/card/interfaces/card.interface';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    FooterComponent,
    CardComponent,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {}
