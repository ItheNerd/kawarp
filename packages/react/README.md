# @kawarp/react

React component for Kawarp fluid animated backgrounds.

## Installation

```bash
npm install @kawarp/react
```

## Usage

```jsx
import { Kawarp } from '@kawarp/react';

function App() {
  return (
    <Kawarp
      src="/album-art.jpg"
      style={{ width: '100%', height: '100vh' }}
    />
  );
}
```

## With Hook

```jsx
import { Kawarp, useKawarp } from '@kawarp/react';

function App() {
  const { ref, loadImage } = useKawarp();

  return (
    <>
      <Kawarp ref={ref} style={{ width: '100%', height: '100vh' }} />
      <button onClick={() => loadImage('/new-image.jpg')}>
        Change Image
      </button>
    </>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | string | - | Image URL to load |
| `warpIntensity` | number | 1.0 | Warp effect strength (0-1) |
| `blurPasses` | number | 8 | Kawase blur passes (1-40) |
| `animationSpeed` | number | 1.0 | Animation speed multiplier |
| `transitionDuration` | number | 1000 | Crossfade duration in ms |
| `saturation` | number | 1.5 | Color saturation multiplier |
| `autoPlay` | boolean | true | Auto-start animation |
| `onLoad` | function | - | Callback when image loads |
| `onError` | function | - | Callback on error |

## License

AGPL-3.0

---

Built by [Better Lyrics](https://github.com/better-lyrics)
