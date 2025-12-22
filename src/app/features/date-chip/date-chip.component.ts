import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {DatePipe} from '@angular/common';
import {MatChipComponent} from '../../shared/mat-chip/mat-chip.component';

@Component({
  selector: 'nrla-date-chip',
  standalone: true,
  imports: [DatePipe, MatChipComponent],
  templateUrl: './date-chip.component.html',
  styleUrl: './date-chip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateChipComponent {
  private _date: Date = new Date();

  @Input()
  set date(value: Date | string | number | null | undefined) {
    this._date = value ? new Date(value) : new Date();
  }

  get date(): Date {
    return this._date;
  }
}
