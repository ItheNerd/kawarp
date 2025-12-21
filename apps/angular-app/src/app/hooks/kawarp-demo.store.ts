import { Injectable, computed, signal } from '@angular/core';
import { PRESETS } from '../constants';

export interface DemoState {
  isLoaded: boolean;
  activePreset: number;
  imageUrl: string;
  warpIntensity: number;
  blurPasses: number;
  animationSpeed: number;
  transitionDuration: number;
  saturation: number;
  tintColor: [number, number, number];
  tintIntensity: number;
  dithering: number;
  scale: number;
  isDragging: boolean;
  panelOpen: boolean;
}

export const INITIAL_STATE: DemoState = {
  isLoaded: false,
  activePreset: 0,
  imageUrl: '',
  warpIntensity: 1.0,
  blurPasses: 8,
  animationSpeed: 1.0,
  transitionDuration: 1000,
  saturation: 1.5,
  tintColor: [0.157, 0.157, 0.235],
  tintIntensity: 0.15,
  dithering: 0.008,
  scale: 1.0,
  isDragging: false,
  panelOpen: false,
};

@Injectable({
  providedIn: 'root',
})
export class KawarpDemoStore {
  readonly state = signal<DemoState>({ ...INITIAL_STATE });

  readonly isLoaded = computed(() => this.state().isLoaded);
  readonly activePreset = computed(() => this.state().activePreset);
  readonly imageUrl = computed(() => this.state().imageUrl);
  readonly warpIntensity = computed(() => this.state().warpIntensity);
  readonly blurPasses = computed(() => this.state().blurPasses);
  readonly animationSpeed = computed(() => this.state().animationSpeed);
  readonly transitionDuration = computed(() => this.state().transitionDuration);
  readonly saturation = computed(() => this.state().saturation);
  readonly tintColor = computed(() => this.state().tintColor);
  readonly tintIntensity = computed(() => this.state().tintIntensity);
  readonly dithering = computed(() => this.state().dithering);
  readonly scale = computed(() => this.state().scale);
  readonly isDragging = computed(() => this.state().isDragging);
  readonly panelOpen = computed(() => this.state().panelOpen);

  updateState<K extends keyof DemoState>(key: K, value: DemoState[K]) {
    this.state.update((s) => ({ ...s, [key]: value }));
  }

  setLoaded(loaded: boolean) {
    this.updateState('isLoaded', loaded);
  }

  setDragging(dragging: boolean) {
    this.updateState('isDragging', dragging);
  }

  togglePanel() {
    this.updateState('panelOpen', !this.state().panelOpen);
  }

  closePanel() {
    this.updateState('panelOpen', false);
  }
}
