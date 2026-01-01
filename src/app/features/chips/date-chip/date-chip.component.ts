import {ChangeDetectionStrategy, Component, HostBinding, Input} from '@angular/core';
import {DatePipe} from '@angular/common';
import {MatChipComponent} from '../mat-chip/mat-chip.component';

@Component({
  selector: 'nrla-date-chip',
  standalone: true,
  imports: [DatePipe, MatChipComponent],
  templateUrl: './date-chip.component.html',
  styleUrls: [
    './../chips.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateChipComponent {
  private _date: Date = new Date();

  @HostBinding('class.date-chip') baseClass = true;

  @Input() width: string = '100%';
  @Input() height: string = '100%';

  @Input()
  set date(value: Date | string | number | null | undefined) {
    this._date = value ? new Date(value) : new Date();
  }

  get date(): Date {
    return this._date;
  }
}
