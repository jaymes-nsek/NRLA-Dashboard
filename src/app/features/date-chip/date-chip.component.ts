import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatChipComponent } from '../../shared/mat-chip/mat-chip.component';

type DateChipTone = 'soft' | 'solid';

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
  private _tone: DateChipTone = 'soft';

  @HostBinding('class.date-chip') baseClass = true;

  @HostBinding('class.date-chip--soft')
  get isSoftTone() {
    return this._tone === 'soft';
  }

  @HostBinding('class.date-chip--solid')
  get isSolidTone() {
    return this._tone === 'solid';
  }

  @Input()
  set date(value: Date | string | number | null | undefined) {
    this._date = value ? new Date(value) : new Date();
  }

  get date(): Date {
    return this._date;
  }

  @Input()
  set tone(value: DateChipTone) {
    this._tone = value ?? 'soft';
  }

  get tone(): DateChipTone {
    return this._tone;
  }
}
