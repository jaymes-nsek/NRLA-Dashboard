import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { MatChipComponent } from '../../shared/mat-chip/mat-chip.component';

type WeatherChipTone = 'soft' | 'solid';

const WEATHER_ICON_PATTERN = /^[0-9]{2}[dn]$/i;

@Component({
  selector: 'nrla-weather-chip',
  standalone: true,
  imports: [MatChipComponent],
  templateUrl: './weather-chip.component.html',
  styleUrl: './weather-chip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherChipComponent {
  private _conditionCode = '01d';
  private _tone: WeatherChipTone = 'soft';

  @HostBinding('class.weather-chip') baseClass = true;

  @HostBinding('class.weather-chip--soft')
  get isSoftTone() {
    return this._tone === 'soft';
  }

  @HostBinding('class.weather-chip--solid')
  get isSolidTone() {
    return this._tone === 'solid';
  }

  @Input()
  temperatureCelsius: number | string = 9;

  @Input()
  set conditionCode(value: string | null | undefined) {
    const normalized = (value || '').trim().toLowerCase();
    this._conditionCode = WEATHER_ICON_PATTERN.test(normalized) ? normalized : '01d';
  }

  get conditionCode(): string {
    return this._conditionCode;
  }

  @Input()
  set tone(value: WeatherChipTone) {
    this._tone = value ?? 'soft';
  }

  get tone(): WeatherChipTone {
    return this._tone;
  }

  get iconUrl(): string {
    return `https://openweathermap.org/img/wn/${this._conditionCode}@2x.png`;
  }
}
