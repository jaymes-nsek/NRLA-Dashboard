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

  iconUrl?: string;

  @Input()
  temperatureCelsius?: number;

  @Input()
  set conditionCode(value: string | undefined) {
    this._conditionCode = value

    if (this._conditionCode) {
      this.iconUrl = `https://openweathermap.org/img/wn/${this._conditionCode}@2x.png`;
    } else {
      this.iconUrl = undefined;
    }
  }

  get conditionCode(): string | undefined {
    return this._conditionCode;
  }

}
