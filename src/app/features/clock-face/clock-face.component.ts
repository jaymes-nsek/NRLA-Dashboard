import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';

@Component({
  selector: 'nrla-clock-face',
  standalone: true,
  templateUrl: './clock-face.component.html',
  styleUrl: './clock-face.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClockFaceComponent implements OnInit {

  secsHandTransform = '';

  constructor(private cdr: ChangeDetectorRef) {
  }


  ngOnInit() {
    this.startAnimation((t: number) => {
      const d = new Date(t);
      const ms = d.getMilliseconds();
      const s = d.getSeconds() + ms / 1000;
      const secondsAngle = (s / 60) * 360;

      this.secsHandTransform = `rotate(${secondsAngle}deg)`;
      this.cdr.detectChanges();
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
