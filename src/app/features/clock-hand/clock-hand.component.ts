import {ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output} from '@angular/core';
import {WeatherImageState} from "../clock-face/clock-face.component";

export type ClockHandType = 'hourHand' | 'minuteHand' | 'secondHand';
export type ImgLoading = 'lazy' | 'eager';

@Component({
  selector: 'nrla-clock-hand',
  standalone: true,
  imports: [],
  templateUrl: './clock-hand.component.html',
  styleUrl: './clock-hand.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClockHandComponent {
  private _lengthPercent = 100;

  // Required inputs
  @Input({required: true}) src!: string;
  @Input({required: true}) alt!: string;

  // Optional input
  @Input() transform: string | null = null; // maps to style.transform
  @Input() loading: ImgLoading = 'lazy';

  @Input() handType: ClockHandType = 'secondHand';

  /**
   * Length expressed as a percentage of the clock diameter.
   * Values outside this range are clamped to the nearest bound.
   *
   * @range 1–100
   */
  @Input()
  set lengthPercent(value: number) {
    this._lengthPercent = Math.min(100, Math.max(1, value));
  }

  @Output() stateChange = new EventEmitter<WeatherImageState>();

  @HostBinding('class.clock-hand') baseClass = true;

  @HostBinding('style.width.%')
  get hostWidth(): string {
    return this._lengthPercent.toString();
  }

  @HostBinding('style.height.%')
  get hostHeight(): string {
    return this._lengthPercent.toString();
  }

  @HostBinding('class')
  get hostClassBinding(): string {
    return `clock-hand__${this.handClassSuffix}`;
  }

  private get handClassSuffix(): 'hour' | 'minutes' | 'seconds' {
    switch (this.handType) {
      case 'hourHand':
        return 'hour';
      case 'minuteHand':
        return 'minutes';
      case 'secondHand':
      default:
        return 'seconds';
    }
  }

  onImgLoad(): void {
    this.stateChange.emit({ status: 'success', imageUrl: this.src });
  }

  onImgError(): void {
    this.stateChange.emit({
      status: 'error',
      message: `Failed to load clock hand image: ${this.src}`,
    });
  }
}
