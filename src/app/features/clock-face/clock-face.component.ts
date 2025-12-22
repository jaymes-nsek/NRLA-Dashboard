import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DateChipComponent} from '../date-chip/date-chip.component';

@Component({
  selector: 'nrla-clock-face',
  standalone: true,
  templateUrl: './clock-face.component.html',
  styleUrl: './clock-face.component.scss',
  imports: [
    DateChipComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClockFaceComponent implements OnInit {

  protected readonly today = new Date();

  secsHandTransform = '';
  minsHandTransform = '';
  hoursHandTransform = '';

  constructor(private cdr: ChangeDetectorRef) {
  }


  ngOnInit() {
    this.startAnimation((t: number) => {
      const d = new Date(t);

      // seconds hand
      const ms = d.getMilliseconds();
      const s = d.getSeconds() + ms / 1000;
      const secondsAngle = (s / 60) * 360;
      this.secsHandTransform = `rotate(${secondsAngle}deg)`;

      // minutes hand
      const m = d.getMinutes();
      const minutesAngle = (m / 60) * 360;
      this.minsHandTransform = `rotate(${minutesAngle}deg)`;

      // hours hand
      const h = d.getHours();
      const hoursAngle = ((h % 12) / 12) * 360;
      this.hoursHandTransform = `rotate(${hoursAngle}deg)`;

      this.cdr.detectChanges()
    });
  }

  /**
   * Get absolute system time now, no accumulation.
   */
  private static nowMs() {
    const wallClockStart = Date.now();
    const perfStart = performance.now();

    return wallClockStart + (performance.now() - perfStart);
  }

  private startAnimation(render: any) {
    function frame() {
      const t = ClockFaceComponent.nowMs();
      render(t);
      requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  }
}
