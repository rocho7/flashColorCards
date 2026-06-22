import { Component } from '@angular/core';
import { SetComponent } from '../../layouts/set/set';
import { TabComponent } from '../../layouts/tab/tab';

@Component({
  selector: 'app-study',
  imports: [SetComponent, TabComponent],
  templateUrl: './study.html',
  styleUrl: './study.scss',
})
export class StudyComponent {}
