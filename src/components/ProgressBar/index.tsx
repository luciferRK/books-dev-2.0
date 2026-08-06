import React from "react";
import "./ProgressBar.scss";

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = (props) => {
  const { value, max = 100, color } = props;
  const clampedValue = Math.max(0, Math.min(max, value));
  const percentage = max > 0 ? (clampedValue / max) * 100 : 0;

  return (
    <div
      className="progress-bar"
      role="progressbar"
      aria-valuenow={clampedValue}
      aria-valuemin={0}
      aria-valuemax={max}
      style={
        {
          "--progress-bar-value": `${percentage}%`,
          ...(color ? { "--progress-bar-color": color } : {}),
        } as React.CSSProperties
      }
    >
      <div className="fill" />
    </div>
  );
};

export default React.memo(ProgressBar);
