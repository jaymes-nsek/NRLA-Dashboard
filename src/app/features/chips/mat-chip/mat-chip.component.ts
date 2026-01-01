import {ChangeDetectionStrategy, Component, HostBinding, Input} from '@angular/core';

/**
 * Lightweight stand-in for Angular Material's mat-chip. This keeps the API surface
 * compatible for this project while registry access to install @angular/material
 * is restricted.
 */
@Component({
  selector: 'mat-chip',
  standalone: true,
  template: `<ng-content />`,
  styleUrls: ['./mat-chip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatChipComponent {
  @HostBinding('class.mat-chip') baseClass = true;

  @HostBinding('style.width')
  get hostWidth(): string {
    return this.width;
  }

  @HostBinding('style.height')
  get hostHeight(): string {
    return this.height;
  }

  @Input() width: string = '48px';
  @Input() height: string = '48px';
}
