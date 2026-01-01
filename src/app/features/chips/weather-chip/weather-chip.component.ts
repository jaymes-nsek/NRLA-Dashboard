import {ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output} from '@angular/core';
import {MatChipComponent} from '../mat-chip/mat-chip.component';
import {WeatherImageState} from '../../clock-face/clock-face.component';


@Component({
  selector: 'nrla-weather-chip',
  standalone: true,
  imports: [MatChipComponent],
  templateUrl: './weather-chip.component.html',
  styleUrls: [
    './weather-chip.component.scss',
    './../chips.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherChipComponent {
  private _conditionCode?: string; // '01d'

  @HostBinding('class.weather-chip') baseClass = true;

  @Input()
  temperatureCelsius?: number;

  @Input()
  set conditionCode(value: string | undefined) {
    this._conditionCode = value

    if (this._conditionCode) {
      this.iconUrl = `https://openweathermap.org/img/wn/${this._conditionCode}@2x.png`;
      this.imageStateEvent.emit({status: 'fetching'})
    } else {
      this.iconUrl = undefined;
      this.imageStateEvent.emit({status: 'idle'})
    }
  }

  @Output() imageStateEvent: EventEmitter<WeatherImageState> = new EventEmitter<WeatherImageState>();

  protected iconUrl?: string;

  get conditionCode(): string | undefined {
    return this._conditionCode;
  }

  protected onImageLoad() {
    this.imageStateEvent.emit({status: 'success', imageUrl: ''})
  }

  protected onImageError() {
    // console.log('Error in WeatherChipComponent');
    this.imageStateEvent.emit({status: 'error', message: 'Sorry, image could not be loaded.'})
  }
}
