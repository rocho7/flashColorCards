import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { Drawer, DrawerModule } from 'primeng/drawer';
import { DialogModule } from 'primeng/dialog';
import { ColorPickerComponent } from '../color-picker/color-picker';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-footer',
  imports: [
    CommonModule,
    ToolbarModule,
    ButtonModule,
    // MenuItem,
    InputTextModule,
    SplitButtonModule,
    InputIconModule,
    IconFieldModule,
    Drawer,
    DrawerModule,
    DialogModule,
    ConfirmDialogModule,
    FormsModule,
    ReactiveFormsModule,
    ColorPickerComponent,
  ],
  providers: [ConfirmationService],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class FooterComponent implements OnInit {
  isDrawerVisible: boolean = false;
  isNewSetDialogVisible: boolean = false;
  isColorPickerVisible: boolean = false;

  colorPicker: string = '';

  formNewSet!: FormGroup;

  fb = inject(FormBuilder);

  ngOnInit(): void {
    this.createFormSet();
  }

  createFormSet(): void {
    this.formNewSet = this.fb.group({
      nameSet: ['', Validators.required],
      color: ['', Validators.required],
    });
  }

  openDrawer(): void {
    console.log('%copenDrawer() ', 'color: white; background-color: #007acc;');
    this.isDrawerVisible = true;
  }

  createNewCard(): void {
    console.log(
      '%ccreateNewCard() ',
      'color: white; background-color: #007acc;',
    );
  }

  createNewSet(): void {
    console.log(
      '%ccreateNewCard() ',
      'color: white; background-color: #007acc;',
    );
    this.isNewSetDialogVisible = true;
  }

  closeCreateSetDialog(): void {
    this.isNewSetDialogVisible = false;
  }

  confirmCreateSetDialog(): void {
    this.formNewSet.get('color')?.setValue(this.colorPicker);
    console.log(
      '%cform create new set ',
      'background: green; color: white; display: block;',
      this.formNewSet.value,
    );
    this.closeCreateSetDialog();
  }

  showColorPicker(): void {
    this.isColorPickerVisible = true;
  }

  closePickerDialog(): void {
    this.isColorPickerVisible = false;
  }

  confirmPickerDialog(): void {
    console.log(
      '%ccolorPicker ',
      'background: purple; color: white; display: block;',
      this.colorPicker,
    );
    this.closePickerDialog();
  }
}
