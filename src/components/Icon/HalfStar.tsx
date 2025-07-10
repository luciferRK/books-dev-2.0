import type React from "react";
import type { IconProps } from "./types";
import { COLORS } from "../../utils/constants";

const HalfStar: React.FC<IconProps> = (props) => {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="344.000000pt"
      height="344.000000pt"
      viewBox="0 0 344.000000 344.000000"
      preserveAspectRatio="xMidYMid meet"
      {...props}
    >
      {/* Left half (original) */}
      <g
        transform="translate(0.000000,344.000000) scale(0.100000,-0.100000)"
        fill={COLORS.secondary}
        stroke="none"
      >
        <path
          fill={COLORS.secondary}
          d="M1661 3203 c-15 -13 -70 -162 -190 -518 l-169 -500 -488 -6 c-269 -3
-508 -7 -532 -8 -34 -1 -50 -8 -73 -30 -38 -38 -39 -80 -1 -120 15 -16 207
-163 427 -326 220 -163 401 -300 403 -305 2 -5 -67 -235 -153 -510 -143 -459
-156 -504 -144 -531 15 -38 45 -59 85 -59 33 0 56 15 622 417 l272 194 0 1159
c0 1131 0 1160 -19 1160 -10 0 -28 -8 -40 -17z"
        />
      </g>
      {/* Right half  */}
      <g
        transform="translate(344,344) scale(-0.1,-0.1)"
        fill="#ffffff15"
        stroke="none"
      >
        <path
          fill="#ffffff15"
          d="M1661 3203 c-15 -13 -70 -162 -190 -518 l-169 -500 -488 -6 c-269 -3
-508 -7 -532 -8 -34 -1 -50 -8 -73 -30 -38 -38 -39 -80 -1 -120 15 -16 207
-163 427 -326 220 -163 401 -300 403 -305 2 -5 -67 -235 -153 -510 -143 -459
-156 -504 -144 -531 15 -38 45 -59 85 -59 33 0 56 15 622 417 l272 194 0 1159
c0 1131 0 1160 -19 1160 -10 0 -28 -8 -40 -17z"
        />
      </g>
    </svg>
  );
};

export default HalfStar;
