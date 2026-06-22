import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  model,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'primeng/colorpicker';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-color-picker',
  imports: [ColorPickerModule, FormsModule, CommonModule],
  templateUrl: './color-picker.html',
  styleUrl: './color-picker.scss',
})
export class ColorPickerComponent implements AfterViewInit {
  colorPickerElement = viewChild<ElementRef>('colorPicker');
  color = model();
  colorP: any = { r: 100, g: 102, b: 241 };

  ngAfterViewInit() {
    const element = this.colorPickerElement()?.nativeElement;
    if (!element) {
      return;
    }

    fromEvent<MouseEvent>(element, 'click').subscribe((event) => {
      console.log(
        '%cclick',
        'background: purple; color: white; display: block;',
        event,
        this.colorP,
      );
      this.color.set(this.colorP);
    });
  }
}
