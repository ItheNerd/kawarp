"use client";

interface SliderProps {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
}

export function Slider({ min, max, step, value, onChange }: SliderProps) {
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div className="slider-container">
      <div className="slider-track">
        <div className="slider-progress" style={{ width: `${percent}%` }} />
      </div>
      <div className="slider-thumb" style={{ left: `${percent}%` }} />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}
