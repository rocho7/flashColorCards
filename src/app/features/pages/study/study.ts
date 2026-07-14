import { Component } from '@angular/core';
import { SetComponent } from '../../layouts/set/set';
import { TabComponent } from '../../layouts/tab/tab';
import { HeaderStudyComponent } from '../../layouts/header-study/header-study';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-study',
  imports: [SetComponent, TabComponent, HeaderStudyComponent, RouterOutlet],
  templateUrl: './study.html',
  styleUrl: './study.scss',
})
export class StudyComponent {}
