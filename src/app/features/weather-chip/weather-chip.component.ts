import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {MatChipComponent} from '../../shared/mat-chip/mat-chip.component';


@Component({
  selector: 'nrla-weather-chip',
  standalone: true,
  imports: [MatChipComponent],
  templateUrl: './weather-chip.component.html',
  styleUrl: './weather-chip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherChipComponent {
  private _conditionCode?: string; // '01d'

  @Input()
  temperatureCelsius?: number ;

  @Input()
  set conditionCode(value: string) {
    this._conditionCode = value
  }

  get conditionCode(): string | undefined {
    return this._conditionCode;
  }

  get iconUrl(): string | undefined {
    return this._conditionCode ?
      `https://openweathermap.org/img/wn/${this._conditionCode}@2x.png` : undefined;
  }
}
