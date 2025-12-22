import {Component} from '@angular/core';
import {ClockFaceComponent} from './features/clock-face/clock-face.component';

@Component({
  selector: 'nrla-root',
  imports: [ClockFaceComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly today = new Date();
  protected readonly weatherConditionCode = '04n';
  protected readonly currentTemperature = 9;
}
