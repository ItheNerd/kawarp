import { ChangeDetectionStrategy, Component } from '@angular/core';
import { METHODS, OPTIONS, QUICK_START_CODE, ANGULAR_BASIC_CODE, ANGULAR_IMPERATIVE_CODE, REACT_PROPS } from '../constants';
import { CodeBlockComponent } from './code-block.component';
import { InstallTabsComponent } from './install-tabs.component';

@Component({
  selector: 'app-documentation',
  standalone: true,
  imports: [CodeBlockComponent, InstallTabsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="relative z-10 border-t border-white/10 bg-zinc-950/90 backdrop-blur-xl">
      <div class="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <h2 class="mb-6 text-3xl font-semibold tracking-tight text-white">Documentation</h2>

        <p class="mb-12 text-zinc-400 leading-relaxed">
          Kawarp is a zero-dependency, WebGL-powered library for creating fluid,
          animated background effects similar to Apple Music's album art
          visualization. It uses Kawase blur for efficient, high-quality
          blurring and simplex noise-based domain warping for organic motion.
          The library is optimized for performance with blur operations running
          on small textures only when the image changes, while per-frame
          rendering is minimal.
        </p>

        <div class="flex flex-col gap-12">
          <!-- Installation -->
          <div>
            <h3 class="mb-4 text-lg font-medium text-white">Installation</h3>
            <app-install-tabs />
          </div>

          <!-- Quick Start -->
          <div>
            <h3 class="mb-4 text-lg font-medium text-white">Quick Start</h3>
            <app-code-block [code]="quickStartCode" />
          </div>

          <!-- Options -->
          <div>
            <h3 class="mb-4 text-lg font-medium text-white">Options</h3>
            <div class="overflow-hidden rounded-xl border border-white/10">
              <table class="w-full text-left text-sm border-collapse">
                <thead class="border-b border-white/10 bg-white/5">
                  <tr>
                    <th class="px-4 py-3 font-medium text-zinc-300">Option</th>
                    <th class="px-4 py-3 font-medium text-zinc-300">Type</th>
                    <th class="px-4 py-3 font-medium text-zinc-300">Default</th>
                    <th class="px-4 py-3 font-medium text-zinc-300">Description</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-white/5">
                  @for (opt of options; track opt.name) {
                    <tr>
                      <td class="px-4 py-3 font-mono text-xs text-zinc-400">{{ opt.name }}</td>
                      <td class="px-4 py-3 text-zinc-500">{{ opt.type }}</td>
                      <td class="px-4 py-3 text-zinc-500">{{ $any(opt).default ?? '-' }}</td>
                      <td class="px-4 py-3 text-zinc-400">{{ opt.desc }}</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>

          <!-- Methods -->
          <div>
            <h3 class="mb-4 text-lg font-medium text-white">Methods</h3>
            <div class="flex flex-col gap-3">
              @for (method of methods; track method.name) {
                <div class="flex items-center gap-4 rounded-lg border border-white/10 bg-white/5 px-4 py-3">
                  <code class="shrink-0 font-mono text-sm text-zinc-300">{{ method.name }}</code>
                  <span class="text-sm text-zinc-500">{{ method.desc }}</span>
                </div>
              }
            </div>
          </div>

          <!-- Angular Section -->
          <div class="pt-12 border-t border-white/10">
            <h2 class="mb-8 text-2xl font-semibold tracking-tight text-white">Angular</h2>

            <div class="flex flex-col gap-12">
              <div>
                <h3 class="mb-4 text-lg font-medium text-white">Installation</h3>
                <app-install-tabs packageName="@kawarp/angular" />
              </div>

              <div>
                <h3 class="mb-4 text-lg font-medium text-white">Basic Usage</h3>
                <app-code-block [code]="angularBasicCode" />
              </div>

              <div>
                <h3 class="mb-4 text-lg font-medium text-white">Imperative API</h3>
                <p class="mb-4 text-sm text-zinc-400">
                  For operations that can't be done via inputs—like loading
                  from files, blobs, or gradients—use the component instance methods.
                </p>
                <app-code-block [code]="angularImperativeCode" />
              </div>

              <div>
                <h3 class="mb-4 text-lg font-medium text-white">Component Inputs</h3>
                <p class="mb-4 text-sm text-zinc-400">
                  All core options are available as inputs, plus Angular-specific ones:
                </p>
                <div class="overflow-hidden rounded-xl border border-white/10">
                  <table class="w-full text-left text-sm border-collapse">
                    <thead class="border-b border-white/10 bg-white/5">
                      <tr>
                        <th class="px-4 py-3 font-medium text-zinc-300">Input</th>
                        <th class="px-4 py-3 font-medium text-zinc-300">Type</th>
                        <th class="px-4 py-3 font-medium text-zinc-300">Default</th>
                        <th class="px-4 py-3 font-medium text-zinc-300">Description</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-white/5">
                      @for (prop of reactProps; track prop.name) {
                        <tr>
                          <td class="px-4 py-3 font-mono text-xs text-zinc-400">{{ prop.name }}</td>
                          <td class="px-4 py-3 text-zinc-500">{{ prop.type }}</td>
                          <td class="px-4 py-3 text-zinc-500">{{ $any(prop).default ?? '-' }}</td>
                          <td class="px-4 py-3 text-zinc-400">{{ prop.desc }}</td>
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class DocumentationComponent {
  readonly options = OPTIONS;
  readonly methods = METHODS;
  readonly quickStartCode = QUICK_START_CODE;
  readonly angularBasicCode = ANGULAR_BASIC_CODE;
  readonly angularImperativeCode = ANGULAR_IMPERATIVE_CODE;
  readonly reactProps = REACT_PROPS;
}
