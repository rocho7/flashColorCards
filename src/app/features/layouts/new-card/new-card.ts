import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';
import { TextareaModule } from 'primeng/textarea';
import { MenubarModule } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';
import { MessageService, ToastMessageOptions } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import {
  NgxEditorComponent,
  NgxEditorMenuComponent,
  Editor,
  Toolbar,
  NgxEditorModule,
} from 'ngx-editor';
import { CommonModule } from '@angular/common';

import { TextEditorComponent } from '../text-editor/text-editor';
import schema from '../text-editor/configuration/schema';
import nodeViews from '../text-editor/configuration/nodeviews';
import { NewCardService } from './services/new-card';
import { ICard } from '../card/interface/card.interface';

@Component({
  selector: 'app-new-card',
  imports: [
    CommonModule,
    IftaLabelModule,
    TextareaModule,
    FormsModule,
    ReactiveFormsModule,
    MenubarModule,
    ToastModule,
    ButtonModule,
    NgxEditorModule,
    NgxEditorComponent,
    NgxEditorMenuComponent,
    TextEditorComponent,
  ],
  providers: [MessageService],
  templateUrl: './new-card.html',
  styleUrl: './new-card.scss',
})
export class NewCardComponent implements OnInit, OnDestroy {
  formCard!: FormGroup;
  visible: boolean = false;
  editorFront: Editor = new Editor({
    schema,
    nodeViews,
  });
  editorBack: Editor = new Editor({
    schema,
    nodeViews,
  });
  html = 'Escribe aquí lo que quieras';
  toolbar: Toolbar = [
    // default value
    ['bold', 'italic'],
    ['underline', 'strike'],
    // ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    // ['link', 'image'],
    // or, set options for link:
    //[{ link: { showOpenInNewTab: false } }, 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
    ['horizontal_rule', 'format_clear', 'indent', 'outdent'],
    // ['superscript', 'subscript'],
    ['undo', 'redo'],
  ];
  idSet: number = 0;

  fb = inject(FormBuilder);
  router = inject(Router);
  messageService = inject(MessageService);
  newCardService = inject(NewCardService);
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => (this.idSet = params['id']));
    const isEditCard = this.newCardService.cardSelected$();
    const frontValue = isEditCard ? isEditCard.title : '';
    const backValue = isEditCard ? isEditCard.meaning : '';
    this.formCard = this.fb.group({
      front: [frontValue],
      back: [backValue],
    });
  }

  submit(): void {
    console.log(
      '%cform new Card ',
      'color: white; background-color: #007acc;',
      this.formCard.value,
    );
    const newCard: ICard = {
      id: 0,
      idSet: this.idSet,
      title: this.formCard.controls['front'].value,
      answer: this.formCard.controls['front'].value,
      review: 0,
      forgotten: 0,
      daysOverdue: 0,
      delay: null,
      color: '',
    };
    this.newCardService.postCard(newCard).then((res) => {
      if (res) {
        const message: ToastMessageOptions = {
          severity: 'success',
          summary: 'Success',
          detail: 'Data saved successfully',
        };
        this.messageService.add(message);
        this.formCard.reset();
      }
    });
  }

  goBack(): void {
    this.showConfirmModal();
  }

  showConfirmModal(): void {
    const message: ToastMessageOptions = {
      key: 'confirm',
      sticky: true,
      severity: 'custom',
      summary: 'Are you sure you want to exit?',
      styleClass:
        'bg-gray-600 rounded-2xl border border-green-700 border-solid-4',
    };
    this.messageService.add(message);
    this.visible = true;
  }

  onConfirmModal(): void {
    console.log(
      '%conConfirmModal ',
      'background: purple; color: white; display: block;',
    );
    this.onCloseConfirmModal();
    this.router.navigate(['./study']);
  }

  onCloseConfirmModal() {
    this.visible = false;
  }

  formatText(): void {
    // this.editor.commands
    //   .textColor('red')
    //   // .insertText('Hello world!')
    //   .focus()
    //   .scrollIntoView()
    //   .exec();
  }

  ngOnDestroy(): void {
    this.editorFront.destroy();
    this.editorBack.destroy();
  }
}
