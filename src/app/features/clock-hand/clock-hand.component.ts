import {ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output} from '@angular/core';
import { WeatherImageState } from "../clock-face/clock-face.component";

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
  // Required inputs
  @Input({required: true}) src!: string;
  @Input({required: true}) alt!: string;

  // Optional input
  @Input() transform: string | null = null; // maps to style.transform
  @Input() loading: ImgLoading = 'lazy';

  @Input() handType: ClockHandType = 'secondHand';

  @Output() stateChange = new EventEmitter<WeatherImageState>();

  @HostBinding('class')
  get hostClassBinding(): string {
    return `clock-face__${this.handClassSuffix}-hand`;
  }

  get imageClassBinding(): string {
    return `clock-face__${this.handClassSuffix}-hand-image`;
  }

  private get handClassSuffix(): 'hour' | 'minute' | 'second' {
    switch (this.handType) {
      case 'hourHand':
        return 'hour';
      case 'minuteHand':
        return 'minute';
      case 'secondHand':
      default:
        return 'second';
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
