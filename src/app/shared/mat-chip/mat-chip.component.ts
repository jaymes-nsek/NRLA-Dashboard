import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

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
}
