import {Component} from '@angular/core';
import {ClockFaceComponent} from './features/clock-face/clock-face.component';

@Component({
  selector: 'nrla-root',
  imports: [ClockFaceComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = 'Clock & Weather Widget';
}
