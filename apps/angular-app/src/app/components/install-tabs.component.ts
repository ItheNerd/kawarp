import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { PACKAGE_MANAGERS } from '../constants';
import { CopyButtonComponent } from './copy-button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-install-tabs',
  standalone: true,
  imports: [CopyButtonComponent, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <div class="mb-3 flex gap-1">
        @for (pm of packageManagers; track pm.id) {
          <button
            type="button"
            class="relative rounded-lg px-3 py-1.5 text-xs font-medium transition-colors"
            [class.text-white]="selected() === pm.id"
            [class.text-zinc-500]="selected() !== pm.id"
            [ngClass]="{'hover:text-zinc-300': selected() !== pm.id}"
            (click)="selected.set(pm.id)"
          >
            @if (selected() === pm.id) {
              <div class="absolute inset-0 rounded-lg bg-white/10"></div>
            }
            <span class="relative z-10">{{ pm.label }}</span>
          </button>
        }
      </div>
      <div class="group relative">
        <pre class="overflow-x-auto rounded-xl border border-white/10 bg-zinc-900/80 p-4 pr-12 text-sm font-mono m-0"><code class="flex text-zinc-300"><span class="text-zinc-500">$</span> {{ selectedPm()?.cmd }} <span class="text-emerald-400"> {{ packageName() }}</span></code></pre>
        <app-copy-button [text]="fullCommand()" class="absolute right-3 top-1/2 -translate-y-1/2 transition-opacity duration-200 opacity-100 md:opacity-0 md:group-hover:opacity-100" />
      </div>
    </div>
  `,
})
export class InstallTabsComponent {
  readonly packageManagers = PACKAGE_MANAGERS;
  readonly packageName = input('@kawarp/core');
  readonly selected = signal<string>('npm');

  readonly selectedPm = computed(() => PACKAGE_MANAGERS.find(pm => pm.id === this.selected()));
  readonly fullCommand = computed(() => `${this.selectedPm()?.cmd} ${this.packageName()}`);
}
