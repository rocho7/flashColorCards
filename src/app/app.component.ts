import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ProgressbarComponent } from './features/layouts/progressbar/progressbar';

@Component({
  selector: 'app-root',
  imports: [RouterModule, ButtonModule, ProgressbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'flashColorCards';

  ngOnInit(): void {}
}
