import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DateChipComponent} from '../date-chip/date-chip.component';
import {WeatherChipComponent} from '../weather-chip/weather-chip.component';
import {WeatherService} from '../../services/weather.service';

@Component({
  selector: 'nrla-clock-face',
  standalone: true,
  templateUrl: './clock-face.component.html',
  styleUrl: './clock-face.component.scss',
  imports: [
    DateChipComponent,
    WeatherChipComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClockFaceComponent implements OnInit {

  startDay?: number; // use to track changes in "day" value

  protected today?: Date;
  protected weatherConditionCode = 'null';
  protected currentTemperature = 0;

  secsHandTransform = '';
  minsHandTransform = '';
  hoursHandTransform = '';

  constructor(private cdr: ChangeDetectorRef, private weatherService: WeatherService) {
  }


  ngOnInit() {
    this.startAnimation((t: number) => {
      const d = new Date(t);

      if (this.startDay !== d.getDay()) {
        // Intended to prevent unnecessary updates from other changes cause to date other than "day"
        this.startDay = d.getDay();
        this.today = d;
      }

      // seconds hand
      const ms = d.getMilliseconds();
      const s = d.getSeconds() + ms / 1000;
      const secondsAngle = (s / 60) * 360;
      this.secsHandTransform = `rotate(${secondsAngle}deg)`;

      // minutes hand
      const m = d.getMinutes();
      const minutesAngle = (m / 60) * 360;
      this.minsHandTransform = `rotate(${minutesAngle}deg)`;

      // hours hand
      const h = d.getHours();
      const hoursAngle = ((h % 12) / 12) * 360;
      this.hoursHandTransform = `rotate(${hoursAngle}deg)`;

      this.cdr.detectChanges()
    });

    this.getWeatherInfo();
  }

  /**
   * Get absolute system time now, no accumulation.
   */
  private static nowMs() {
    const wallClockStart = Date.now();
    const perfStart = performance.now();

    return wallClockStart + (performance.now() - perfStart);
  }

  private startAnimation(render: any) {
    function frame() {
      const t = ClockFaceComponent.nowMs();
      render(t);
      requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  }

  /**
   * @param defaultValue used for testing and points to the Houses of Parliament in London.
   */
  private async getGeoLocation(defaultValue: GeoData = {lat: 51.498870849609375, lon: -0.12533999979496002}):
    Promise<GeoData> {

    if (!('geolocation' in navigator)) {
      return defaultValue;
    }

    try {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject)
      );

      return {
        lat: position.coords.latitude,
        lon: position.coords.longitude
      };
    } catch {
      return defaultValue;
    }
  }

  private getWeatherInfo() {
    this.getGeoLocation()
      .then(geoData => {
        this.weatherService.getWeatherInfo(geoData).subscribe(weatherResponse => {
          console.log('weatherResponse: ', weatherResponse);

          this.weatherConditionCode = weatherResponse.weather[0].icon;
          this.currentTemperature = Math.round(weatherResponse.main.temp);
        })
      })
      .catch(err => console.error('Error getting geolocation: ', err));
  }
}
