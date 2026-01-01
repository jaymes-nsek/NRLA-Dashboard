import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input, OnInit} from '@angular/core';
import {DateChipComponent} from '../chips/date-chip/date-chip.component';
import {WeatherChipComponent} from '../chips/weather-chip/weather-chip.component';
import {WeatherService} from '../../services/weather.service';
import {ClockHandComponent} from '../clock-hand/clock-hand.component';

export type WeatherImageState =
  | { status: 'idle' }
  | { status: 'fetching' }
  | { status: 'success'; imageUrl: string }
  | { status: 'error'; message: string };

@Component({
  selector: 'nrla-clock-face',
  standalone: true,
  templateUrl: './clock-face.component.html',
  styleUrl: './clock-face.component.scss',
  imports: [
    DateChipComponent,
    WeatherChipComponent,
    ClockHandComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClockFaceComponent implements OnInit {
  @HostBinding('class') hostClass = 'clock-face';

  @HostBinding('style.width.px')
  get hostWidth(): number {
    return this.diameter;
  }

  @HostBinding('style.height.px')
  get hostHeight(): number {
    return this.diameter;
  }

  /**
   * Sets diameter to the {@link hostWidth} and {@link hostHeight}.
   */
  @Input() diameter = 200;

  startDay?: number; // use to track changes in "day" value

  protected today?: Date;
  protected weatherConditionCode?: string;
  protected currentTemperature = 0;

  secsHandTransform = '';
  minsHandTransform = '';
  hoursHandTransform = '';

  imageState: WeatherImageState = {status: 'idle'};
  handsLoadState = [false, false, false]
  handsLoaded = false;

  constructor(private cdr: ChangeDetectorRef, private weatherService: WeatherService) {
  }


  ngOnInit() {
    requestAnimationFrame(this.frameCallback); // Start animation frame

    this.getWeatherInfo();
  }

  frameCallback = () => {
    const date = new Date();

    if (this.startDay !== date.getDay()) {
      // Intended to prevent unnecessary updates from other changes cause to date other than "day"
      this.startDay = date.getDay();
      this.today = date;
    }

    let angle: number;

    // seconds hand
    const ms = date.getMilliseconds();
    const s = date.getSeconds() + ms / 1000;
    angle = (s / 60) * 360;
    this.secsHandTransform = `rotate(${angle}deg)`;

    // minutes hand
    const m = date.getMinutes();
    angle = (m / 60) * 360;
    this.minsHandTransform = `rotate(${angle}deg)`;

    // hours hand
    const h = date.getHours();
    angle = ((h % 12) / 12) * 360;
    this.hoursHandTransform = `rotate(${angle}deg)`;

    this.cdr.detectChanges()

    requestAnimationFrame(this.frameCallback);
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
          // console.log('weatherResponse: ', weatherResponse);

          this.weatherConditionCode = weatherResponse.weather[0].icon;
          this.currentTemperature = Math.round(weatherResponse.main.temp);
        })
      })
      .catch(err => console.error('Error getting geolocation: ', err));
  }

  protected onWeatherImageStateEvent($event: WeatherImageState) {
    // console.log('onImageStateEvent', $event);
    this.imageState = $event;
  }

  protected onHandStateChange(index: number, $event: WeatherImageState) {
    // console.log('second hand state: ', $event);
    this.handsLoadState[index] = ($event.status === 'success');
    this.handsLoaded = this.handsLoadState.every(Boolean);
  }

}
