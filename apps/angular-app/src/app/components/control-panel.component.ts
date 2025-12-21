import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { PRESETS } from '../constants';
import { SliderComponent } from './slider.component';

const rgbToHex = (rgb: [number, number, number]): string =>
  '#' + rgb.map(v => Math.round(v * 255).toString(16).padStart(2, '0')).join('');

const hexToRgb = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result && result[1] && result[2] && result[3]
    ? [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255]
    : [0.157, 0.157, 0.235];
};

@Component({
  selector: 'app-control-panel',
  standalone: true,
  imports: [SliderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Backdrop -->
    @if (isOpen()) {
      <div class="fixed inset-0 z-20" (click)="close.emit()"></div>
    }

    <div class="fixed right-6 top-1/2 z-30 flex -translate-y-1/2 items-center gap-3 md:right-8">
      <!-- Panel -->
      @if (isOpen()) {
        <div
          class="w-80 md:w-[480px] max-h-[85vh] overflow-y-auto rounded-2xl border border-white/5 bg-zinc-950/90 p-4 shadow-2xl backdrop-blur-md origin-right animate-fade-in-scale"
          (dragover)="$event.stopPropagation()"
          (dragleave)="$event.stopPropagation()"
          (drop)="$event.stopPropagation()"
        >
          <!-- Presets -->
          <div class="mb-5">
            <span class="mb-3 block text-xs text-zinc-500 font-semibold">Presets</span>
            <div class="grid grid-cols-3 md:grid-cols-6 gap-2">
              @for (preset of presets; track preset.name; let i = $index) {
                <button
                  type="button"
                  class="relative aspect-square overflow-hidden rounded-lg border-2 transition-[transform,border-color] duration-100 hover:scale-105 active:scale-95"
                  [class.border-white]="activePreset() === i"
                  [class.border-transparent]="activePreset() !== i"
                  [title]="preset.name"
                  (click)="presetSelect.emit(i)"
                >
                  <img [src]="preset.url" [alt]="preset.name" class="w-full h-full object-cover select-none pointer-events-none" />
                </button>
              }
            </div>
          </div>

          <!-- Parameters -->
          <div class="border-t border-white/5 py-4">
            <span class="mb-4 block text-xs text-zinc-500 font-semibold">Parameters</span>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div class="mb-1.5 flex items-center justify-between">
                  <span class="text-xs text-zinc-200">Warp</span>
                  <span class="text-xs tabular-nums text-zinc-500">{{ warpIntensity().toFixed(2) }}</span>
                </div>
                <app-slider [min]="0" [max]="1" [step]="0.01" [value]="warpIntensity()" (valueChange)="warpIntensityChange.emit($event)" />
              </div>
              <div>
                <div class="mb-1.5 flex items-center justify-between">
                  <span class="text-xs text-zinc-200">Blur</span>
                  <span class="text-xs tabular-nums text-zinc-500">{{ blurPasses() }}</span>
                </div>
                <app-slider [min]="1" [max]="40" [step]="1" [value]="blurPasses()" (valueChange)="blurPassesChange.emit($event)" />
              </div>
              <div>
                <div class="mb-1.5 flex items-center justify-between">
                  <span class="text-xs text-zinc-200">Speed</span>
                  <span class="text-xs tabular-nums text-zinc-500">{{ animationSpeed().toFixed(1) }}×</span>
                </div>
                <app-slider [min]="0.1" [max]="3" [step]="0.1" [value]="animationSpeed()" (valueChange)="animationSpeedChange.emit($event)" />
              </div>
              <div>
                <div class="mb-1.5 flex items-center justify-between">
                  <span class="text-xs text-zinc-200">Transition</span>
                  <span class="text-xs tabular-nums text-zinc-500">{{ (transitionDuration() / 1000).toFixed(1) }}s</span>
                </div>
                <app-slider [min]="0" [max]="3000" [step]="100" [value]="transitionDuration()" (valueChange)="transitionDurationChange.emit($event)" />
              </div>
              <div>
                <div class="mb-1.5 flex items-center justify-between">
                  <span class="text-xs text-zinc-200">Saturation</span>
                  <span class="text-xs tabular-nums text-zinc-500">{{ saturation().toFixed(2) }}</span>
                </div>
                <app-slider [min]="0" [max]="3" [step]="0.05" [value]="saturation()" (valueChange)="saturationChange.emit($event)" />
              </div>
              <div>
                <div class="mb-1.5 flex items-center justify-between">
                  <span class="text-xs text-zinc-200">Tint</span>
                  <div class="flex items-center gap-2">
                    <label class="block h-4 w-4 cursor-pointer rounded-full border border-white/20" [style.background-color]="tintColorHex()">
                      <input type="color" [value]="tintColorHex()" (input)="onTintColorChange($event)" class="sr-only" />
                    </label>
                    <span class="text-xs tabular-nums text-zinc-500">{{ (tintIntensity() * 100).toFixed(0) }}%</span>
                  </div>
                </div>
                <app-slider [min]="0" [max]="1" [step]="0.01" [value]="tintIntensity()" (valueChange)="tintIntensityChange.emit($event)" />
              </div>
              <div>
                <div class="mb-1.5 flex items-center justify-between">
                  <span class="text-xs text-zinc-200">Dither</span>
                  <span class="text-xs tabular-nums text-zinc-500">{{ (dithering() * 1000).toFixed(1) }}</span>
                </div>
                <app-slider [min]="0" [max]="0.1" [step]="0.001" [value]="dithering()" (valueChange)="ditheringChange.emit($event)" />
              </div>
              <div>
                <div class="mb-1.5 flex items-center justify-between">
                  <span class="text-xs text-zinc-200">Scale</span>
                  <span class="text-xs tabular-nums text-zinc-500">{{ scale().toFixed(2) }}</span>
                </div>
                <app-slider [min]="0.01" [max]="4" [step]="0.01" [value]="scale()" (valueChange)="scaleChange.emit($event)" />
              </div>
            </div>
          </div>

          <!-- Custom image -->
          <div class="border-t border-white/5 pt-4">
            <span class="mb-3 block text-xs text-zinc-500 font-semibold">Custom image</span>
            <div class="flex gap-2">
              <input
                type="text"
                class="flex-1 rounded-lg border border-white/10 px-3 py-2 text-sm text-zinc-200 placeholder-zinc-500 outline-none transition-colors focus:border-white/20 bg-transparent"
                placeholder="Image URL..."
                [value]="imageUrl()"
                (input)="onImageUrlInput($event)"
                (keydown.enter)="loadFromUrl.emit()"
              />
              <button
                type="button"
                class="rounded-lg bg-white/10 px-3 py-2 text-sm text-zinc-200 transition-colors hover:bg-white/20"
                (click)="loadFromUrl.emit()"
              >
                Go
              </button>
            </div>
            <div class="mt-2 flex gap-2">
              <button
                type="button"
                class="flex-1 rounded-lg border border-white/20 py-2 text-xs text-zinc-400 transition-colors hover:border-white/40 hover:text-zinc-200 bg-transparent"
                (click)="fileInput.click()"
              >
                Upload
              </button>
              <input
                #fileInput
                type="file"
                accept="image/*"
                class="hidden"
                (change)="onFileChange($event)"
              />
              <div class="flex items-center justify-center rounded-lg border border-white/20 py-2 px-2 text-xs text-zinc-300 opacity-50 select-none">
                ⌘V paste
              </div>
            </div>
          </div>
        </div>
      }

      <!-- Toggle button -->
      <button
        type="button"
        class="rounded-full bg-white/10 p-3 text-white backdrop-blur-md transition-colors hover:bg-white/20"
        (click)="toggle.emit()"
      >
        @if (isOpen()) {
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        } @else {
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
          </svg>
        }
      </button>
    </div>
  `,
})
export class ControlPanelComponent {
  readonly presets = PRESETS;

  // Inputs
  readonly isOpen = input.required<boolean>();
  readonly activePreset = input.required<number>();
  readonly imageUrl = input.required<string>();
  readonly warpIntensity = input.required<number>();
  readonly blurPasses = input.required<number>();
  readonly animationSpeed = input.required<number>();
  readonly transitionDuration = input.required<number>();
  readonly saturation = input.required<number>();
  readonly tintColor = input.required<[number, number, number]>();
  readonly tintIntensity = input.required<number>();
  readonly dithering = input.required<number>();
  readonly scale = input.required<number>();

  // Outputs
  readonly toggle = output<void>();
  readonly close = output<void>();
  readonly presetSelect = output<number>();
  readonly imageUrlChange = output<string>();
  readonly loadFromUrl = output<void>();
  readonly fileSelect = output<File>();
  readonly warpIntensityChange = output<number>();
  readonly blurPassesChange = output<number>();
  readonly animationSpeedChange = output<number>();
  readonly transitionDurationChange = output<number>();
  readonly saturationChange = output<number>();
  readonly tintColorChange = output<[number, number, number]>();
  readonly tintIntensityChange = output<number>();
  readonly ditheringChange = output<number>();
  readonly scaleChange = output<number>();

  readonly tintColorHex = computed(() => rgbToHex(this.tintColor()));

  onTintColorChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    this.tintColorChange.emit(hexToRgb(target.value));
  };

  onImageUrlInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    this.imageUrlChange.emit(target.value);
  };

  onFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) this.fileSelect.emit(file);
  };
}
