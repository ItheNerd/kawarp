import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { GITHUB_URL, BETTER_LYRICS_URL } from '../constants';

@Component({
  selector: 'app-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="fixed w-full flex items-center justify-between bg-linear-to-b from-black/25 to-black/0 p-6 z-10">
      <div
        class="flex flex-col gap-1 cursor-default"
        (mouseenter)="logoExpanded.set(true)"
        (mouseleave)="logoExpanded.set(false)"
      >
        <h1 class="relative text-xl font-medium text-white m-0 select-none">
          kawa<span
            class="inline-block overflow-hidden whitespace-nowrap align-bottom font-light text-white/75 transition-[width,opacity] duration-300 ease-out"
            [class.w-[10.5rem]]="logoExpanded()"
            [class.w-0]="!logoExpanded()"
            [class.opacity-100]="logoExpanded()"
            [class.opacity-0]="!logoExpanded()"
          >se blur + domain wa</span>rp
        </h1>
        <span class="flex items-center gap-2 text-xs text-zinc-300 animate-fade-in-up">
          by
          <span class="flex items-center gap-1">
            <img src="favicon.svg" width="16" height="16" alt="logo" class="rounded-sm" />
            <a [href]="betterLyricsUrl" target="_blank" rel="noreferrer" class="hover:underline">Better Lyrics</a>
          </span>
        </span>
      </div>
      <a
        [href]="githubUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white/20"
      >
        GitHub
      </a>
    </header>
  `,
})
export class HeaderComponent {
  readonly logoExpanded = signal(false);
  readonly githubUrl = GITHUB_URL;
  readonly betterLyricsUrl = BETTER_LYRICS_URL;
}
