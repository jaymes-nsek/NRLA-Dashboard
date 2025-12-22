import { Component } from '@angular/core';
import { ClockFaceComponent } from './features/clock-face/clock-face.component';
import { DateChipComponent } from './features/date-chip/date-chip.component';
import { WeatherChipComponent } from './features/weather-chip/weather-chip.component';

@Component({
  selector: 'nrla-root',
  imports: [ClockFaceComponent, DateChipComponent, WeatherChipComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly today = new Date();
  protected readonly weatherConditionCode = '04n';
  protected readonly currentTemperature = 9;
}
