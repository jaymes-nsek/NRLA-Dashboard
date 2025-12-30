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
  // Allowing setting width and height one time to avoid layout shifts
  private _maxWidth: number = 80;
  private _maxHeight: number = 18;

  @Input()
  set maxWidth(value: number) {
    this._maxWidth = value;
    this.hostWidth = `${value}px`;
  }

  @Input()
  set maxHeight(value: number) {
    this._maxHeight = value;
    this.hostHeight = `${value}px`;
  }

  @HostBinding('style.width') hostWidth!: string;
  @HostBinding('style.height') hostHeight!: string;

  @HostBinding('class.mat-chip') baseClass = true;

  constructor() {
    this.hostWidth = `${this._maxWidth}px`;
    this.hostHeight = `${this._maxHeight}px`;
  }
}
