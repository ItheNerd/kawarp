import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BETTER_LYRICS_ICON, BETTER_LYRICS_URL } from '../constants';

@Component({
  selector: 'app-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="border-t border-white/5 bg-zinc-950/90 px-6 py-8 backdrop-blur-xl">
      <div class="mx-auto flex max-w-3xl flex-col items-center gap-5">
        <a
          [href]="betterLyricsUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="group flex items-center gap-2 rounded-full border border-white/10 bg-linear-to-br from-white/2 via-white/5 to-white/5 py-2 pl-2 pr-3 transition-colors hover:border-white/20 hover:bg-white/10"
        >
          <img
            [src]="betterLyricsIcon"
            alt="Better Lyrics"
            width="20"
            height="20"
            class="rounded"
          />
          <span class="text-sm text-zinc-400 group-hover:text-zinc-200">
            Part of the
            <span class="font-medium text-zinc-300">Better Lyrics</span>
            ecosystem
          </span>
        </a>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  readonly betterLyricsUrl = BETTER_LYRICS_URL;
  readonly betterLyricsIcon = BETTER_LYRICS_ICON;
}
