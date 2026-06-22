import { Component } from '@angular/core';
import { FooterComponent } from '../../layouts/footer/footer';
import { HeaderComponent } from '../../layouts/header/header';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {}
