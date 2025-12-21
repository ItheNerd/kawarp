import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-slider',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="slider-container">
      <div class="slider-track">
        <div class="slider-progress" [style.width.%]="percent()"></div>
      </div>
      <div class="slider-thumb" [style.left.%]="percent()"></div>
      <input
        type="range"
        [min]="min()"
        [max]="max()"
        [step]="step()"
        [value]="value()"
        (input)="onChange($event)"
      />
    </div>
  `,
})
export class SliderComponent {
  readonly min = input.required<number>();
  readonly max = input.required<number>();
  readonly step = input.required<number>();
  readonly value = input.required<number>();
  readonly valueChange = output<number>();

  readonly percent = computed(() => ((this.value() - this.min()) / (this.max() - this.min())) * 100);

  onChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    this.valueChange.emit(Number(target.value));
  };
}
