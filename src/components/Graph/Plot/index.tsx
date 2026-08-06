import React from "react";
import "./Plot.scss";

interface PlotPointBase {
  id: string;
  label?: React.ReactNode;
  color?: string;
}

/** Position a point directly with cartesian coordinates (0..max). */
export interface PlotPointXY extends PlotPointBase {
  x: number;
  y: number;
}

/**
 * Position a point by its score on each of the four sides. The component
 * resolves the coordinate as the balance between each opposing pair:
 *   horizontal = right / (left + right)
 *   vertical   = top / (top + bottom)
 */
export interface PlotPointDirectional extends PlotPointBase {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export type PlotPoint = PlotPointXY | PlotPointDirectional;

export interface PlotAxisLabels {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}

interface PlotProps {
  points: PlotPoint[];
  axisLabels?: PlotAxisLabels;
  /** Upper bound for x/y values (only used for PlotPointXY). Defaults to 100. */
  max?: number;
  selectedId?: string;
  onPointClick?: (point: PlotPoint) => void;
  className?: string;
  /**
   * Render custom content for each point instead of the default dot.
   * When provided, the default dot styling is skipped so the node defines
   * the point's appearance.
   */
  renderPoint?: (point: PlotPoint, isSelected: boolean) => React.ReactNode;
  /** Ref to the root `.plot-graph` element. */
  ref?: React.Ref<HTMLDivElement>;
}

const DEFAULT_COLOR = "#188c8c";

const isDirectional = (point: PlotPoint): point is PlotPointDirectional =>
  "top" in point && "bottom" in point && "left" in point && "right" in point;

const resolvePosition = (point: PlotPoint, max: number) => {
  if (isDirectional(point)) {
    const horizontal = point.left + point.right;
    const vertical = point.top + point.bottom;
    // Guard against divide-by-zero \u2192 fall back to centre.
    const leftPct = horizontal === 0 ? 50 : (point.right / horizontal) * 100;
    const topRatio = vertical === 0 ? 0.5 : point.top / vertical;
    return { leftPct, topPct: (1 - topRatio) * 100 }; // invert: more "top" = higher up
  }

  return {
    leftPct: (point.x / max) * 100,
    topPct: (1 - point.y / max) * 100,
  };
};

const Plot: React.FC<PlotProps> = ({
  points,
  selectedId,
  onPointClick,
  className,
  renderPoint,
  axisLabels = {},
  max = 100,
  ref,
}) => {
  const { top, bottom, left, right } = axisLabels;

  return (
    <div ref={ref} className={`plot-graph${className ? ` ${className}` : ""}`}>
      <div className="plot-grid">
        <span />
        <span />
        <span />
        <span />
      </div>

      {top && <span className="plot-axis-label top">{top}</span>}
      {bottom && <span className="plot-axis-label bottom">{bottom}</span>}
      {left && <span className="plot-axis-label left">{left}</span>}
      {right && <span className="plot-axis-label right">{right}</span>}

      <div className="plot-area">
        {points.map((point, i) => {
          const { leftPct, topPct } = resolvePosition(point, max);
          const isSelected = point.id === selectedId;
          const custom = renderPoint?.(point, isSelected);

          return (
            <button
              key={point.id}
              type="button"
              className={`plot-point${custom ? " custom" : ""}${isSelected ? " selected" : ""}`}
              style={
                {
                  left: `${leftPct}%`,
                  top: `${topPct}%`,
                  "--point-color": point.color ?? DEFAULT_COLOR,
                  animationDelay: `${i * 0.05}s`,
                } as React.CSSProperties
              }
              onClick={() => onPointClick?.(point)}
              aria-label={typeof point.label === "string" ? point.label : point.id}
            >
              {custom ?? null}
              {point.label && (
                <span className="plot-point-tooltip">{point.label}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Plot;
