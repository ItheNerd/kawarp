export const PRESETS = [
  {
    name: "Mountains",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
  },
  {
    name: "Ocean",
    url: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&q=80",
  },
  {
    name: "Forest",
    url: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
  },
  {
    name: "Sunset",
    url: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=800&q=80",
  },
  {
    name: "Aurora",
    url: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80",
  },
  {
    name: "Desert",
    url: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80",
  },
] as const;

export const PACKAGE_MANAGERS = [
  { id: 'npm', label: 'npm', cmd: 'npm install' },
  { id: 'yarn', label: 'yarn', cmd: 'yarn add' },
  { id: 'pnpm', label: 'pnpm', cmd: 'pnpm add' },
  { id: 'bun', label: 'bun', cmd: 'bun add' },
] as const;

export const METHODS = [
  { name: 'loadImage(url)', desc: 'Load image from URL' },
  { name: 'loadGradient(colors, angle?)', desc: 'Load gradient as source' },
  { name: 'loadBlob(blob)', desc: 'Load from Blob or File' },
  { name: 'start()', desc: 'Start animation' },
  { name: 'stop()', desc: 'Stop animation' },
  { name: 'resize()', desc: 'Update dimensions' },
  { name: 'dispose()', desc: 'Clean up resources' },
] as const;

export const OPTIONS = [
  { name: 'warpIntensity', type: 'number', default: '1.0', desc: 'Warp effect strength (0-1)' },
  { name: 'blurPasses', type: 'number', default: '8', desc: 'Kawase blur passes (1-40)' },
  { name: 'animationSpeed', type: 'number', default: '1.0', desc: 'Animation speed multiplier' },
  { name: 'transitionDuration', type: 'number', default: '1000', desc: 'Crossfade duration in ms' },
  { name: 'saturation', type: 'number', default: '1.5', desc: 'Color saturation multiplier' },
  { name: 'tintColor', type: '[r, g, b]', default: '[0.16, 0.16, 0.24]', desc: 'Tint color for dark areas (0-1)' },
  { name: 'tintIntensity', type: 'number', default: '0.15', desc: 'Tint effect strength (0-1)' },
  { name: 'dithering', type: 'number', default: '0.008', desc: 'Dithering strength (0-0.1)' },
  { name: 'scale', type: 'number', default: '1.0', desc: 'Overall zoom level of the effect (0.01-4)' },
] as const;

export const QUICK_START_CODE = `import { Kawarp } from '@kawarp/core';

const canvas = document.querySelector('canvas');
const kawarp = new Kawarp(canvas);

await kawarp.loadImage('path/to/image.jpg');
kawarp.start();`;

export const ANGULAR_BASIC_CODE = `import { KawarpComponent } from '@kawarp/angular';

@Component({
  imports: [KawarpComponent],
  template: \`
    <kawarp-background
      [src]="imageUrl"
      [warpIntensity]="0.8"
      style="width: 100%; height: 100vh"
    />
  \`
})
export class AppComponent {
  imageUrl = '/image.jpg';
}`;

export const ANGULAR_IMPERATIVE_CODE = `import { KawarpComponent } from '@kawarp/angular';
import { viewChild } from '@angular/core';

@Component({
  imports: [KawarpComponent],
  template: \`
    <kawarp-background #kawarp [src]="imageUrl" />
    <button (click)="loadNew()">Load New Image</button>
  \`
})
export class AppComponent {
  private kawarp = viewChild<KawarpComponent>('kawarp');
  imageUrl = '/initial.jpg';

  async loadNew() {
    await this.kawarp()?.loadImage('/new.jpg');
  }
}`;

export const REACT_PROPS = [
  { name: 'src', type: 'string', desc: 'Image URL (auto-loads on change)' },
  { name: 'autoPlay', type: 'boolean', default: 'true', desc: 'Auto-start animation' },
  { name: '(loaded)', type: 'EventEmitter', desc: 'Emits when image loads' },
  { name: '(errored)', type: 'EventEmitter', desc: 'Emits on load error' },
] as const;

export const GITHUB_URL = 'https://github.com/better-lyrics/kawarp';
export const BETTER_LYRICS_URL = 'https://better-lyrics.boidu.dev';
export const BETTER_LYRICS_ICON = 'https://raw.githubusercontent.com/better-lyrics/better-lyrics/refs/heads/master/images/icons/icon-512.png';

export type Preset = (typeof PRESETS)[number];
export type PackageManager = (typeof PACKAGE_MANAGERS)[number];
