import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nrla-clock-face',
  standalone: true,
  templateUrl: './clock-face.component.html',
  styleUrl: './clock-face.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClockFaceComponent {}
