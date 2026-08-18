import { Component, input } from '@angular/core';

import { CardModule } from 'primeng/card';
import { RouterLink } from '@angular/router';
import { ICard } from './interface/card.interface';
import { ButtonModule } from 'primeng/button';
import { Editor, NgxEditorComponent, NgxEditorModule } from 'ngx-editor';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-card',
  imports: [
    CommonModule,
    CardModule,
    RouterLink,
    ButtonModule,
    NgxEditorComponent,
    NgxEditorModule,
    FormsModule,
  ],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class CardComponent {
  card = input.required<ICard>();
  editorTitle: Editor = new Editor();
}
