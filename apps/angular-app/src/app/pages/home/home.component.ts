import { Component, inject, viewChild, AfterViewInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { KawarpComponent } from '@kawarp/angular';
import { fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';
import {
  HeaderComponent,
  FooterComponent,
  ControlPanelComponent,
  DocumentationComponent,
} from '../../components';
import { PRESETS } from '../../constants';
import { KawarpDemoStore } from '../../hooks/kawarp-demo.store';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    KawarpComponent,
    HeaderComponent,
    FooterComponent,
    ControlPanelComponent,
    DocumentationComponent,
    NgClass,
  ],
  template: `
    <div
      class="relative min-h-screen overflow-x-hidden bg-zinc-950 text-zinc-100"
      (dragover)="onDragOver($event)"
      (dragleave)="onDragLeave()"
      (drop)="onDrop($event)"
    >
      <!-- Background -->
      <div
        class="fixed inset-0 transition-opacity duration-500 ease-out h-screen w-screen"
        [ngClass]="{ 'opacity-0': !store.isLoaded() }"
      >
        <kawarp-background
          #kawarp
          [src]="initialSrc"
          [warpIntensity]="store.warpIntensity()"
          [blurPasses]="store.blurPasses()"
          [animationSpeed]="store.animationSpeed()"
          [transitionDuration]="store.transitionDuration()"
          [saturation]="store.saturation()"
          [tintColor]="store.tintColor()"
          [tintIntensity]="store.tintIntensity()"
          [dithering]="store.dithering()"
          [scale]="store.scale()"
          (loaded)="onKawarpLoaded()"
          (errored)="onKawarpError($event)"
        />
      </div>

      <!-- Drag overlay -->
      @if (store.isDragging()) {
      <div
        class="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/80 backdrop-blur-sm"
      >
        <div class="rounded-2xl border-2 border-dashed border-zinc-500 px-16 py-12">
          <p class="text-xl text-zinc-300">Drop image here</p>
        </div>
      </div>
      }

      <!-- Content -->
      <div class="relative z-10 flex flex-col">
        <app-header />

        <app-control-panel
          [isOpen]="store.panelOpen()"
          [activePreset]="store.activePreset()"
          [imageUrl]="store.imageUrl()"
          [warpIntensity]="store.warpIntensity()"
          [blurPasses]="store.blurPasses()"
          [animationSpeed]="store.animationSpeed()"
          [transitionDuration]="store.transitionDuration()"
          [saturation]="store.saturation()"
          [tintColor]="store.tintColor()"
          [tintIntensity]="store.tintIntensity()"
          [dithering]="store.dithering()"
          [scale]="store.scale()"
          (toggle)="store.togglePanel()"
          (close)="store.closePanel()"
          (presetSelect)="loadPreset($event)"
          (imageUrlChange)="store.updateState('imageUrl', $event)"
          (loadFromUrl)="loadFromUrl()"
          (fileSelect)="handleFile($event)"
          (warpIntensityChange)="store.updateState('warpIntensity', $event)"
          (blurPassesChange)="store.updateState('blurPasses', $event)"
          (animationSpeedChange)="store.updateState('animationSpeed', $event)"
          (transitionDurationChange)="store.updateState('transitionDuration', $event)"
          (saturationChange)="store.updateState('saturation', $event)"
          (tintColorChange)="store.updateState('tintColor', $event)"
          (tintIntensityChange)="store.updateState('tintIntensity', $event)"
          (ditheringChange)="store.updateState('dithering', $event)"
          (scaleChange)="store.updateState('scale', $event)"
        />

        <main class="relative flex min-h-[95vh] items-end justify-end p-6">
          <p class="max-w-xs text-right text-sm text-white/40 animate-fade-in-up">
            Fluid animated backgrounds powered by WebGL, Kawase blur & domain warping.
          </p>
          <div
            class="absolute bottom-0 left-0 right-0 h-48 bg-linear-to-t from-black/30 to-transparent -z-1 pointer-events-none"
          ></div>
        </main>

        <app-documentation />
        <app-footer />
      </div>
    </div>
  `,
})
export class HomeComponent implements AfterViewInit {
  readonly store = inject(KawarpDemoStore);
  private readonly kawarp = viewChild<KawarpComponent>('kawarp');
  readonly initialSrc = PRESETS[0].url;

  ngAfterViewInit() {
    console.log('HomeComponent initialized');
    console.log('Initial source:', this.initialSrc);
    console.log('Kawarp component:', this.kawarp());
  }

  constructor() {
    fromEvent<ClipboardEvent>(document, 'paste')
      .pipe(
        takeUntilDestroyed(),
        filter((e) => !!e.clipboardData?.items)
      )
      .subscribe((e) => {
        const items = e.clipboardData!.items;
        for (const item of Array.from(items)) {
          if (item.type.startsWith('image/')) {
            const file = item.getAsFile();
            if (file) this.handleFile(file);
            break;
          }
        }
      });
  }

  onKawarpLoaded() {
    console.log('Kawarp background loaded successfully');
    this.store.setLoaded(true);
  }

  onKawarpError(error: Error) {
    console.error('Kawarp load error:', error);
    // Show background anyway to avoid blank screen
    this.store.setLoaded(true);
  }

  async loadPreset(index: number) {
    const preset = PRESETS[index];
    if (!preset) return;
    try {
      await this.kawarp()?.loadImage(preset.url);
      console.log('loaded preset', preset.url);
      this.store.updateState('activePreset', index);
    } catch {
      /* ignore */
    }
  }

  async loadFromUrl() {
    const url = this.store.imageUrl().trim();
    if (!url) return;
    try {
      await this.kawarp()?.loadImage(url);
      this.store.updateState('activePreset', -1);
    } catch {
      alert('Failed to load image. Check the URL and try again.');
    }
  }

  async handleFile(file: File) {
    if (!file.type.startsWith('image/')) return;
    try {
      await this.kawarp()?.loadBlob(file);
      this.store.updateState('activePreset', -1);
    } catch {
      alert('Failed to load image.');
    }
  }

  onDragOver(e: DragEvent) {
    e.preventDefault();
    this.store.setDragging(true);
  }

  onDragLeave() {
    this.store.setDragging(false);
  }

  onDrop(e: DragEvent) {
    e.preventDefault();
    this.store.setDragging(false);
    const file = e.dataTransfer?.files[0];
    if (file) this.handleFile(file);
  }
}
