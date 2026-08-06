import React from "react";
import "./Spider.scss";

export interface SpiderDataPoint {
  label: string;
  value: number;
}

interface SpiderProps {
  data?: SpiderDataPoint[];
  /** Maximum possible value for an axis (used to scale the shape). */
  max?: number;
  /** Number of concentric grid rings. */
  levels?: number;
  /** Width/height of the square SVG in pixels. */
  size?: number;
}

const DEFAULT_DATA: SpiderDataPoint[] = [
  { label: "Plot", value: 80 },
  { label: "Characters", value: 95 },
  { label: "Pacing", value: 60 },
  { label: "Prose", value: 78 },
  { label: "World", value: 90 },
  { label: "Emotion", value: 68 },
];

const Spider: React.FC<SpiderProps> = ({
  data = DEFAULT_DATA,
  max = 100,
  levels = 4,
  size = 320,
}) => {
  const center = size / 2;
  const radius = center * 0.72; // leave breathing room for labels
  const count = data.length;

  // Angle for each axis, starting from the top (-90deg) and going clockwise.
  const angleFor = (i: number) => (Math.PI * 2 * i) / count - Math.PI / 2;

  const pointFor = (value: number, i: number, r = radius) => {
    const ratio = Math.max(0, Math.min(value / max, 1));
    const angle = angleFor(i);
    return {
      x: center + Math.cos(angle) * r * ratio,
      y: center + Math.sin(angle) * r * ratio,
    };
  };

  // Concentric grid polygons (from inner to outer).
  const rings = Array.from({ length: levels }, (_, level) => {
    const r = (radius * (level + 1)) / levels;
    return data
      .map((_, i) => {
        const angle = angleFor(i);
        return `${center + Math.cos(angle) * r},${center + Math.sin(angle) * r}`;
      })
      .join(" ");
  });

  const dataPoints = data.map((d, i) => pointFor(d.value, i));
  // Use a <path> (whose `d` is CSS-transitionable) instead of a <polygon>.
  const dataPath = `M ${dataPoints.map((p) => `${p.x},${p.y}`).join(" L ")} Z`;

  return (
    <div className="spider-graph" style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
        <g className="spider-grid">
          {rings.map((points, i) => (
            <polygon
              key={i}
              className="spider-ring"
              points={points}
              style={{ animationDelay: `${i * 0.08}s` }}
            />
          ))}
        </g>

        <g className="spider-axes">
          {data.map((_, i) => {
            const angle = angleFor(i);
            return (
              <line
                key={i}
                className="spider-axis"
                x1={center}
                y1={center}
                x2={center + Math.cos(angle) * radius}
                y2={center + Math.sin(angle) * radius}
                style={{ animationDelay: `${i * 0.05}s` }}
              />
            );
          })}
        </g>

        <path className="spider-shape" d={dataPath} />

        <g className="spider-dots">
          {dataPoints.map((p, i) => (
            <circle
              key={i}
              className="spider-dot"
              cx={p.x}
              cy={p.y}
              r={4}
              style={{ animationDelay: `${0.55 + i * 0.06}s` }}
            />
          ))}
        </g>

        <g className="spider-labels">
          {data.map((d, i) => {
            const angle = angleFor(i);
            const lx = center + Math.cos(angle) * (radius + 22);
            const ly = center + Math.sin(angle) * (radius + 22);
            const cos = Math.cos(angle);
            return (
              <text
                key={i}
                className="spider-label"
                x={lx}
                y={ly}
                textAnchor={Math.abs(cos) < 0.3 ? "middle" : cos > 0 ? "start" : "end"}
                dominantBaseline="middle"
                style={{ animationDelay: `${0.65 + i * 0.06}s` }}
              >
                {d.label}
              </text>
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export default Spider;
